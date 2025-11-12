/**
 * ========================================
 * MODELO: USUARIO
 * ========================================
 * Define la estructura y comportamiento de la tabla 'usuario' en la base de datos.
 * Este modelo representa a los usuarios de la aplicación (clientes, mayoristas, admins).
 * 
 * Responsabilidades:
 * - Definir la estructura de datos del usuario
 * - Validar datos de entrada
 * - Establecer relaciones con otras tablas
 * - Proporcionar métodos para consultas comunes
 * 
 * Tabla en BD: usuario
 * Relaciones:
 * - Un usuario tiene muchas direcciones
 * - Un usuario tiene muchas órdenes
 */

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import { Direccion } from "./Direccion.js";

/**
 * Clase Usuario que extiende Model de Sequelize
 * Representa cada fila de la tabla 'usuario'
 */
export class Usuario extends Model { }

/**
 * Inicializar el modelo Usuario con sus atributos
 * 
 * @param {Object} attributes - Atributos del usuario
 * @param {Object} options - Opciones de configuración de Sequelize
 */
Usuario.init({
    /**
     * ID único del usuario (Clave primaria)
     * Se auto-incrementa automáticamente en cada nuevo registro
     */
    idUsuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    /**
     * Nombre completo del usuario
     * Máximo 45 caracteres, no puede estar vacío
     */
    nombre: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    
    /**
     * Correo electrónico (email) único del usuario
     * Se valida automáticamente como email válido
     * No puede haber dos usuarios con el mismo correo
     */
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    
    /**
     * Contraseña hasheada del usuario
     * Nota: Siempre debe guardarse hasheada con bcrypt, NUNCA en texto plano
     */
    contraseña: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    
    /**
     * Tipo de usuario (rol)
     * 1 = Administrador
     * 2 = Cliente regular
     * 3 = Cliente mayorista
     */
    tipo: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,          // Instancia de conexión a la BD
    tableName: 'usuario',  // Nombre de la tabla en la BD
    timestamps: false   // No agregar createdAt ni updatedAt automáticamente
});