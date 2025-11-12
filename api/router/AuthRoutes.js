/**
 * ========================================
 * RUTAS: AUTENTICACION
 * ========================================
 * Define endpoints para autenticación de usuarios
 * Gestiona login y obtención de datos del usuario autenticado
 * 
 * Base URL: /api/auth
 */

import { Router } from "express";
import { validateLogin } from "../validators/AuthValidator.js";
import { AuthController } from "../controllers/AuthController.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";

// Crear router para rutas de autenticación
const router = Router()

/**
 * POST /api/auth/login
 * Realizar login del usuario
 * Valida credenciales y retorna token JWT
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
 *   "user": {...}
 * }
 */
router.post("/login", validateLogin, AuthController.login)

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
 *   "user": {...}
 * }
 */
router.get("/me", AuthMiddleware, AuthController.me)

export default router;