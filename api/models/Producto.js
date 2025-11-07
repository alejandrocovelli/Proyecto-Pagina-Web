import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import Categoria from "./Categoria";

export class Producto extends Model { }

Producto.init({
    idProducto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precioMayorista: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    foto: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Categoria,
            key: 'idCategoria'
        }
    }
}, {
    sequelize,
    tableName: 'producto',
    timestamps: false
});

Categoria.hasMany(Producto, { foreignKey: 'idCategoria' });
Producto.belongsTo(Categoria, { foreignKey: 'idCategoria' });

