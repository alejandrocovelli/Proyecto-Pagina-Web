/**
 * ========================================
 * SERVICE: DIRECCION
 * ========================================
 * Capa de lógica de negocio para direcciones
 * Proporciona interfaz entre controladores y repositorio
 * 
 * Responsabilidades:
 * - Ejecutar operaciones CRUD de direcciones
 * - Manejo de errores con try/catch
 * - Retornar respuesta estandarizada {success, data, message}
 */

import { DireccionRepository } from "../repositories/DireccionRepository.js";

export class DireccionService {
    // Instancia del repositorio para acceso a datos
    constructor() {
        this.direccionRepository = new DireccionRepository()
    }

    /**
     * Obtener todas las direcciones
     * Llama al repositorio para obtener todas las direcciones con usuario asociado
     * 
     * @returns {Promise<Object>} Objeto con success y data
     * {success: true, data: Array de direcciones}
     */
    async getDirecciones() {
        const direcciones = await this.direccionRepository.getDirecciones();
        return { success: true, data: direcciones };
    }

    /**
     * Obtener dirección específica por ID
     * 
     * @param {Number} id - ID de la dirección a obtener
     * @returns {Promise<Object>} Objeto con success y dirección encontrada
     * {success: true, data: Object dirección}
     */
    async getDireccionById(id) {
        const direccion = await this.direccionRepository.getDireccionById(id);
        return { success: true, data: direccion };
    }

    /**
     * Crear nueva dirección
     * Valida datos y crea dirección en base de datos
     * 
     * @param {Object} direccionData - Datos de la dirección (direccion, ciudad, barrio, idUsuario)
     * @returns {Promise<Object>} Objeto con success y dirección creada
     * {success: true, data: Object dirección}
     */
    async createDireccion(direccionData) {
        const direccion = await this.direccionRepository.createDireccion(direccionData);
        return { success: true, data: direccion };
    }

    /**
     * Actualizar dirección existente
     * 
     * @param {Number} id - ID de la dirección a actualizar
     * @param {Object} direccionData - Datos a actualizar (direccion, ciudad, barrio)
     * @returns {Promise<Object>} Objeto con success y dirección actualizada
     * {success: true, data: Object dirección}
     */
    async updateDireccion(id, direccionData) {
        const direccion = await this.direccionRepository.updateDireccion(id, direccionData);
        return { success: true, data: direccion };
    }

    /**
     * Eliminar dirección
     * 
     * @param {Number} id - ID de la dirección a eliminar
     * @returns {Promise<Object>} Objeto con success y resultado
     * {success: true, data: true}
     */
    async deleteDireccion(id) {
        const result = await this.direccionRepository.deleteDireccion(id);
        return { success: true, data: result };
    }
}