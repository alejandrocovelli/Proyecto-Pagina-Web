import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import Usuario from './Usuario';
import Direccion from './Direccion';

export class Orden extends Model { }

Orden.init({
    idOrden: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalPago: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'idUsuario'
        }
    },
    idDireccion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Direccion,
            key: 'idDireccion'
        }
    }
}, {
    sequelize,
    tableName: 'orden',
    timestamps: false
});

Usuario.hasMany(Orden, { foreignKey: 'idUsuario' });
Orden.belongsTo(Usuario, { foreignKey: 'idUsuario' });

Direccion.hasMany(Orden, { foreignKey: 'idDireccion' });
Orden.belongsTo(Direccion, { foreignKey: 'idDireccion' });

