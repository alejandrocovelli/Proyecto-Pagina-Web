/**
 * ========================================
 * ASOCIACIONES ENTRE MODELOS
 * ========================================
 * Este archivo centraliza todas las relaciones entre los modelos de la aplicación.
 * Define qué modelos se relacionan entre sí y de qué manera (1-a-muchos, muchos-a-muchos, etc).
 * 
 * Responsabilidades:
 * - Definir todas las relaciones entre tablas
 * - Establecer claves foráneas
 * - Permitir eager loading (incluir datos relacionados en consultas)
 * 
 * Se ejecuta una sola vez al iniciar la aplicación en app.js
 * 
 * Relaciones:
 * 1. Usuario -> Dirección (1:N)
 * 2. Categoría -> Producto (1:N)
 * 3. Usuario -> Orden (1:N)
 * 4. Dirección -> Orden (1:N)
 * 5. Orden -> OrdenProducto (1:N)
 * 6. Producto -> OrdenProducto (1:N)
 */

import { Usuario } from "./Usuario.js";
import { Direccion } from "./Direccion.js";
import { Categoria } from "./Categoria.js";
import { Orden } from "./Orden.js";
import { OrdenProducto } from "./OrdenProducto.js";
import { Producto } from "./Producto.js";

/**
 * Función que aplica todas las asociaciones entre modelos
 * Se llama una sola vez cuando la aplicación inicia
 */
export const applyAssociations = () => {
    // ========== RELACIÓN USUARIO - DIRECCIÓN ==========
    /**
     * Un usuario tiene muchas direcciones (domicilio, trabajo, etc.)
     * Se puede acceder con: usuario.getDirecciones()
     */
    Usuario.hasMany(Direccion, {
        foreignKey: "idUsuario",
        as: "direcciones",  // Alias para eager loading
    });

    /**
     * Una dirección pertenece a un usuario
     * Se puede acceder con: direccion.getUsuario()
     */
    Direccion.belongsTo(Usuario, {
        foreignKey: "idUsuario",
        as: "usuario",  // Alias para eager loading
    });

    // ========== RELACIÓN CATEGORÍA - PRODUCTO ==========
    /**
     * Una categoría tiene muchos productos
     * Se puede acceder con: categoria.getProductos()
     */
    Categoria.hasMany(Producto, {
        foreignKey: "idCategoria",
        as: "productos",  // Alias para eager loading
    });

    /**
     * Un producto pertenece a una categoría
     * Se puede acceder con: producto.getCategoria()
     */
    Producto.belongsTo(Categoria, {
        foreignKey: "idCategoria",
        as: "categoria",  // Alias para eager loading
    });

    // ========== RELACIÓN USUARIO - ORDEN ==========
    /**
     * Un usuario tiene muchas órdenes
     * Se puede acceder con: usuario.getOrdenes()
     */
    Usuario.hasMany(Orden, {
        foreignKey: "idUsuario",
        as: "ordenes",  // Alias para eager loading
    });

    /**
     * Una orden pertenece a un usuario
     * Se puede acceder con: orden.getUsuario()
     */
    Orden.belongsTo(Usuario, {
        foreignKey: "idUsuario",
        as: "usuario",  // Alias para eager loading
    });

    // ========== RELACIÓN DIRECCIÓN - ORDEN ==========
    /**
     * Una dirección tiene muchas órdenes (enviadas a esa dirección)
     * Se puede acceder con: direccion.getOrdenes()
     */
    Direccion.hasMany(Orden, {
        foreignKey: "idDireccion",
        as: "ordenes",  // Alias para eager loading
    });

    /**
     * Una orden pertenece a una dirección de envío
     * Se puede acceder con: orden.getDireccion()
     */
    Orden.belongsTo(Direccion, {
        foreignKey: "idDireccion",
        as: "direccion",  // Alias para eager loading
    });

    // ========== RELACIÓN ORDEN - ORDEN PRODUCTO ==========
    /**
     * Una orden tiene muchas líneas de productos (ordenProducto)
     * Se puede acceder con: orden.getOrdenProductos()
     */
    Orden.hasMany(OrdenProducto, {
        foreignKey: "idOrden",
        as: "ordenProductos",  // Alias para eager loading
    });

    /**
     * Una línea de ordenProducto pertenece a una orden
     * Se puede acceder con: ordenProducto.getOrden()
     */
    OrdenProducto.belongsTo(Orden, {
        foreignKey: "idOrden",
        as: "orden",  // Alias para eager loading
    });

    // ========== RELACIÓN PRODUCTO - ORDEN PRODUCTO ==========
    /**
     * Un producto puede estar en muchas líneas de órdenes
     * Se puede acceder con: producto.getOrdenProductos()
     */
    Producto.hasMany(OrdenProducto, {
        foreignKey: "idProducto",
        as: "ordenProductos",  // Alias para eager loading
    });

    /**
     * Una línea de ordenProducto pertenece a un producto
     * Se puede acceder con: ordenProducto.getProducto()
     */
    OrdenProducto.belongsTo(Producto, {
        foreignKey: "idProducto",
        as: "producto",  // Alias para eager loading
    });
};