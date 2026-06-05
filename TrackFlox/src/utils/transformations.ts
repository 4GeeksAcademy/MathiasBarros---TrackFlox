import { Product } from "../types/models";

function CambiarPrecio(product: Product, newPrice: number): Product {
    product.price = newPrice;
    return product;
}
function CambiarEstado(product: Product, newEstado: "activo" | "inactivo"): Product {
    product.estado = newEstado;
    return product;
}
function AgregarProducto(productList: Product[], newProduct: Product): Product[] {
    productList.push(newProduct);
    return productList;
}
function EliminarProducto(productList: Product[], productId: number): Product[] {
    return productList.filter(product => product.id !== productId);
}
function ActualizarProducto(productList: Product[], updatedProduct: Product): Product[] {
    return productList.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
    );
}

function FiltrarProductosPorStock(productList: Product[], stockThreshold: number): Product[] {
    return productList.filter(product => product.stock > stockThreshold);
}
