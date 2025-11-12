/**
 * ========================================
 * MODELO: ORDEN PRODUCTO
 * ========================================
 * Define la tabla de unión (junction table) entre órdenes y productos.
 * Representa cada línea/item en una orden.
 * Una orden puede contener múltiples productos, y cada uno con cantidad diferente.
 * 
 * Tabla en BD: ordenProducto
 * Relaciones:
 * - Un ordenProducto pertenece a una orden
 * - Un ordenProducto pertenece a un producto
 * 
 * Ejemplo:
 * Orden #123 contiene:
 * - 2 camisetas a $50.000 c/u = $100.000
 * - 1 pantalón a $120.000 = $120.000
 * Total orden = $220.000
 */

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import { Orden } from "./Orden.js";
import { Producto } from "./Producto.js";

/**
 * Clase OrdenProducto que extiende Model de Sequelize
 * Representa cada fila de la tabla 'ordenProducto'
 * Es la tabla intermedia que vincula órdenes con productos
 */
export class OrdenProducto extends Model { }

/**
 * Inicializar el modelo OrdenProducto con sus atributos
 */
OrdenProducto.init(
    {
        /**
         * ID único del registro ordenProducto (Clave primaria)
         * Se auto-incrementa automáticamente
         */
        idOrdenProducto: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        
        /**
         * Cantidad de este producto en la orden
         * Ejemplo: 2 unidades de una camiseta
         */
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
        /**
         * Precio unitario del producto en el momento de la orden
         * Se guarda para mantener el historial (el precio puede cambiar después)
         * Valor en centavos (ej: 50000 = $500.00)
         */
        precioUnidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
        /**
         * Valor total de este línea (cantidad * precioUnidad)
         * Se calcula automáticamente para facilitar la búsqueda
         * Valor en centavos
         */
        valorTotal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
        /**
         * ID de la orden a la que pertenece este producto
         * Clave foránea que referencia a la tabla 'orden'
         */
        idOrden: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Orden,
                key: "idOrden",
            },
        },
        
        /**
         * ID del producto en esta línea de orden
         * Clave foránea que referencia a la tabla 'producto'
         */
        idProducto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Producto,
                key: "idProducto",
            },
        },
    },
    {
        sequelize,                  // Instancia de conexión a la BD
        tableName: "ordenProducto",    // Nombre de la tabla en la BD
        timestamps: false           // No agregar createdAt ni updatedAt
    }
);

/**
 * Definir relaciones del modelo OrdenProducto
 * - Una orden tiene muchos ordenProducto
 * - Un ordenProducto pertenece a una orden
 * - Un producto puede estar en muchos ordenProducto (diferentes órdenes)
 * - Un ordenProducto pertenece a un producto
 */
Orden.hasMany(OrdenProducto, { foreignKey: "idOrden" });
Producto.hasMany(OrdenProducto, { foreignKey: "idProducto" });

OrdenProducto.belongsTo(Orden, { foreignKey: "idOrden" });
OrdenProducto.belongsTo(Producto, { foreignKey: "idProducto" });

