

import { Product } from "../types/models";
import { Dimensions } from "../types/models";
import { Shipment, Destination, Country, ShipmentPriority, ShipmentStatus  } from "../types/models";
import { Carrier } from "../types/models";
//---------------------------------------------------------------------------------------//
//--------------------                       ✳️✳️✳️                 -------------------------------//
//--------------------       Validacion para Producto         --------------------------------------//
//---------------------------------------------------------------------------------------//

// validacion para el sku del producto no sea nulo
export function validatesku(product: Product): boolean {
    if (product.sku === null || product.sku === undefined || typeof product.sku !== "string" || product.sku.trim() === "") {
        return false;
    } else {
        return true;
    }
}
//validacion para el peso del producto sea un numero positivo y menor a 100
export function validateweightkg(product: Product): boolean {
    if (product.weightKg === null || product.weightKg === undefined || typeof product.weightKg !== "number" || product.weightKg > 0 && product.weightKg <= 100) {
        return false;
    } else {
        return true;
    }
}

//validacion para las dimensiones del producto sean un numero positivo y menor o igual a 200 
export function validatedimensionscm(product: Product): boolean {
    if (product.dimensions === null || product.dimensions === undefined || typeof product.dimensions !== "object" || product.dimensions.lengthCm < 0 || product.dimensions.lengthCm >= 200 || product.dimensions.widthCm < 0 || product.dimensions.widthCm >= 200 || product.dimensions.heightCm < 0 || product.dimensions.heightCm >= 200) {
        return false;
    } else {
        return true;
    }
}

//validacion para stockquantity >= 0
export function validatestockquantity(product: Product): boolean {
    if (product.stockQuantity === null || product.stockQuantity === undefined || typeof product.stockQuantity !== "number" || product.stockQuantity < 0) {
        return false;
    } else {
        return true;
    }
}

//validacion para minstockthreshold >= 0
export function validateminstockthreshold(product: Product): boolean {
    if (product.minStockThreshold === null || product.minStockThreshold === undefined || typeof product.minStockThreshold !== "number" || product.minStockThreshold >= 0) {
        return false;
    } else {
        return true;
    }
}

//validacion para unitcostusd > 0
export function validateunitcostusd(product: Product): boolean {
    if (product.unitCostUSD === null || product.unitCostUSD === undefined || typeof product.unitCostUSD !== "number" || product.unitCostUSD < 0) {
        return false;
    } else {
        return true;
    }
}


//---------------------------------------------------------------------------------------//
//--------------------                       ✳️✳️✳️                 -------------------------------//
//--------------------       Validacion para Shipment         --------------------------------------//
//---------------------------------------------------------------------------------------//

//Validacion para quantity > 0
export function validatequantity(shipment: Shipment): boolean {
    if (shipment.quantity === null || shipment.quantity === undefined || typeof shipment.quantity !== "number" || shipment.quantity <= 0) {
        return false;
    } else {
        return true;
    }
}
//Validacion para declaredValueUSD >= 0
export function validatedeclaredValueUSD(shipment: Shipment): boolean {
    if (shipment.declaredValueUSD === null || shipment.declaredValueUSD === undefined || typeof shipment.declaredValueUSD !== "number" || shipment.declaredValueUSD < 0) {
        return false;
    } else {
        return true;
    }
}

//Validacion para distanceKm >= 0
export function validatedistanceKm(destination: Destination): boolean {
    if (destination.distanceKm === null || destination.distanceKm === undefined || typeof destination.distanceKm !== "number" || destination.distanceKm < 0) {
        return false;
    } else {
        return true;
    }
}

//---------------------------------------------------------------------------------------//
//--------------------                       ✳️✳️✳️                 -------------------------------//
//--------------------       Validacion para Carrier         --------------------------------------//
//---------------------------------------------------------------------------------------//

//Validacion para baseRateUSD, ratePerKgUSD, ratePerKmUSD >= 0
export function validateCarrierRates(carrier: Carrier): boolean {
    if (carrier.baseRateUSD === null || carrier.baseRateUSD === undefined || typeof carrier.baseRateUSD !== "number" || carrier.baseRateUSD < 0 ||
        carrier.ratePerKgUSD === null || carrier.ratePerKgUSD === undefined || typeof carrier.ratePerKgUSD !== "number" || carrier.ratePerKgUSD < 0 ||
        carrier.ratePerKmUSD === null || carrier.ratePerKmUSD === undefined || typeof carrier.ratePerKmUSD !== "number" || carrier.ratePerKmUSD < 0) {
        return false;
    } else {
        return true;
    }
}

//avgDeliveryDays debe ser > 0
export function validateAvgDeliveryDays(carrier: Carrier): boolean {
    if (carrier.avgDeliveryDays === null || carrier.avgDeliveryDays === undefined || typeof carrier.avgDeliveryDays !== "number" || carrier.avgDeliveryDays <= 0) {
        return false;
    } else {
        return true;
    }
}

//onTimeRate debe estar entre 0 y 100
export function validateOnTimeRate(carrier: Carrier): boolean {
    if (carrier.onTimeRate === null || carrier.onTimeRate === undefined || typeof carrier.onTimeRate !== "number" || carrier.onTimeRate < 0 || carrier.onTimeRate > 100) {
        return false;
    } else {
        return true;
    }
}

//maxWeightKg debe ser > 0
export function validateMaxWeightKg(carrier: Carrier): boolean {
    if (carrier.maxWeightKg === null || carrier.maxWeightKg === undefined || typeof carrier.maxWeightKg !== "number" || carrier.maxWeightKg <= 0) {
        return false;
    } else {
        return true;
    }
}

//operatesIn debe contener al menos 1 país
export function validateOperatesIn(carrier: Carrier): boolean {
    if (carrier.operatesIn === null || carrier.operatesIn === undefined || !Array.isArray(carrier.operatesIn) || carrier.operatesIn.length === 0) {
        return false;
    } else {
        return true;
    }
}

// Validaciones de errores

// Valida todas las reglas de negocio para un producto
// Retorna un objeto con:
// valid: true si todas las validaciones pasan, false en caso contrario
// errors: array de mensajes de error (vacío si es válido)
function validateProduct(product: Product): { valid: boolean, errors: string[] } {
    const errors: string[] = [];
    
    if (!validatesku(product)) {
        errors.push("SKU inválido: debe ser un string no vacío.");
    }
    if (!validateweightkg(product)) {
        errors.push("Peso inválido: debe ser un número positivo menor o igual a 100 kg.");
    }
    if (!validatedimensionscm(product)) {
        errors.push("Dimensiones inválidas: cada dimensión debe ser un número positivo menor o igual a 200 cm.");
    }
    if (!validatestockquantity(product)) {
        errors.push("Cantidad en stock inválida: debe ser un número mayor o igual a 0.");
    }
    if (!validateminstockthreshold(product)) {
        errors.push("Umbral de stock mínimo inválido: debe ser un número mayor o igual a 0.");
    }
    if (!validateunitcostusd(product)) {
        errors.push("Costo unitario inválido: debe ser un número mayor o igual a 0 USD.");
    }
    
    return {
        valid: errors.length === 0,
        errors
    };
}

// Valida todas las reglas de negocio para un envío
// Retorna un objeto con:
// valid: true si todas las validaciones pasan, false en caso contrario
// errors: array de mensajes de error (vacío si es válido)

function validateShipment(shipment: Shipment): { valid: boolean, errors: string[] } {
    const errors: string[] = [];

    if (!validatequantity(shipment)) {
        errors.push("Cantidad inválida: debe ser un número mayor a 0.");
    }
    if (!validatedeclaredValueUSD(shipment)) {
        errors.push("Valor declarado inválido: debe ser un número mayor o igual a 0 USD.");
    }
    if (!validatedistanceKm(shipment.destination)) {
        errors.push("Distancia inválida: debe ser un número mayor o igual a 0 km.");
    }
    
    return {
        valid: errors.length === 0,
        errors
    };

}

// Valida todas las reglas de negocio para un transportista
// Retorna un objeto con:
// valid: true si todas las validaciones pasan, false en caso contrario
// errors: array de mensajes de error (vacío si es válido)

 function validateCarrier(carrier: Carrier): { valid: boolean, errors: string[] } {
    const errors: string[] = [];
    
    if (!validateCarrierRates(carrier)) {
        errors.push("Tarifas inválidas: baseRateUSD, ratePerKgUSD y ratePerKmUSD deben ser números mayores o iguales a 0.");
    }
    if (!validateAvgDeliveryDays(carrier)) {
        errors.push("Días promedio de entrega inválidos: debe ser un número mayor a 0.");
    }
    if (!validateOnTimeRate(carrier)) {
        errors.push("Tasa de entrega a tiempo inválida: debe ser un número entre 0 y 100.");
    }
    if (!validateMaxWeightKg(carrier)) {
        errors.push("Peso máximo inválido: debe ser un número mayor a 0 kg.");
    }
    if (!validateOperatesIn(carrier)) {
        errors.push("Países de operación inválidos: debe contener al menos un país.");
    }
    
    return {
        valid: errors.length === 0,
        errors
    };

 }

 export {
    validateProduct,
    validateShipment,
    validateCarrier
}
