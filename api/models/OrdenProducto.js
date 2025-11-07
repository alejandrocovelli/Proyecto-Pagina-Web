import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import Orden from "./Orden";
import Producto from "./Producto";

export class OrdenProducto extends Model { }

OrdenProducto.init(
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
        sequelize,
        tableName: "ordenProducto",
        timestamps: false,
    }
);

Orden.hasMany(OrdenProducto, { foreignKey: "idOrden" });
Producto.hasMany(OrdenProducto, { foreignKey: "idProducto" });

OrdenProducto.belongsTo(Orden, { foreignKey: "idOrden" });
OrdenProducto.belongsTo(Producto, { foreignKey: "idProducto" });

