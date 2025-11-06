import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Categoria = sequelize.define(
    "Categoria", 
    {
        idCategoria: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
    },
    {
        tableName: "categoria",
        timestamps: false,
    }
);

export default Categoria;
