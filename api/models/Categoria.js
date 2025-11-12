/**
 * ========================================
 * MODELO: CATEGORIA
 * ========================================
 * Define la estructura de las categorías de productos.
 * Cada producto pertenece a una categoría específica (ej: Ropa, Electrónica, etc).
 * 
 * Tabla en BD: categoria
 * Relaciones:
 * - Una categoría tiene muchos productos
 */

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

/**
 * Clase Categoria que extiende Model de Sequelize
 * Representa cada fila de la tabla 'categoria'
 */
export class Categoria extends Model { }

/**
 * Inicializar el modelo Categoria con sus atributos
 */
Categoria.init({
    /**
     * ID único de la categoría (Clave primaria)
     * Se auto-incrementa automáticamente en cada nuevo registro
     */
    idCategoria: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    /**
     * Nombre de la categoría
     * Ejemplos: "Camisetas", "Pantalones", "Electrónica", etc.
     * Máximo 45 caracteres, no puede estar vacío
     */
    nombre: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
}, {
    sequelize,              // Instancia de conexión a la BD
    tableName: 'categoria',    // Nombre de la tabla en la BD
    timestamps: false       // No agregar createdAt ni updatedAt
});

