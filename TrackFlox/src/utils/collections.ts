import { User, Admin, interestedworker, Employee, Customer, Transportist, Warehouse, Contractor, Product } from "../types/models";
import { Dimensions } from "../types/models";
import { Shipment, Destination, Country, ShipmentPriority, ShipmentStatus  } from "../types/models";
import { Carrier } from "../types/models";
import { WarehouseLocation, ProductStatus } from "../types/models";
import { ProductCategory } from "../types/models";


//verifica si el producto esta en donde el warehouse
function filterProductsByWarehouse(products: Product[], warehouse: WarehouseLocation): Product[]{
    return products.filter(product => product.warehouse === warehouse);
}

// verifica si el producto es igual que la categoria
function filterProductsByCategory(products: Product[], category: ProductCategory): Product[] {
    return products.filter(product => product.category === category);
}

//filtra por si el producto tiene poco stock
function filterLowStockProducts(products: Product[]): Product[] {
    return products.filter(product => product.stockQuantity <= product.minStockThreshold);
}

//Retorna productos ordenados por cantidad de stock no muta el original
function sortProductsByStock(products: Product[], order: "asc" | "desc"): Product[] {
    return products.slice().sort((a, b) => {
        if (order === "asc") {
            return a.stockQuantity - b.stockQuantity;
        } else {
            return b.stockQuantity - a.stockQuantity;
        }
    });
}

//Retorna transportistas ordenados por tasa de entrega a tiempo no muta el original
function sortCarriersByReliability(carriers: Carrier[], order: "asc" | "desc"): Carrier[] {
    return carriers.slice().sort((a, b) => {
        if (order === "asc") {
            return a.onTimeRate - b.onTimeRate;
        } else {
            return b.onTimeRate - a.onTimeRate;
        }
    });
}


