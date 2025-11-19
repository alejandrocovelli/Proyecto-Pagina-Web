import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import { Usuario } from './Usuario.js';
import { Direccion } from './Direccion.js';

export class Orden extends Model { }

Orden.init({
    idOrden: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    /**
     * Estado de la orden
     * 1 = Pendiente
     * 2 = En preparación
     * 3 = Enviada
     * 4 = Entregada
     * 5 = Cancelada
     */
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
        allowNull: true,
        references: {
            model: Direccion,
            key: 'idDireccion'
        }
    }
}, {
    sequelize,              // Instancia de conexión a la BD
    tableName: 'orden',        // Nombre de la tabla en la BD
    timestamps: false       // No agregar createdAt ni updatedAt
});

Usuario.hasMany(Orden, { foreignKey: 'idUsuario' });
Orden.belongsTo(Usuario, { foreignKey: 'idUsuario' });

Direccion.hasMany(Orden, { foreignKey: 'idDireccion' });
Orden.belongsTo(Direccion, { foreignKey: 'idDireccion' });

