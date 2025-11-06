import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Orden from "./Orden.js";
import Producto from "./Producto.js";

const OrdenProducto = sequelize.define(
    "OrdenProducto", 
    {
        idOrdenProducto: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        precioUnidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        valorTotal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idOrden: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Orden,
                key: "idOrden",
            },
        },
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
        tableName: "ordenProducto",
        timestamps: false,
    }
);

Orden.hasMany(OrdenProducto, { foreignKey: "idOrden" });
OrdenProducto.belongsTo(Orden, { foreignKey: "idOrden" });

Producto.hasMany(OrdenProducto, { foreignKey: "idProducto" });
OrdenProducto.belongsTo(Producto, { foreignKey: "idProducto" });

export default OrdenProducto;
