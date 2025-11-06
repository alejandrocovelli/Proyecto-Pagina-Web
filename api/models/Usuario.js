import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

const Usuario = sequelize.define(
    "Usuario",
    {
        idUsuario: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        correo: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        contraseña: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        tipo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "usuario",
        timestamps: false,
    }
);

export default Usuario;