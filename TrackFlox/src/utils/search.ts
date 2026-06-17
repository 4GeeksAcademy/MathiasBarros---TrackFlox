import { Product } from "../types/models";
import { Shipment } from "../types/models";
import { Carrier } from "../types/models";

// Realiza búsqueda lineal para encontrar un producto por SKU
// La comparación de SKU debe ser case-insensitive
// Retorna el producto si se encuentra, null en caso contrario
function findProductBySKU(products: Product[], sku: string): Product | null {
    const lowerCaseSKU = sku.toLowerCase();
    for (const product of products) {
        if (product.sku.toLowerCase() === lowerCaseSKU) {
            return product;
        }
    }
    return null;
}

//Realiza búsqueda lineal para encontrar un envío por ID
//Retorna el envío si se encuentra, null en caso contrario
function findShipmentById(shipments: Shipment[], id: string): Shipment | null {
    for (const shipment of shipments) {
        if (shipment.id === id) {
            return shipment;
        }
    }
    return null;
}

//Asume que el array ya está ordenado por peso (ascendente)
//Realiza búsqueda binaria para encontrar el índice de un producto con el peso objetivo
//Retorna el índice si se encuentra, -1 en caso contrario
function binarySearchProductByWeight(sortedProducts: Product[], targetWeight: number): number {
    let left = 0;
    let right = sortedProducts.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midWeight = sortedProducts[mid].weightKg;

        if (midWeight === targetWeight) {
            return mid;
        } else if (midWeight < targetWeight) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}

