import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Categoria from "./Categoria.js";

const Producto = sequelize.define(
    "Producto", 
    {
        idProducto: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        precio: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        precioMayorista: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        foto: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        idCategoria: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
            model: Categoria,
            key: "idCategoria",
            },
        },
    }, 
    {
        tableName: "producto",
        timestamps: false,
    }
);

Categoria.hasMany(Producto, { foreignKey: "idCategoria" });
Producto.belongsTo(Categoria, { foreignKey: "idCategoria" });

export default Producto;
