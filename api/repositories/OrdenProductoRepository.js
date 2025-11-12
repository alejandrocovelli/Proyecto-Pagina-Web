/**
 * ========================================
 * REPOSITORY: ORDEN PRODUCTO
 * ========================================
 * Capa de acceso a datos para tabla junction OrdenProducto
 * Gestiona operaciones CRUD en la relación Orden-Producto
 * 
 * Contexto:
 * - OrdenProducto es una tabla junction (many-to-many)
 * - Relaciona Orden con Producto
 * - Almacena información adicional:
 *   * cantidad: Cuántas unidades del producto se compraron
 *   * precioUnidad: Precio unitario EN EL MOMENTO DE LA COMPRA
 *   * valorTotal: cantidad × precioUnidad
 * 
 * Importancia:
 * Se guardan precios en el momento de compra para mantener histórico
 * incluso si los precios de productos cambian después
 */

import { OrdenProducto } from "../models/OrdenProducto.js";
import { Orden } from "../models/Orden.js";
import { Producto } from "../models/Producto.js";
import { sequelize } from "../config/database.js";

export class OrdenProductoRepository {
    /**
     * Obtener todos los registros OrdenProducto
     * Incluye información de orden y producto
     * 
     * @returns {Promise<Array>} Array con todos los registros OrdenProducto
     * @throws {Error} Si no se encuentran registros
     */
    async getOrdenesProductos() {
        return await sequelize.transaction(async (transaction) => {
            const ordenesProductos = await OrdenProducto.findAll({
                attributes: [
                    "idOrdenProducto",
                    "cantidad",
                    "precioUnidad",
                    "valorTotal"
                ],
                include: [
                    {
                        model: Orden,
                        as: "orden",
                        attributes: ["idOrden", "totalPago"]
                    },
                    {
                        model: Producto,
                        as: "producto",
                        attributes: ["idProducto", "nombre", "precio"]
                    }
                ],
                transaction
            })
            if(!ordenesProductos) throw new Error("Órdenes-productos no encontrados")

            return ordenesProductos;
        })
    }

    /**
     * Obtener registro OrdenProducto específico por ID
     * 
     * @param {Number} id - ID de OrdenProducto
     * @returns {Promise<Object>} Registro OrdenProducto con orden y producto
     * @throws {Error} Si no se encuentra
     */
    async getOrdenProductoById(id) {
        return await sequelize.transaction(async (transaction) => {
            const ordenProducto = await OrdenProducto.findByPk(id, {
                attributes: [
                    "idOrdenProducto",
                    "cantidad",
                    "precio"
                ],
                include: [
                    {
                        model: Orden,
                        as: "orden",
                        attributes: ["idOrden", "fecha"]
                    },
                    {
                        model: Producto,
                        as: "producto",
                        attributes: ["idProducto", "nombre", "precio"]
                    }
                ],
                transaction
            })
            if(!ordenProducto) throw new Error("Orden-producto no encontrado")

            return ordenProducto;
        })
    }

    /**
     * Crear nuevo registro OrdenProducto
     * 
     * NOTA: Típicamente creado automáticamente cuando se crea una orden
     * en OrdenRepository.createOrden()
     * 
     * @param {Object} ordenProductoData - Datos:
     *   - idOrden: ID de la orden
     *   - idProducto: ID del producto
     *   - cantidad: Número de unidades
     *   - precioUnidad: Precio en momento de compra
     *   - valorTotal: cantidad × precioUnidad
     * 
     * @returns {Promise<Object>} Registro OrdenProducto creado
     * @throws {Error} Si hay error en creación
     */
    async createOrdenProducto(ordenProductoData) {
        return await sequelize.transaction(async (transaction) => {
            const ordenProducto = await OrdenProducto.create(ordenProductoData, { transaction })
            if(!ordenProducto) throw new Error("Error al crear el orden-producto")

            return ordenProducto;
        })
    }

    /**
     * Actualizar registro OrdenProducto
     * 
     * Podría usarse para cambiar cantidad o valores en caso de correcciones
     * 
     * @param {Number} id - ID de OrdenProducto
     * @param {Object} ordenProductoData - Datos a actualizar
     * @returns {Promise<Object>} Registro actualizado
     * @throws {Error} Si no se encuentra
     */
    async updateOrdenProducto(id, ordenProductoData) {
        return await sequelize.transaction(async (transaction) => {
            const ordenProducto = await OrdenProducto.findByPk(id, { transaction })
            if(!ordenProducto) throw new Error("Orden-producto no encontrado")

            await ordenProducto.update(ordenProductoData, { transaction })
            return ordenProducto;
        })
    }

    /**
     * Eliminar registro OrdenProducto
     * 
     * @param {Number} id - ID de OrdenProducto
     * @returns {Promise<Boolean>} true si fue eliminado
     * @throws {Error} Si no se encuentra
     */
    async deleteOrdenProducto(id) {
        return await sequelize.transaction(async (transaction) => {
            const ordenProducto = await OrdenProducto.findByPk(id, { transaction })
            if(!ordenProducto) throw new Error("Orden-producto no encontrado")

            await ordenProducto.destroy({ transaction })
            return true;
        })
    }
}