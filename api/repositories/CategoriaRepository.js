/**
 * ========================================
 * REPOSITORY: CATEGORIA
 * ========================================
 * Capa de acceso a datos para categorías
 * Gestiona operaciones CRUD en la tabla 'categoria'
 * 
 * Responsabilidades:
 * - Realizar consultas a la base de datos
 * - Usar transacciones para integridad
 * - Manejar errores de base de datos
 */

import { Categoria } from "../models/Categoria.js";
import { sequelize } from "../config/database.js";

export class CategoriaRepository {
    /**
     * Obtener todas las categorías
     * 
     * @returns {Promise<Array>} Array con todas las categorías
     * @throws {Error} Si no se encuentran categorías
     */
    async getCategorias() {
        return await sequelize.transaction(async (transaction) => {
            // Obtener todas las categorías
            const categorias = await Categoria.findAll({
                attributes: [
                    "idCategoria",
                    "nombre"
                ],
                transaction
            })
            if(!categorias) throw new Error("Categorías no encontradas")

            return categorias;
        })
    }

    /**
     * Obtener categoría específica por ID
     * 
     * @param {Number} id - ID de la categoría
     * @returns {Promise<Object>} Objeto categoría
     * @throws {Error} Si la categoría no existe
     */
    async getCategoriaById(id) {
        return await sequelize.transaction(async (transaction) => {
            // Buscar categoría por ID
            const categoria = await Categoria.findByPk(id, {
                attributes: [
                    "idCategoria",
                    "nombre"
                ],
                transaction
            })
            if(!categoria) throw new Error("Categoría no encontrada")

            return categoria;
        })
    }

    /**
     * Crear nueva categoría
     * 
     * @param {Object} categoriaData - Datos de la categoría
     * @param {String} categoriaData.nombre - Nombre de la categoría
     * 
     * @returns {Promise<Object>} Categoría creada
     * @throws {Error} Si hay error en la creación
     */
    async createCategoria(categoriaData) {
        return await sequelize.transaction(async (transaction) => {
            // Crear nueva categoría
            const categoria = await Categoria.create(categoriaData, { transaction })
            if(!categoria) throw new Error("Error al crear la categoría")

            return categoria;
        })
    }

    /**
     * Actualizar categoría existente
     * 
     * @param {Number} id - ID de la categoría
     * @param {Object} categoriaData - Datos a actualizar
     * 
     * @returns {Promise<Object>} Categoría actualizada
     * @throws {Error} Si la categoría no existe
     */
    async updateCategoria(id, categoriaData) {
        return await sequelize.transaction(async (transaction) => {
            // Buscar categoría
            const categoria = await Categoria.findByPk(id, { transaction })
            if(!categoria) throw new Error("Categoría no encontrada")

            // Actualizar categoría
            await categoria.update(categoriaData, { transaction })
            return categoria;
        })
    }

    /**
     * Eliminar categoría
     * 
     * @param {Number} id - ID de la categoría
     * @returns {Promise<Boolean>} true si fue eliminada
     * @throws {Error} Si la categoría no existe
     */
    async deleteCategoria(id) {
        return await sequelize.transaction(async (transaction) => {
            // Buscar categoría
            const categoria = await Categoria.findByPk(id, { transaction })
            if(!categoria) throw new Error("Categoría no encontrada")

            // Eliminar categoría
            await categoria.destroy({ transaction })
            return true;
        })
    }
}