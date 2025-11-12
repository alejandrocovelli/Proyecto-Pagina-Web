/**
 * ========================================
 * SERVICE: CATEGORIA
 * ========================================
 * Capa de lógica de negocio para categorías
 * Actúa como intermediaria entre controlador y repository
 * 
 * Responsabilidades:
 * - Obtener/crear/actualizar/eliminar categorías
 * - Aplicar reglas de negocio
 * - Formatear respuestas consistentes
 */

import { CategoriaRepository } from "../repositories/CategoriaRepository.js";

export class CategoriaService {
    /**
     * Constructor: Inicializar el repositorio
     */
    constructor() {
        this.categoriaRepository = new CategoriaRepository()
    }

    /**
     * Obtener todas las categorías
     * 
     * @returns {Promise<Object>} Respuesta con lista de categorías
     */
    async getCategorias() {
        const categorias = await this.categoriaRepository.getCategorias();
        return { success: true, data: categorias };
    }

    /**
     * Obtener categoría específica por ID
     * 
     * @param {Number} id - ID de la categoría
     * @returns {Promise<Object>} Respuesta con datos de la categoría
     */
    async getCategoriaById(id) {
        const categoria = await this.categoriaRepository.getCategoriaById(id);
        return { success: true, data: categoria };
    }

    /**
     * Crear nueva categoría
     * 
     * @param {Object} categoriaData - Datos de la categoría
     * @param {String} categoriaData.nombre - Nombre de la categoría
     * @returns {Promise<Object>} Respuesta con categoría creada
     */
    async createCategoria(categoriaData) {
        const categoria = await this.categoriaRepository.createCategoria(categoriaData);
        return { success: true, data: categoria };
    }

    /**
     * Actualizar categoría existente
     * 
     * @param {Number} id - ID de la categoría
     * @param {Object} categoriaData - Datos a actualizar
     * @returns {Promise<Object>} Respuesta con categoría actualizada
     */
    async updateCategoria(id, categoriaData) {
        const categoria = await this.categoriaRepository.updateCategoria(id, categoriaData);
        return { success: true, data: categoria };
    }

    /**
     * Eliminar categoría
     * 
     * @param {Number} id - ID de la categoría
     * @returns {Promise<Object>} Respuesta con resultado
     */
    async deleteCategoria(id) {
        const result = await this.categoriaRepository.deleteCategoria(id);
        return { success: true, data: result };
    }
}