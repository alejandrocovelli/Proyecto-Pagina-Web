/**
 * ========================================
 * REPOSITORY: DIRECCION
 * ========================================
 * Capa de acceso a datos para direcciones
 * Gestiona todas las operaciones CRUD de direcciones
 * 
 * Responsabilidades:
 * - Consultar direcciones de la base de datos
 * - Incluir información del usuario propietario
 * - Usar transacciones para integridad
 */

import { Direccion } from "../models/Direccion.js";
import { Usuario } from "../models/Usuario.js";
import { sequelize } from "../config/database.js";

export class DireccionRepository {
    /**
     * Obtener todas las direcciones
     * Incluye datos del usuario propietario
     * 
     * @returns {Promise<Array>} Array con todas las direcciones
     * @throws {Error} Si no se encuentran direcciones
     */
    async getDirecciones(idUsuario) {
        return await sequelize.transaction(async (transaction) => {
            const direcciones = await Direccion.findAll({
                where: { idUsuario },
                attributes: [
                    "idDireccion",
                    "direccion",
                    "ciudad",
                    "barrio"
                ],
                include: [
                    {
                        model: Usuario,
                        as: "usuario",
                        attributes: ["idUsuario", "nombre"]
                    }
                ],
                transaction
            })
            if(!direcciones) throw new Error("Direcciones no encontradas")

            return direcciones;
        })
    }

    /**
     * Obtener dirección específica por ID
     * 
     * @param {Number} id - ID de la dirección
     * @returns {Promise<Object>} Objeto dirección con usuario
     * @throws {Error} Si la dirección no existe
     */
    async getDireccionById(id) {
        return await sequelize.transaction(async (transaction) => {
            const direccion = await Direccion.findByPk(id, {
                attributes: [
                    "idDireccion",
                    "direccion",
                    "ciudad",
                    "barrio"
                ],
                include: [
                    {
                        model: Usuario,
                        as: "usuario",
                        attributes: ["idUsuario", "nombre"]
                    }
                ],
                transaction
            })
            if(!direccion) throw new Error("Dirección no encontrada")

            return direccion;
        })
    }

    /**
     * Crear nueva dirección
     * 
     * @param {Object} direccionData - Datos de la dirección
     * @returns {Promise<Object>} Dirección creada
     * @throws {Error} Si hay error en la creación
     */
    async createDireccion(direccionData) {
        return await sequelize.transaction(async (transaction) => {
            const direccion = await Direccion.create(direccionData, { transaction })
            if(!direccion) throw new Error("Error al crear la dirección")

            return direccion;
        })
    }

    /**
     * Actualizar dirección existente
     * 
     * @param {Number} id - ID de la dirección
     * @param {Object} direccionData - Datos a actualizar
     * @returns {Promise<Object>} Dirección actualizada
     * @throws {Error} Si la dirección no existe
     */
    async updateDireccion(id, direccionData) {
        return await sequelize.transaction(async (transaction) => {
            const direccion = await Direccion.findByPk(id, { transaction })
            if(!direccion) throw new Error("Dirección no encontrada")

            await direccion.update(direccionData, { transaction })
            return direccion;
        })
    }

    /**
     * Eliminar dirección
     * 
     * @param {Number} id - ID de la dirección
     * @returns {Promise<Boolean>} true si fue eliminada
     * @throws {Error} Si la dirección no existe
     */
    async deleteDireccion(id) {
        return await sequelize.transaction(async (transaction) => {
            const direccion = await Direccion.findByPk(id, { transaction })
            if(!direccion) throw new Error("Dirección no encontrada")

            await direccion.destroy({ transaction })
            return true;
        })
    }
}