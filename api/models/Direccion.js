import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import Usuario from './Usuario';

export class Direccion extends Model { }

Direccion.init({
    idDireccion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    direccion: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    ciudad: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    barrio: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'idUsuario'
        }
    }
}, {
    sequelize,
    tableName: 'direccion',
    timestamps: false
});

Usuario.hasMany(Direccion, { foreignKey: 'idUsuario' });
Direccion.belongsTo(Usuario, { foreignKey: 'idUsuario' });
