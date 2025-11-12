/**
 * ========================================
 * ROUTER: DIRECCIONES ROUTES
 * ========================================
 * Definición de todas las rutas para gestión de direcciones
 * Punto de entrada: /api/direcciones
 * 
 * Responsabilidades:
 * - Mapear métodos HTTP a controladores
 * - Aplicar validadores a cada ruta
 * - Validar ID de dirección en parámetros
 * - Validar datos de creación y actualización
 * 
 * Endpoints disponibles:
 * - GET /api/direcciones - Listar todas las direcciones
 * - GET /api/direcciones/:id - Obtener dirección específica
 * - POST /api/direcciones - Crear nueva dirección
 * - PUT /api/direcciones/:id - Actualizar dirección
 * - DELETE /api/direcciones/:id - Eliminar dirección
 * 
 * Contexto:
 * - Las direcciones pertenecen a un usuario
 * - Se usan como dirección de entrega en órdenes
 * - No hay autenticación requerida en estas rutas
 */

import { Router } from "express"
import { DireccionController } from "../controllers/DireccionController.js"
import { validateCreateDireccion, validateDireccionId, validateUpdateDireccion } from "../validators/direccionValidator.js";

const router = Router()

/**
 * GET /api/direcciones
 * Obtener todas las direcciones
 * 
 * Respuestas:
 * - 200: Array de todas las direcciones con usuario propietario
 * - 400: Error al listar direcciones
 * - 500: Error del servidor
 * 
 * Sin autenticación requerida
 */
router.get("/", DireccionController.getDirecciones)

/**
 * GET /api/direcciones/:id
 * Obtener dirección específica por ID
 * 
 * Parámetros URL:
 * - id: Número entero positivo (validado por validateDireccionId)
 * 
 * Respuestas:
 * - 200: Dirección encontrada con usuario propietario
 * - 400: ID de dirección inválido (validación fallida)
 * - 404: Dirección no encontrada
 * - 500: Error del servidor
 * 
 * Middleware: validateDireccionId - Valida que ID sea entero > 0
 */
router.get("/:id", validateDireccionId, DireccionController.getDireccionById)

/**
 * POST /api/direcciones
 * Crear nueva dirección
 * 
 * Body requerido:
 * {
 *   "direccion": "string (requerido)",
 *   "ciudad": "string (requerido)",
 *   "barrio": "string (requerido)",
 *   "idUsuario": number (requerido)
 * }
 * 
 * Respuestas:
 * - 201: Dirección creada exitosamente
 * - 400: Datos de dirección inválidos (validación fallida)
 * - 500: Error del servidor
 * 
 * Middleware: validateCreateDireccion
 * - Valida que todos los campos sean strings
 * - Valida longitud de campos
 * - Valida que idUsuario sea entero
 */
router.post("/", validateCreateDireccion, DireccionController.createDireccion)

/**
 * PUT /api/direcciones/:id
 * Actualizar dirección existente
 * 
 * Parámetros URL:
 * - id: Número entero positivo (validado por validateDireccionId)
 * 
 * Body (todos opcionales):
 * {
 *   "direccion": "string",
 *   "ciudad": "string",
 *   "barrio": "string"
 * }
 * 
 * Respuestas:
 * - 200: Dirección actualizada exitosamente
 * - 400: Datos inválidos (validación fallida)
 * - 404: Dirección no encontrada
 * - 500: Error del servidor
 * 
 * Middleware: [validateDireccionId, validateUpdateDireccion]
 * - Valida que ID sea entero > 0
 * - Valida cada campo si se proporciona (todos opcionales)
 */
router.put("/:id", [...validateDireccionId, ...validateUpdateDireccion], DireccionController.updateDireccion)

/**
 * DELETE /api/direcciones/:id
 * Eliminar dirección
 * 
 * Parámetros URL:
 * - id: Número entero positivo (validado por validateDireccionId)
 * 
 * Respuestas:
 * - 200: Dirección eliminada exitosamente
 * - 400: ID de dirección inválido (validación fallida)
 * - 404: Dirección no encontrada
 * - 500: Error del servidor
 * 
 * Middleware: validateDireccionId - Valida que ID sea entero > 0
 * 
 * Nota: Si la dirección está asociada a una orden, 
 * podría causar problemas de integridad según configuración de cascada
 */
router.delete("/:id", validateDireccionId, DireccionController.deleteDireccion)

export default router;
