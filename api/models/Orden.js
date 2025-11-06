import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Usuario from "./Usuario.js";
import Direccion from "./Direccion.js";

const Orden = sequelize.define(
    "Orden", 
    {
        idOrden: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        estado: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalPago: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idUsuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Usuario,
                key: "idUsuario",
            },
        },
        idDireccion: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Direccion,
                key: "idDireccion",
            },
        },
    }, 
    {
        tableName: "orden",
        timestamps: false,
    }
);

Usuario.hasMany(Orden, { foreignKey: "idUsuario" });
Orden.belongsTo(Usuario, { foreignKey: "idUsuario" });

Direccion.hasMany(Orden, { foreignKey: "idDireccion" });
Orden.belongsTo(Direccion, { foreignKey: "idDireccion" });

export default Orden;
