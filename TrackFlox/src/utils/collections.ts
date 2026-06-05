import { Product } from "../types/models";

function OrdenarProductosPorPrecio(productList: Product[]): Product[] {
    return productList.sort((a, b) => a.price - b.price);
}
function OrdenarProductosPorNombre(productList: Product[]): Product[] {
    return productList.sort((a, b) => a.name.localeCompare(b.name));
}
function OrdenarProductosPorFechaExpiracion(productList: Product[]): Product[] {
    return productList.sort((a, b) => a.expirationDate.getTime() - b.expirationDate.getTime());
}
function AgregarInventarioAlTransportista(transportist: any, newInventory: string): any {
    if (!transportist.Inventory) {
        transportist.Inventory = [];
    }
    transportist.Inventory.push(newInventory);
    return transportist;
}
function AgregarEmployee(employeeList: any[], newEmployee: any): any[] {
    employeeList.push(newEmployee);
    return employeeList;
}