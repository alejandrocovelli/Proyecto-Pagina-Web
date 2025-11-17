/**
 * ========================================
 * CONTROLLER: AUTENTICACION
 * ========================================
 * Maneja peticiones HTTP de autenticación
 * Procesa login y verifica identidad del usuario
 * 
 * Responsabilidades:
 * - Recibir credenciales de login
 * - Llamar servicio de autenticación
 * - Retornar token JWT
 * - Verificar que el usuario esté autenticado
 */

import { AuthService } from "../services/AuthService.js";

// Crear instancia del servicio
const authService = new AuthService();

export class AuthController {
    /**
     * POST /api/auth/login
     * Realizar login del usuario
     * Verifica credenciales y retorna token JWT
     * 
     * Body requerido:
     * {
     *   "correo": "usuario@example.com",
     *   "contraseña": "Micontraseña123"
     * }
     * 
     * Respuesta exitosa (200):
     * {
     *   "success": true,
     *   "token": "eyJhbGciOiJIUzI1NiIs...",
     *   "user": { ... }
     * }
     * 
     * Respuesta error (400):
     * {
     *   "error": "Usuario no encontrado" o "Contraseña incorrecta"
     * }
     * 
     * @returns {Response} JSON con token y datos del usuario
     */
    static async login(req, res) {
        try {
            // Extraer credenciales del body
            const { correo, contraseña } = req.body;
            // Llamar al servicio para autenticar
            const result = await authService.login(correo, contraseña);
            console.log(result);
            // Retornar respuesta con token
            res.status(200).json(result);
        } catch(error) {
            // Retornar error de credenciales inválidas
            res.status(400).json({ error: error.message })
        }
    }

    /**
     * GET /api/auth/me
     * Obtener datos del usuario autenticado actual
     * Requiere token JWT válido en header Authorization
     * 
     * Header requerido:
     * Authorization: Bearer <token>
     * 
     * Respuesta exitosa (200):
     * {
     *   "mensaje": "Usuario autenticado",
     *   "user": {
     *     "idUsuario": 1,
     *     "tipo": 2
     *   }
     * }
     * 
     * Respuesta error (401):
     * {
     *   "mensaje": "Usuario no autenticado"
     * }
     * 
     * Nota: req.user se llena en AuthMiddleware si el token es válido
     * 
     * @returns {Response} JSON con datos del usuario
     */
    static async me(req, res) {
        try {
            // Obtener usuario del middleware de autenticación
            const user = req.user;
            
            // Si no hay usuario, no está autenticado
            if (!user) {
                return res.status(401).json({ 
                    mensaje: "Usuario no autenticado" 
                });
            }
            
            // Retornar datos del usuario
            res.status(200).json({ 
                mensaje: "Usuario autenticado", 
                user 
            })
        } catch (error) {
            return res.status(500).json({
                error: "Error interno del servidor"
            });
        }
    }
}