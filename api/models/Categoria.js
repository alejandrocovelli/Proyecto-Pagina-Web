import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

export class Categoria extends Model { }

Categoria.init({
    idCategoria: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(45),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'categoria',
    timestamps: false
});

