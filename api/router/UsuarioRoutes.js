/**
 * ========================================
 * RUTAS: USUARIO
 * ========================================
 * Define todos los endpoints (URLs) relacionados con usuarios
 * Mapea peticiones HTTP a controladores específicos
 * 
 * Responsabilidades:
 * - Definir rutas HTTP (GET, POST, PUT, DELETE)
 * - Aplicar validadores como middleware
 * - Aplicar autenticación si es necesaria
 * - Conectar rutas con controladores
 * 
 * Base URL: /api/usuarios
 * Ejemplo: GET http://localhost:3000/api/usuarios/1
 */

import { Router } from "express"
import { UsuarioController } from "../controllers/UsuarioController.js"
import { validateCreateUsuario, validateUpdateUsuario, validateUsuarioId } from "../validators/usuarioValidator.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";

// Crear router para rutas de usuario
const router = Router()

/**
 * GET /api/usuarios
 * Obtener lista de todos los usuarios
 * No requiere validación de parámetros
 * 
 * Respuesta exitosa (200):
 * {
 *   "mensaje": "Usuarios listados correctamente",
 *   "data": [...]
 * }
 */
router.get("/", UsuarioController.getUsuarios);

/**
 * GET /api/usuarios/:id
 * Obtener usuario específico por ID
 * Valida que el ID sea un número válido
 * 
 * Parámetros: id (número entero positivo)
 * 
 * Respuesta exitosa (200):
 * {
 *   "mensaje": "Usuario obtenido correctamente",
 *   "data": {...}
 * }
 */
router.get("/:id", validateUsuarioId, UsuarioController.getUsuarioById);

/**
 * POST /api/usuarios
 * Crear un nuevo usuario
 * Valida que todos los campos requeridos sean válidos
 * 
 * Body requerido:
 * {
 *   "nombre": "Juan Pérez",
 *   "correo": "juan@example.com",
 *   "contraseña": "Pass123",
 *   "tipo": 2
 * }
 * 
 * Respuesta exitosa (201):
 * {
 *   "mensaje": "Usuario creado correctamente",
 *   "data": {...}
 * }
 */
router.post("/", validateCreateUsuario, AuthMiddleware, UsuarioController.createUsuario);

/**
 * PUT /api/usuarios/:id
 * Actualizar usuario existente
 * Valida ID y campos opcionales
 * 
 * Parámetros: id (número entero positivo)
 * Body (todos los campos son opcionales):
 * {
 *   "nombre": "Juan Pérez Actualizado",
 *   "correo": "nuevo@example.com",
 *   "contraseña": "NewPass123",
 *   "tipo": 3
 * }
 * 
 * Respuesta exitosa (200):
 * {
 *   "mensaje": "Usuario actualizado correctamente",
 *   "data": {...}
 * }
 */
router.put("/:id", [...validateUsuarioId, ...validateUpdateUsuario], AuthMiddleware, UsuarioController.updateUsuario);

/**
 * DELETE /api/usuarios/:id
 * Eliminar usuario
 * Valida que el ID sea válido
 * 
 * Parámetros: id (número entero positivo)
 * 
 * Respuesta exitosa (200):
 * {
 *   "mensaje": "Usuario eliminado correctamente"
 * }
 */
router.delete("/:id", validateUsuarioId, AuthMiddleware, UsuarioController.deleteUsuario);

export default router;