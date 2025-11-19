/**
 * ========================================
 * MODELO: ORDEN
 * ========================================
 * Define la estructura de las órdenes/pedidos realizados por usuarios.
 * Una orden contiene información del comprador, dirección de envío y total.
 * Los productos específicos de cada orden se almacenan en la tabla ordenProducto.
 * 
 * Tabla en BD: orden
 * Relaciones:
 * - Una orden pertenece a un usuario
 * - Una orden se envía a una dirección
 * - Una orden tiene muchos ordenProducto (líneas de productos)
 */

import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import { Usuario } from './Usuario.js';
import { Direccion } from './Direccion.js';

/**
 * Clase Orden que extiende Model de Sequelize
 * Representa cada fila de la tabla 'orden'
 */
export class Orden extends Model { }

/**
 * Inicializar el modelo Orden con sus atributos
 */
Orden.init({
    /**
     * ID único de la orden (Clave primaria)
     * Se auto-incrementa automáticamente
     */
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
    
    /**
     * Monto total pagado en la orden (en centavos)
     * Suma de todos los productos en la orden
     * Ejemplo: 500000 = $5000.00
     */
    totalPago: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    /**
     * ID del usuario que realizó la orden
     * Clave foránea que referencia a la tabla 'usuario'
     */
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'idUsuario'
        }
    },
    
    /**
     * ID de la dirección de envío
     * Clave foránea que referencia a la tabla 'direccion'
     * Indica a dónde se debe enviar la orden
     */
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

/**
 * Definir relaciones del modelo Orden
 * - Un usuario tiene muchas órdenes
 * - Una orden pertenece a un usuario
 * - Una dirección tiene muchas órdenes
 * - Una orden pertenece a una dirección
 */
Usuario.hasMany(Orden, { foreignKey: 'idUsuario' });
Orden.belongsTo(Usuario, { foreignKey: 'idUsuario' });

Direccion.hasMany(Orden, { foreignKey: 'idDireccion' });
Orden.belongsTo(Direccion, { foreignKey: 'idDireccion' });

