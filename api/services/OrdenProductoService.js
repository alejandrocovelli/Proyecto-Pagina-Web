/**
 * ========================================
 * SERVICE: ORDEN PRODUCTO
 * ========================================
 * Capa de lógica de negocio para OrdenProducto
 * Tabla junction que relaciona órdenes con productos
 * 
 * Responsabilidades:
 * - Ejecutar operaciones CRUD en OrdenProducto
 * - Manejo de errores con try/catch
 * - Retornar respuesta estandarizada {success, data}
 * 
 * Contexto:
 * - Normalmente los registros se crean automáticamente al crear una orden
 * - Este servicio principalmente es para consultas y correcciones
 */

import { OrdenProductoRepository } from "../repositories/OrdenProductoRepository.js";

export class OrdenProductoService {
    // Instancia del repositorio para acceso a datos
    constructor() {
        this.ordenProductoRepository = new OrdenProductoRepository()
    }

    /**
     * Obtener todos los registros OrdenProducto
     * 
     * @returns {Promise<Object>} Objeto con success y data
     * {success: true, data: Array de OrdenProducto}
     */
    async getOrdenesProductos() {
        const ordenesProductos = await this.ordenProductoRepository.getOrdenesProductos();
        return { success: true, data: ordenesProductos };
    }

    /**
     * Obtener registro OrdenProducto específico por ID
     * 
     * @param {Number} id - ID de OrdenProducto
     * @returns {Promise<Object>} Objeto con success y registro
     * {success: true, data: Object OrdenProducto}
     */
    async getOrdenProductoById(id) {
        const ordenProducto = await this.ordenProductoRepository.getOrdenProductoById(id);
        return { success: true, data: ordenProducto };
    }

    /**
     * Crear nuevo registro OrdenProducto
     * 
     * NOTA: Normalmente no se llama directamente
     * Se crea automáticamente en OrdenRepository.createOrden()
     * 
     * @param {Object} ordenProductoData - Datos del registro
     * @returns {Promise<Object>} Objeto con success y registro creado
     * {success: true, data: Object OrdenProducto}
     */
    async createOrdenProducto(ordenProductoData) {
        const ordenProducto = await this.ordenProductoRepository.createOrdenProducto(ordenProductoData);
        return { success: true, data: ordenProducto };
    }

    /**
     * Actualizar registro OrdenProducto
     * 
     * @param {Number} id - ID de OrdenProducto
     * @param {Object} ordenProductoData - Datos a actualizar
     * @returns {Promise<Object>} Objeto con success y registro actualizado
     * {success: true, data: Object OrdenProducto}
     */
    async updateOrdenProducto(id, ordenProductoData) {
        const ordenProducto = await this.ordenProductoRepository.updateOrdenProducto(id, ordenProductoData);
        return { success: true, data: ordenProducto };
    }

    /**
     * Eliminar registro OrdenProducto
     * 
     * @param {Number} id - ID de OrdenProducto
     * @returns {Promise<Object>} Objeto con success y resultado
     * {success: true, data: true}
     */
    async deleteOrdenProducto(id) {
        const result = await this.ordenProductoRepository.deleteOrdenProducto(id);
        return { success: true, data: result };
    }
}