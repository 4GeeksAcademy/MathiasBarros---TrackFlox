import { Product } from "../types/models";

function busquedabinariaporID(array: Product[], id: number): Product | unknown {
    let Inicio = 0;
    let Fin = array.length - 1;
    
    while (Inicio <= Fin) {
        const medio = Math.floor((Inicio + Fin) / 2);
        if (array[medio].id === id) {
            return array[medio];
        } else if (array[medio].id < id) {
            Inicio = medio + 1;
        } else {
            Fin = medio - 1;
        }
    }
    return null;
}