/**
 * ========================================
 * MODELO: PRODUCTO
 * ========================================
 * Define la estructura de los productos que se venden en la tienda.
 * Contiene información como nombre, precio, imagen, y categoría.
 * 
 * Tabla en BD: producto
 * Relaciones:
 * - Un producto pertenece a una categoría
 * - Un producto puede estar en muchas órdenes (a través de ordenProducto)
 */

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import { Categoria } from "./Categoria.js";

/**
 * Clase Producto que extiende Model de Sequelize
 * Representa cada fila de la tabla 'producto'
 */
export class Producto extends Model { }

/**
 * Inicializar el modelo Producto con sus atributos
 */
Producto.init({
    /**
     * ID único del producto (Clave primaria)
     * Se auto-incrementa automáticamente
     */
    idProducto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    /**
     * Nombre descriptivo del producto
     * Ejemplo: "Camiseta Nike Negra"
     * Máximo 100 caracteres
     */
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    
    /**
     * Precio al público del producto (en centavos)
     * Valor entero sin decimales (ej: 50000 = $500.00)
     */
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    /**
     * Precio para clientes mayoristas
     * Aplicable cuando el cliente es de tipo mayorista
     * Se guarda como STRING para mayor flexibilidad
     */
    precioMayorista: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    
    /**
     * URL de la foto/imagen del producto
     * Se almacena como URL de Cloudinary
     * Puede ser NULL si el producto no tiene foto
     */
    foto: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    
    /**
     * ID de la categoría a la que pertenece este producto
     * Clave foránea que referencia a la tabla 'categoria'
     * Un producto siempre debe estar en una categoría
     */
    idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categoria,
            key: 'idCategoria'
        }
    }
}, {
    sequelize,              // Instancia de conexión a la BD
    tableName: 'producto',     // Nombre de la tabla en la BD
    timestamps: false       // No agregar createdAt ni updatedAt
});

/**
 * Definir relaciones del modelo Producto
 * Un producto pertenece a una categoría
 * Una categoría tiene muchos productos
 */
Categoria.hasMany(Producto, { foreignKey: 'idCategoria' });
Producto.belongsTo(Categoria, { foreignKey: 'idCategoria' });

