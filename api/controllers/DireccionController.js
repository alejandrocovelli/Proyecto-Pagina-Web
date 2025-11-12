/**
 * ========================================
 * CONTROLLER: DIRECCION
 * ========================================
 * Capa de manejador de HTTP para direcciones
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
 * - 404: Not Found (Dirección no existe)
 * - 500: Internal Server Error (Error del servidor)
 */

import { DireccionService } from "../services/DireccionService.js";

// Instancia del servicio de direcciones
const direccionService = new DireccionService();

export class DireccionController {
    /**
     * Obtener todas las direcciones
     * 
     * GET /api/direcciones
     * 
     * @param {Request} req - Objeto de solicitud HTTP
     * @param {Response} res - Objeto de respuesta HTTP
     * 
     * Respuestas:
     * - 200: Array de direcciones listadas
     * - 400: Error al listar direcciones
     * - 500: Error interno del servidor
     */
    static async getDirecciones(req, res) {
        try {
            const result = await direccionService.getDirecciones()
            if(!result) {
                res.status(400).json({ error: "Error al listar direcciones", result})
            }
            res.status(200).json({mensaje: "Direcciones listadas correctamente", result})
        } catch (error) {
            console.error("Error en getDirecciones:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    /**
     * Obtener dirección por ID
     * 
     * GET /api/direcciones/:id
     * 
     * @param {Request} req - Objeto de solicitud HTTP con params.id
     * @param {Response} res - Objeto de respuesta HTTP
     * 
     * Parámetros:
     * - id: ID de la dirección (del URL)
     * 
     * Respuestas:
     * - 200: Dirección encontrada y retornada
     * - 404: Dirección no existe
     * - 500: Error interno del servidor
     */
    static async getDireccionById(req, res) {
        try {
            const { id } = req.params;
            const result = await direccionService.getDireccionById(id)
            if(!result) {
                return res.status(404).json({ error: "Dirección no encontrada" })
            }
            res.status(200).json({mensaje: "Dirección encontrada", result})
        } catch (error) {
            console.error("Error en getDireccionById:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    /**
     * Crear nueva dirección
     * 
     * POST /api/direcciones
     * Body requerido:
     * {
     *   "direccion": "string",
     *   "ciudad": "string",
     *   "barrio": "string",
     *   "idUsuario": number
     * }
     * 
     * @param {Request} req - Objeto de solicitud HTTP con body
     * @param {Response} res - Objeto de respuesta HTTP
     * 
     * Respuestas:
     * - 201: Dirección creada correctamente
     * - 400: Error al crear la dirección
     * - 500: Error interno del servidor
     */
    static async createDireccion(req, res) {
        try {
            const result = await direccionService.createDireccion(req.body)
            if(!result) {
                return res.status(400).json({ error: "Error al crear la dirección" })
            }
            res.status(201).json({mensaje: "Dirección creada correctamente", result})
        } catch (error) {
            console.error("Error en createDireccion:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    /**
     * Actualizar dirección existente
     * 
     * PUT /api/direcciones/:id
     * Body con datos a actualizar:
     * {
     *   "direccion": "string (opcional)",
     *   "ciudad": "string (opcional)",
     *   "barrio": "string (opcional)"
     * }
     * 
     * @param {Request} req - Objeto de solicitud HTTP con params.id y body
     * @param {Response} res - Objeto de respuesta HTTP
     * 
     * Parámetros:
     * - id: ID de la dirección (del URL)
     * 
     * Respuestas:
     * - 200: Dirección actualizada correctamente
     * - 404: Dirección no encontrada
     * - 500: Error interno del servidor
     */
    static async updateDireccion(req, res) {
        try {
            const { id } = req.params;
            const result = await direccionService.updateDireccion(id, req.body)
            if(!result) {
                return res.status(404).json({ error: "Dirección no encontrada" })
            }
            res.status(200).json({mensaje: "Dirección actualizada correctamente", result})
        } catch (error) {
            console.error("Error en updateDireccion:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    /**
     * Eliminar dirección
     * 
     * DELETE /api/direcciones/:id
     * 
     * @param {Request} req - Objeto de solicitud HTTP con params.id
     * @param {Response} res - Objeto de respuesta HTTP
     * 
     * Parámetros:
     * - id: ID de la dirección (del URL)
     * 
     * Respuestas:
     * - 200: Dirección eliminada correctamente
     * - 404: Dirección no encontrada
     * - 500: Error interno del servidor
     */
    static async deleteDireccion(req, res) {
        try {
            const { id } = req.params;
            const result = await direccionService.deleteDireccion(id)
            if(!result) {
                return res.status(404).json({ error: "Dirección no encontrada" })
            }
            res.status(200).json({mensaje: "Dirección eliminada correctamente"})
        } catch (error) {
            console.error("Error en deleteDireccion:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }
}