import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import { Categoria } from "./Categoria.js";

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
    sequelize,              // Instancia de conexión a la BD
    tableName: 'producto',     // Nombre de la tabla en la BD
    timestamps: false       // No agregar createdAt ni updatedAt
});

Categoria.hasMany(Producto, { foreignKey: 'idCategoria' });
Producto.belongsTo(Categoria, { foreignKey: 'idCategoria' });

