import { Product } from "../types/models";
import { Carrier } from "../types/models";
import { Shipment } from "../types/models";
import { ProductCategory } from "../types/models";
import { ShipmentPriority } from "../types/models";
import { ShipmentStatus } from "../types/models";

// Calcula el costo total de envío basado en:
// Tarifa base: carrier.baseRateUSD
// Costo por peso: product.weightKg * carrier.ratePerKgUSD * shipment.quantity
// Costo por distancia: shipment.destination.distanceKm * carrier.ratePerKmUSD
// Recargo por prioridad:
// Standard: 0% adicional
// Express: +30%
// Same-day: +60%
// Retorna costo total redondeado a 2 decimales
 function calculateShippingCost(shipment: Shipment, product: Product, carrier: Carrier): number {
    const baseCosto = carrier.baseRateUSD;
    const PesoparaCosto = product.weightKg * carrier.ratePerKgUSD * shipment.quantity;
    const DistanciaparaCosto = shipment.destination.distanceKm * carrier.ratePerKmUSD;

    let priorityMultiplier = 1; // Standard
    if (shipment.priority === "Express") {
        priorityMultiplier = 1.3;
    } else if (shipment.priority === "Same-day") {
        priorityMultiplier = 1.6;
    }

    const totalCosto = (baseCosto + PesoparaCosto + DistanciaparaCosto) * priorityMultiplier;
    return Math.round(totalCosto * 100) / 100; // Redondear a 2 decimales
}



//  Calcula un puntaje de identidad (0-100) para un transportista basado en:

// Opera en país de destino (20 puntos):

// +20 si el transportista opera en el país de destino del envío
// 0 en caso contrario
// Puede manejar peso (20 puntos):

// +20 si product.weightKg * shipment.quantity <= carrier.maxWeightKg
// 0 en caso contrario
// Soporta prioridad (15 puntos):

// +15 si el transportista acepta el nivel de prioridad del envío
// 0 en caso contrario
// Maneja frágiles (15 puntos):

// +15 si el producto es frágil y el transportista maneja frágiles
// +15 si el producto no es frágil
// 0 si el producto es frágil pero el transportista no maneja frágiles
// Confiabilidad (30 puntos):

// Puntos = onTimeRate del transportista * 0.3
// (ej: 90% de tasa a tiempo = 27 puntos)
// Retorna puntaje redondeado a 2 decimales
 function scoreCarrierForShipment(carrier: Carrier, shipment: Shipment, product: Product): number{
    let score = 0;
    
    // Verificar país de destino
    if (carrier.operatesIn.includes(shipment.destination.country)) {
        score += 20;
    }
    // Verificar capacidad de peso
    if (product.weightKg * shipment.quantity <= carrier.maxWeightKg) {
        score += 20;
    }
    // Verificar soporte de prioridad
    if (carrier.acceptsPriority.includes(shipment.priority)) {
        score += 15;
    }
    // Verificar manejo de frágiles
    if (product.isFragile) {
        if (carrier.handlesFragile) {
            score += 15;
        }
        // Si el producto es frágil pero el transportista no maneja frágiles, no se suman puntos
    } else {
        // Si el producto no es frágil, se suman los 15 puntos independientemente del manejo de frágiles
        score += 15;
    }
    // Agregar puntos por confiabilidad
    score += carrier.onTimeRate * 0.3;

    return Math.round(score * 100) / 100; // Redondear a 2 decimales
}


//Puntúa todos los transportistas para el envío
// Filtra transportistas con puntaje < 50 (no adecuados)
// Entre los transportistas adecuados, selecciona el de menor costo
// Retorna el mejor transportista con su puntaje y costo, o null si no se encuentra ninguno adecuado

function selectBestCarrier(carriers: Carrier[], shipment: Shipment, product: Product): {carrier: Carrier, score: number, cost: number} | null{
    let bestOption: {carrier: Carrier, score: number, cost: number} | null = null;

    for (const carrier of carriers) {
        const score = scoreCarrierForShipment(carrier, shipment, product);
        if (score >= 50) { // Solo considerar transportistas adecuados
            const cost = calculateShippingCost(shipment, product, carrier);
            if (!bestOption || cost < bestOption.cost) {
                bestOption = { carrier, score, cost };
            }
        }
    }

    return bestOption;
}



//Retorna un conteo de productos para cada categoría

function countProductsByCategory(products: Product[]): Record<ProductCategory, number> {
    const categoryCounts: Record<ProductCategory, number> = {
        "Fashion": 0,
        "Electronics": 0,
        "Cosmetics": 0,
        "Home": 0,
        "Other": 0
    };

    for (const product of products) {
        categoryCounts[product.category]++;
    }

    return categoryCounts;
}

 // Retorna el valor total de todo el inventario
// Fórmula: suma de (stockQuantity * unitCostUSD) para todos los productos
// Redondear a 2 decimales

function calculateTotalInventoryValue(products: Product[]): number {
    let totalValue = 0;

    for (const product of products) {
        totalValue += product.stockQuantity * product.unitCostUSD;
    }

    return Math.round(totalValue * 100) / 100; // Redondear a 2 decimales
}

// Retorna la distancia promedio de todos los envíos
// Redondear a 2 decimales

function calculateAverageShipmentDistance(shipments: Shipment[]): number {
    if (shipments.length === 0) return 0;
    
    let totalDistance = 0;
    for (const shipment of shipments) {
        totalDistance += shipment.destination.distanceKm;
    }
    
    const averageDistance = totalDistance / shipments.length;
    return Math.round(averageDistance * 100) / 100; // Redondear a 2 decimales
}

// Agrupa envíos por estado
// Retorna un objeto donde las claves son estados y los valores son arrays de envíos

function groupShipmentsByStatus(shipments: Shipment[]): Record<ShipmentStatus, Shipment[]> {
    const grouped: Record<ShipmentStatus, Shipment[]> = {
        "Pending": [],
        "Assigned": [],
        "In transit": [],
        "Delivered": [],
        "Failed": []
    };

    for (const shipment of shipments) {
        grouped[shipment.status].push(shipment);
    }

    return grouped;
}

// Encuentra los N transportistas más usados basado en envíos asignados
// Ignora envíos con transportista null
// Los retorna ordenados por conteo de uso (más alto primero)
// Cada elemento contiene nombre de transportista y conteo de envíos
                                                                //❗❗❗ Revision si esta bien
function findTopCarriers(shipments: Shipment[], topN: number): {carrier: string, count: number}[] {
    const carrierCounts: Record<string, number> = {};
    
    for (const shipment of shipments) {
        if (shipment.carrier) {
            carrierCounts[shipment.carrier] = (carrierCounts[shipment.carrier] || 0) + 1;
        }
    }
    return Object.entries(carrierCounts)
        .map(([carrier, count]) => ({ carrier, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, topN);
}

export { calculateShippingCost, scoreCarrierForShipment, 
    selectBestCarrier, countProductsByCategory, calculateTotalInventoryValue, 
    calculateAverageShipmentDistance, groupShipmentsByStatus, findTopCarriers
}


