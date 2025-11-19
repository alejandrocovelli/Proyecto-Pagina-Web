import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import { Direccion } from "./Direccion.js";

export class Usuario extends Model { }

Usuario.init({
    idUsuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    nombre: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    
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