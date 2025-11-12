/**
 * ========================================
 * CONTROLLER: ORDEN PRODUCTO
 * ========================================
 * Capa de manejador HTTP para OrdenProducto
 * Tabla junction que relaciona órdenes con productos
 * 
 * Responsabilidades:
 * - Recibir solicitudes HTTP
 * - Llamar servicios de negocio
 * - Retornar respuestas HTTP
 * 
 * Códigos HTTP utilizados:
 * - 200: OK (GET, UPDATE, DELETE exitoso)
 * - 201: Created (POST exitoso)
 * - 400: Bad Request (Datos inválidos)
 * - 404: Not Found (Registro no existe)
 * - 500: Internal Server Error (Error del servidor)
 * 
 * Nota: Normalmente los registros se crean automáticamente
 * Estos endpoints son principalmente para consultas y correcciones
 */

import { OrdenProductoService } from "../services/OrdenProductoService.js";

// Instancia del servicio
const ordenProductoService = new OrdenProductoService();

export class OrdenProductoController {
    /**
     * Obtener todos los registros OrdenProducto
     * 
     * GET /api/ordenesProductos
     * 
     * @param {Request} req - Objeto de solicitud HTTP
     * @param {Response} res - Objeto de respuesta HTTP
     * 
     * Respuestas:
     * - 200: Array de todos los registros OrdenProducto
     * - 400: Error al listar
     * - 500: Error interno del servidor
     */
    static async getOrdenesProductos(req, res) {
        try {
            const result = await ordenProductoService.getOrdenesProductos()
            if(!result) {
                res.status(400).json({ error: "Error al listar órdenes-productos", result})
            }
            res.status(200).json({mensaje: "Órdenes-productos listados correctamente", result})
        } catch (error) {
            console.error("Error en getOrdenesProductos:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    /**
     * Obtener registro OrdenProducto por ID
     * 
     * GET /api/ordenesProductos/:id
     * 
     * @param {Request} req - Objeto de solicitud HTTP con params.id
     * @param {Response} res - Objeto de respuesta HTTP
     * 
     * Parámetros:
     * - id: ID de OrdenProducto (del URL)
     * 
     * Respuestas:
     * - 200: Registro OrdenProducto encontrado
     * - 404: Registro no encontrado
     * - 500: Error interno del servidor
     */
    static async getOrdenProductoById(req, res) {
        try {
            const { id } = req.params;
            const result = await ordenProductoService.getOrdenProductoById(id)
            if(!result) {
                return res.status(404).json({ error: "Orden-producto no encontrado" })
            }
            res.status(200).json({mensaje: "Orden-producto encontrado", result})
        } catch (error) {
            console.error("Error en getOrdenProductoById:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    /**
     * Crear nuevo registro OrdenProducto
     * 
     * POST /api/ordenesProductos
     * Body requerido:
     * {
     *   "idOrden": number,
     *   "idProducto": number,
     *   "cantidad": number,
     *   "precioUnidad": number,
     *   "valorTotal": number
     * }
     * 
     * NOTA: Normalmente no se llama directamente
     * Se crea automáticamente al crear una orden
     * 
     * @param {Request} req - Objeto de solicitud HTTP con body
     * @param {Response} res - Objeto de respuesta HTTP
     * 
     * Respuestas:
     * - 201: Registro creado correctamente
     * - 400: Error al crear el registro
     * - 500: Error interno del servidor
     */
    static async createOrdenProducto(req, res) {
        try {
            const result = await ordenProductoService.createOrdenProducto(req.body)
            if(!result) {
                return res.status(400).json({ error: "Error al crear el orden-producto" })
            }
            res.status(201).json({mensaje: "Orden-producto creado correctamente", result})
        } catch (error) {
            console.error("Error en createOrdenProducto:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    /**
     * Actualizar registro OrdenProducto
     * 
     * PUT /api/ordenesProductos/:id
     * Body (todos opcionales):
     * {
     *   "cantidad": number,
     *   "precioUnidad": number,
     *   "valorTotal": number
     * }
     * 
     * @param {Request} req - Objeto de solicitud HTTP con params.id y body
     * @param {Response} res - Objeto de respuesta HTTP
     * 
     * Parámetros:
     * - id: ID de OrdenProducto (del URL)
     * 
     * Respuestas:
     * - 200: Registro actualizado correctamente
     * - 404: Registro no encontrado
     * - 500: Error interno del servidor
     */
    static async updateOrdenProducto(req, res) {
        try {
            const { id } = req.params;
            const result = await ordenProductoService.updateOrdenProducto(id, req.body)
            if(!result) {
                return res.status(404).json({ error: "Orden-producto no encontrado" })
            }
            res.status(200).json({mensaje: "Orden-producto actualizado correctamente", result})
        } catch (error) {
            console.error("Error en updateOrdenProducto:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    /**
     * Eliminar registro OrdenProducto
     * 
     * DELETE /api/ordenesProductos/:id
     * 
     * @param {Request} req - Objeto de solicitud HTTP con params.id
     * @param {Response} res - Objeto de respuesta HTTP
     * 
     * Parámetros:
     * - id: ID de OrdenProducto (del URL)
     * 
     * Respuestas:
     * - 200: Registro eliminado correctamente
     * - 404: Registro no encontrado
     * - 500: Error interno del servidor
     */
    static async deleteOrdenProducto(req, res) {
        try {
            const { id } = req.params;
            const result = await ordenProductoService.deleteOrdenProducto(id)
            if(!result) {
                return res.status(404).json({ error: "Orden-producto no encontrado" })
            }
            res.status(200).json({mensaje: "Orden-producto eliminado correctamente"})
        } catch (error) {
            console.error("Error en deleteOrdenProducto:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }
}