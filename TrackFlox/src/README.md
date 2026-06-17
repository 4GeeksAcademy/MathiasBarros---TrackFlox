# Demo - Prueba de Funciones Utilitarias

Este documento proporciona un tutorial completo para ejecutar la demo de las funciones utilitarias del proyecto TrackFlox.

## 📋 Descripción

El archivo `demo.js` contiene pruebas exhaustivas de todas las funciones utilitarias disponibles en el proyecto:

- **Collections**: Ordenamiento de productos y gestión de inventario
- **Search**: Búsqueda binaria por ID
- **Transformations**: Modificación y filtrado de productos
- **Validations**: Validación de datos de productos

## 🚀 Requisitos Previos

- **Node.js** instalado (v14 o superior)
- **npm** o **yarn** instalado
- Acceso a una terminal/consola

## 📝 Pasos para Ejecutar la Demo

### 1. Navega a la carpeta del proyecto

```bash
cd /workspaces/MathiasBarros---TrackFlox/TrackFlox/src
```

O si estás en la raíz del proyecto:

```bash
cd TrackFlox/src
```

### 2. Ejecuta el archivo demo.js

#### Opción A: Usando Node.js directamente

```bash
node demo.js
```

#### Opción B: Si necesitas compilar TypeScript primero

Si las funciones utils están en TypeScript, primero instala ts-node:

```bash
npm install -g ts-node
```

Luego ejecuta:

```bash
ts-node demo.js
```

#### Opción C: Con npm scripts (si existe package.json)

```bash
npm run demo
```

## 📊 Qué Esperar

Cuando ejecutes la demo, verás un output en consola con:

```
========== PRUEBAS DE VALIDACIONES ==========
✓ Validar SKU del producto1: true
✓ Validar peso del producto1: true
...

========== PRUEBAS DE BÚSQUEDA ==========
✓ Búsqueda binaria por ID 2: { id: 2, name: 'Laptop', ... }
...

========== PRUEBAS DE TRANSFORMACIONES ==========
✓ Productos ordenados por precio (menor a mayor):
  - Crema Facial: $24.99
  - Zapato Negro: $99.99
  ...

========== RESUMEN FINAL ==========
Total de productos: 5
Total de empleados: 2
Transportista con 2 paquetes
```

## 🧪 Funciones Probadas

### Validaciones
- `validatesku()` - Valida el SKU del producto
- `validateweightkg()` - Valida el peso en kilogramos
- `validatedimensionscm()` - Valida las dimensiones en centímetros
- `validatestockquantity()` - Valida la cantidad de stock

### Búsqueda
- `busquedabinariaporID()` - Realiza búsqueda binaria de productos por ID

### Transformaciones
- `CambiarPrecio()` - Modifica el precio de un producto
- `CambiarEstado()` - Cambia el estado (activo/inactivo)
- `AgregarProducto()` - Agrega un nuevo producto a la lista
- `EliminarProducto()` - Elimina un producto por ID
- `ActualizarProducto()` - Actualiza datos de un producto
- `FiltrarProductosPorStock()` - Filtra productos por stock mínimo

### Collections
- `OrdenarProductosPorPrecio()` - Ordena productos por precio
- `OrdenarProductosPorNombre()` - Ordena productos por nombre
- `OrdenarProductosPorFechaExpiracion()` - Ordena por fecha de expiración
- `AgregarInventarioAlTransportista()` - Agrega paquetes al inventario
- `AgregarEmployee()` - Agrega empleados a la lista

## 🔧 Personalizar la Demo

Si deseas modificar los datos de prueba:

1. Abre el archivo `demo.js`
2. Edita las secciones de "DATOS DE PRUEBA"
3. Modifica los valores de `product1`, `product2`, etc.
4. Vuelve a ejecutar la demo

## 📂 Estructura de Archivos

```
TrackFlox/src/
├── demo.js                          # Archivo principal de demo
├── README.md                        # Este archivo
├── types/
│   └── models.ts                   # Tipos TypeScript
└── utils/
    ├── collections.ts              # Funciones de colecciones
    ├── search.ts                   # Funciones de búsqueda
    ├── transformations.ts          # Funciones de transformación
    └── validations.ts              # Funciones de validación
```

## ❓ Solución de Problemas

### Error: "Cannot find module"

**Solución**: Asegúrate de estar en la carpeta correcta (`TrackFlox/src`) antes de ejecutar el comando.

### Error: "Node.js not found"

**Solución**: Instala Node.js desde [nodejs.org](https://nodejs.org/)

### Error de sintaxis en las importaciones

**Solución**: Si usas `node demo.js`, puede haber problemas con las importaciones ES6. Intenta con `ts-node` o convierte el archivo a CommonJS.

## 📚 Documentación Adicional

Para más información sobre las funciones individuales, consulta:
- [types/models.ts](./types/models.ts) - Definiciones de tipos
- [utils/](./utils/) - Carpeta con funciones utilitarias

## 💡 Tips

- Los `console.log()` están organizados por categoría para facilitar la lectura
- Cada prueba muestra el resultado antes y después de la operación
- Los datos de prueba son realistas y representativos del dominio del proyecto

¡Disfruta explorando las funciones! 🎉
