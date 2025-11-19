/**
 * ========================================
 * CONTROLLER: ORDEN
 * ========================================
 * Capa de manejador de HTTP para órdenes
 * Procesa solicitudes y respuestas HTTP
 * 
 * Responsabilidades:
 * - Recibir solicitudes HTTP
 * - Llamar servicios de negocio
 * - Retornar respuestas HTTP con códigos de estado
 * - Manejo de errores con códigos HTTP apropiados
 * 
 * Códigos HTTP utilizados:
 * - 200: OK (GET exitoso, UPDATE exitoso, DELETE exitoso)
 * - 201: Created (POST exitoso)
 * - 400: Bad Request (Datos inválidos)
 * - 404: Not Found (Orden no existe)
 * - 500: Internal Server Error (Error del servidor)
 * 
 * Nota: La lógica de descuentos mayoristas se maneja en el servicio/repositorio
 */

import { OrdenService } from "../services/OrdenService.js";

// Instancia del servicio de órdenes
const ordenService = new OrdenService();

export class OrdenController {
    /**
     * Obtener todas las órdenes
     * 
     * GET /api/ordenes
     * 
     * @param {Request} req - Objeto de solicitud HTTP
     * @param {Response} res - Objeto de respuesta HTTP
     * 
     * Respuestas:
     * - 200: Array de órdenes listadas con productos y usuario
     * - 400: Error al listar órdenes
     * - 500: Error interno del servidor
     */
    static async getOrdenes(req, res) {
        try {
            const result = await ordenService.getOrdenes()
            if(!result) {
                res.status(400).json({ error: "Error al listar órdenes", result})
            }
            res.status(200).json({mensaje: "Órdenes listadas correctamente", result})
        } catch (error) {
            console.error("Error en getOrdenes:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    /**
     * Obtener orden por ID
     * 
     * GET /api/ordenes/:id
     * 
     * @param {Request} req - Objeto de solicitud HTTP con params.id
     * @param {Response} res - Objeto de respuesta HTTP
     * 
     * Parámetros:
     * - id: ID de la orden (del URL)
     * 
     * Respuestas:
     * - 200: Orden encontrada con sus productos
     * - 404: Orden no existe
     * - 500: Error interno del servidor
     */
    static async getOrdenById(req, res) {
        try {
            const { id } = req.params;
            const result = await ordenService.getOrdenById(id)
            if(!result) {
                return res.status(404).json({ error: "Orden no encontrada" })
            }
            res.status(200).json({mensaje: "Orden encontrada", result})
        } catch (error) {
            console.error("Error en getOrdenById:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    static async getCarrito(req, res) {
        try {
            const { idUsuario } = req.params;
            const result = await ordenService.getCarrito(idUsuario)
            if (result && result.data === null) {
                return res.status(404).json({ mensaje: "Carrito no encontrado", result: null });
            }
            res.status(200).json({mensaje: "Carrito encontrado", result})
        } catch (error) {
            console.error("Error en getCarrito:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    /**
     * Crear nueva orden
     * 
     * POST /api/ordenes
     * Body requerido:
     * {
     *   "idUsuario": number,
     *   "idDireccion": number,
     *   "estado": string,
     *   "productos": [
     *     {"idProducto": number, "cantidad": number},
     *     {"idProducto": number, "cantidad": number}
     *   ]
     * }
     * 
     * IMPORTANTE: En este endpoint se aplican:
     * - Validación de usuario (no admin)
     * - Validación de dirección de entrega
     * - Cálculo de precios por producto
     * - Descuento mayorista si usuario tipo 3 y total >= $140,000
     * 
     * @param {Request} req - Objeto de solicitud HTTP con body
     * @param {Response} res - Objeto de respuesta HTTP
     * 
     * Respuestas:
     * - 201: Orden creada correctamente con estructura:
     *   {
     *     "result": {
     *       "orden": {idOrden, estado, totalPago, idUsuario, idDireccion},
     *       "productos": [Array de OrdenProducto creados]
     *     }
     *   }
     * - 400: Error al crear la orden
     * - 500: Error interno del servidor
     */
    static async createOrden(req, res) {
        try {
            console.log(req.body);
            const result = await ordenService.createOrden(req.body)
            if(!result) {
                return res.status(400).json({ error: "Error al crear la orden" })
            }
            res.status(201).json({mensaje: "Orden creada correctamente", result})
        } catch (error) {
            console.error("Error en createOrden:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    /**
     * Actualizar orden existente
     * 
     * PUT /api/ordenes/:id
     * Body con datos a actualizar:
     * {
     *   "estado": string (opcional),
     *   "totalPago": number (opcional)
     * }
     * 
     * Uso típico: Cambiar estado de la orden (pendiente → en preparación → enviado → entregado)
     * 
     * @param {Request} req - Objeto de solicitud HTTP con params.id y body
     * @param {Response} res - Objeto de respuesta HTTP
     * 
     * Parámetros:
     * - id: ID de la orden (del URL)
     * 
     * Respuestas:
     * - 200: Orden actualizada correctamente
     * - 404: Orden no encontrada
     * - 500: Error interno del servidor
     */
    static async updateOrden(req, res) {
        try {
            const { idOrden } = req.params;
            const result = await ordenService.updateOrden(idOrden, req.body)
            if(!result) {
                return res.status(404).json({ error: "Orden no encontrada" })
            }
            res.status(200).json({mensaje: "Orden actualizada correctamente", result})
        } catch (error) {
            console.error("Error en updateOrden:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    /**
     * Eliminar orden
     * 
     * DELETE /api/ordenes/:id
     * 
     * @param {Request} req - Objeto de solicitud HTTP con params.id
     * @param {Response} res - Objeto de respuesta HTTP
     * 
     * Parámetros:
     * - id: ID de la orden (del URL)
     * 
     * Respuestas:
     * - 200: Orden eliminada correctamente
     * - 404: Orden no encontrada
     * - 500: Error interno del servidor
     */
    static async deleteOrden(req, res) {
        try {
            const { id } = req.params;
            const result = await ordenService.deleteOrden(id)
            if(!result) {
                return res.status(404).json({ error: "Orden no encontrada" })
            }
            res.status(200).json({mensaje: "Orden eliminada correctamente"})
        } catch (error) {
            console.error("Error en deleteOrden:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }
}