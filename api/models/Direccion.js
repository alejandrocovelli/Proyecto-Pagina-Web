/**
 * ========================================
 * MODELO: DIRECCION
 * ========================================
 * Define la estructura de las direcciones de los usuarios.
 * Un usuario puede tener múltiples direcciones (domicilio, trabajo, etc.).
 * Se utiliza para envíos de órdenes.
 * 
 * Tabla en BD: direccion
 * Relaciones:
 * - Una dirección pertenece a un usuario
 * - Una dirección puede tener muchas órdenes
 */

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import { Usuario } from './Usuario.js';

/**
 * Clase Direccion que extiende Model de Sequelize
 * Representa cada fila de la tabla 'direccion'
 */
export class Direccion extends Model { }

/**
 * Inicializar el modelo Direccion con sus atributos
 */
Direccion.init({
    /**
     * ID único de la dirección (Clave primaria)
     * Se auto-incrementa automáticamente
     */
    idDireccion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    /**
     * Dirección completa/calle
     * Ejemplo: "Carrera 5 #123-45"
     * Máximo 45 caracteres
     */
    direccion: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    
    /**
     * Ciudad/Municipio donde está la dirección
     * Ejemplo: "Bogotá", "Medellín", etc.
     * Máximo 45 caracteres
     */
    ciudad: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    
    /**
     * Barrio/Localidad de la dirección
     * Ejemplo: "Chapinero", "Centro", etc.
     * Máximo 45 caracteres
     */
    barrio: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    
    /**
     * ID del usuario propietario de esta dirección
     * Clave foránea que referencia a la tabla 'usuario'
     * Una dirección siempre pertenece a un usuario
     */
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'idUsuario'
        }
    }
}, {
    sequelize,              // Instancia de conexión a la BD
    tableName: 'direccion',    // Nombre de la tabla en la BD
    timestamps: false       // No agregar createdAt ni updatedAt
});