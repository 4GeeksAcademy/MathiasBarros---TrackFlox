
import { Admin, Customer, Employee, Product, Transportist, User, Warehouse } from "../types/models";
function validarPersonaParaEmployeed(interesedworker: any): boolean {
    return interesedworker.skills && interesedworker.experience !== undefined;
}
function validarDevolucion(devolucion: any): boolean {
    let fechaActual = new Date();
    let tiempoLimite = 30; // Días para la devolución
    if(devolucion.date > fechaActual) {
        return false; // No se puede devolver un producto en una fecha futura
    }
    let diferenciaDias = (fechaActual.getTime() - devolucion.date.getTime()) / (1000 * 3600 * 24);
    return diferenciaDias <= tiempoLimite;
}
    