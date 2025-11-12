/**
 * ========================================
 * CONTROLLER: USUARIO
 * ========================================
 * Capa de presentación (Presentation Layer)
 * Maneja las peticiones HTTP y genera respuestas
 * 
 * Responsabilidades:
 * - Recibir peticiones HTTP desde las rutas
 * - Extraer datos de la petición (body, params, query)
 * - Llamar al servicio correspondiente
 * - Formatear respuestas HTTP consistentes
 * - Manejar códigos de estado HTTP apropiados
 * - Loguear errores para debugging
 * 
 * Patrón: MVC Controller
 * No contiene lógica de negocio, solo orquestación
 * 
 * Métodos estáticos para no necesitar instanciación
 */

import { UsuarioService } from "../services/UsuarioService.js";

// Crear instancia del servicio
const usuarioService = new UsuarioService();

export class UsuarioController {
    /**
     * GET /api/usuarios
     * Obtener lista de todos los usuarios
     * 
     * @param {Object} req - Objeto de petición HTTP
     * @param {Object} res - Objeto de respuesta HTTP
     * 
     * @returns {Response} JSON con array de usuarios o error
     * Códigos: 200 (éxito), 400 (error en lógica), 500 (error servidor)
     */
    static async getUsuarios(req, res) {
        try {
            // Llamar al servicio para obtener usuarios
            const result = await usuarioService.getUsuarios();
            
            if(!result.success) {
                return res.status(400).json({ 
                    error: "Error al listar usuarios"
                });
            }
            
            // Respuesta exitosa
            return res.status(200).json({
                mensaje: "Usuarios listados correctamente",
                data: result.data
            });
        } catch (error) {
            // Loguear error para debugging
            console.error("Error en getUsuarios:", error);
            
            // Respuesta de error genérica (no exponer detalles al cliente)
            return res.status(500).json({
                error: "Error interno del servidor"
            });
        }
    }

    /**
     * GET /api/usuarios/:id
     * Obtener usuario específico por ID
     * 
     * @param {Object} req - Objeto de petición HTTP
     * @param {Object} req.params.id - ID del usuario
     * @param {Object} res - Objeto de respuesta HTTP
     * 
     * @returns {Response} JSON con datos del usuario o error
     * Códigos: 200 (éxito), 404 (no encontrado), 500 (error servidor)
     */
    static async getUsuarioById(req, res) {
        try {
            // Obtener ID de los parámetros de la ruta
            const result = await usuarioService.getUsuarioById(req.params.id);
            
            if(!result.success) {
                return res.status(404).json({ 
                    error: "Usuario no encontrado"
                });
            }
            
            // Respuesta exitosa
            return res.status(200).json({
                mensaje: "Usuario obtenido correctamente",
                data: result.data
            });
        } catch (error) {
            console.error("Error en getUsuarioById:", error);
            
            // Si es error de "no encontrado", retornar 404
            if (error.message.includes("no encontrado")) {
                return res.status(404).json({
                    error: error.message
                });
            }
            
            return res.status(500).json({
                error: "Error interno del servidor"
            });
        }
    }

    /**
     * POST /api/usuarios
     * Crear un nuevo usuario
     * 
     * @param {Object} req - Objeto de petición HTTP
     * @param {Object} req.body - Datos del nuevo usuario
     * @param {Object} res - Objeto de respuesta HTTP
     * 
     * @returns {Response} JSON con usuario creado o error
     * Códigos: 201 (creado), 400 (datos inválidos), 500 (error servidor)
     */
    static async createUsuario(req, res) {
        try {
            // Llamar al servicio con datos del body
            const result = await usuarioService.createUsuario(req.body);
            
            if(!result.success) {
                return res.status(400).json({ 
                    error: "Error al crear usuario"
                });
            }
            
            // Respuesta exitosa con código 201 (Created)
            return res.status(201).json({
                mensaje: "Usuario creado correctamente",
                data: result.data
            });
        } catch (error) {
            console.error("Error en createUsuario:", error);
            
            // Si es error de correo duplicado
            if (error.message.includes("Ya existe")) {
                return res.status(400).json({
                    error: error.message
                });
            }
            
            return res.status(500).json({
                error: "Error interno del servidor"
            });
        }
    }

    /**
     * PUT /api/usuarios/:id
     * Actualizar usuario existente
     * 
     * @param {Object} req - Objeto de petición HTTP
     * @param {Object} req.params.id - ID del usuario a actualizar
     * @param {Object} req.body - Datos a actualizar
     * @param {Object} res - Objeto de respuesta HTTP
     * 
     * @returns {Response} JSON con usuario actualizado o error
     * Códigos: 200 (éxito), 404 (no encontrado), 400 (datos inválidos), 500 (error servidor)
     */
    static async updateUsuario(req, res) {
        try {
            // Llamar al servicio con ID y datos
            const result = await usuarioService.updateUsuario(req.params.id, req.body);
            
            if(!result.success) {
                return res.status(400).json({ 
                    error: "Error al actualizar usuario"
                });
            }
            
            // Respuesta exitosa
            return res.status(200).json({
                mensaje: "Usuario actualizado correctamente",
                data: result.data
            });
        } catch (error) {
            console.error("Error en updateUsuario:", error);
            
            // Manejo específico de errores
            if (error.message.includes("no encontrado")) {
                return res.status(404).json({
                    error: error.message
                });
            }
            
            if (error.message.includes("Ya existe")) {
                return res.status(400).json({
                    error: error.message
                });
            }
            
            return res.status(500).json({
                error: "Error interno del servidor"
            });
        }
    }

    /**
     * DELETE /api/usuarios/:id
     * Eliminar usuario
     * 
     * @param {Object} req - Objeto de petición HTTP
     * @param {Object} req.params.id - ID del usuario a eliminar
     * @param {Object} res - Objeto de respuesta HTTP
     * 
     * @returns {Response} JSON con mensaje de éxito o error
     * Códigos: 200 (éxito), 404 (no encontrado), 500 (error servidor)
     */
    static async deleteUsuario(req, res) {
        try {
            // Llamar al servicio para eliminar usuario
            const result = await usuarioService.deleteUsuario(req.params.id);
            
            if(!result.success) {
                return res.status(400).json({ 
                    error: "Error al eliminar usuario"
                });
            }
            
            // Respuesta exitosa
            return res.status(200).json({
                mensaje: "Usuario eliminado correctamente"
            });
        } catch (error) {
            console.error("Error en deleteUsuario:", error);
            
            if (error.message.includes("no encontrado")) {
                return res.status(404).json({
                    error: error.message
                });
            }
            
            return res.status(500).json({
                error: "Error interno del servidor"
            });
        }
    }
}