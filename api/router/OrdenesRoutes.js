/**
 * ========================================
 * ROUTER: ORDENES ROUTES
 * ========================================
 * Definición de todas las rutas para gestión de órdenes
 * Punto de entrada: /api/ordenes
 * 
 * Responsabilidades:
 * - Mapear métodos HTTP a controladores
 * - Aplicar validadores a cada ruta
 * - Validar ID de orden en parámetros
 * - Validar datos de creación y actualización
 * 
 * Endpoints disponibles:
 * - GET /api/ordenes - Listar todas las órdenes
 * - GET /api/ordenes/:id - Obtener orden específica
 * - POST /api/ordenes - Crear nueva orden
 * - PUT /api/ordenes/:id - Actualizar orden
 * - DELETE /api/ordenes/:id - Eliminar orden
 * 
 * Nota: Todas las rutas son públicas (sin autenticación requerida)
 */

import { Router } from "express"
import { OrdenController } from "../controllers/OrdenController.js"
import { validateCreateOrden, validateOrdenId, validateUpdateOrden } from "../validators/ordenValidator.js";

const router = Router()

/**
 * GET /api/ordenes
 * Obtener todas las órdenes
 * 
 * Respuestas:
 * - 200: Array de todas las órdenes con usuarios y productos
 * - 400: Error al listar órdenes
 * - 500: Error del servidor
 * 
 * Sin autenticación requerida
 */
router.get("/", OrdenController.getOrdenes)

/**
 * GET /api/ordenes/:id
 * Obtener orden específica por ID
 * 
 * Parámetros URL:
 * - id: Número entero positivo (validado por validateOrdenId)
 * 
 * Respuestas:
 * - 200: Orden encontrada con sus productos y usuario
 * - 400: ID de orden inválido (validación fallida)
 * - 404: Orden no encontrada
 * - 500: Error del servidor
 * 
 * Middleware: validateOrdenId - Valida que ID sea entero > 0
 */
router.get("/:id", validateOrdenId, OrdenController.getOrdenById)

/**
 * POST /api/ordenes
 * Crear nueva orden
 * 
 * Body requerido:
 * {
 *   "estado": number (1-4),
 *   "idUsuario": number,
 *   "idDireccion": number,
 *   "productos": [
 *     {"idProducto": number, "cantidad": number},
 *     {"idProducto": number, "cantidad": number}
 *   ]
 * }
 * 
 * Respuestas:
 * - 201: Orden creada exitosamente
 * - 400: Datos de orden inválidos (validación fallida)
 * - 500: Error del servidor
 * 
 * Middleware: validateCreateOrden
 * - Valida estado (1-4)
 * - Valida array de productos no vacío
 * - Valida idProducto y cantidad en cada producto
 * - Valida idUsuario e idDireccion
 * 
 * En el controlador se aplica lógica de negocio:
 * - Validación de usuario existe
 * - Validación de dirección existe
 * - Validación de usuario no sea admin
 * - Cálculo de precios
 * - Aplicación de descuentos mayoristas
 */
router.post("/", validateCreateOrden, OrdenController.createOrden)

/**
 * PUT /api/ordenes/:id
 * Actualizar orden existente
 * 
 * Parámetros URL:
 * - id: Número entero positivo (validado por validateOrdenId)
 * 
 * Body (todos opcionales):
 * {
 *   "estado": number (1-4),
 *   "totalPago": number (>= 0)
 * }
 * 
 * Respuestas:
 * - 200: Orden actualizada exitosamente
 * - 400: Datos inválidos (validación fallida)
 * - 404: Orden no encontrada
 * - 500: Error del servidor
 * 
 * Middleware: [validateOrdenId, validateUpdateOrden]
 * - Valida que ID sea entero > 0
 * - Valida estado (1-4) si se proporciona
 * - Valida totalPago >= 0 si se proporciona
 * 
 * Uso típico: Cambiar estado de la orden (pendiente → en proceso → enviado)
 */
router.put("/:id", [...validateOrdenId, ...validateUpdateOrden], OrdenController.updateOrden)

/**
 * DELETE /api/ordenes/:id
 * Eliminar orden
 * 
 * Parámetros URL:
 * - id: Número entero positivo (validado por validateOrdenId)
 * 
 * Respuestas:
 * - 200: Orden eliminada exitosamente
 * - 400: ID de orden inválido (validación fallida)
 * - 404: Orden no encontrada
 * - 500: Error del servidor
 * 
 * Middleware: validateOrdenId - Valida que ID sea entero > 0
 * 
 * Nota: Al eliminar una orden, se elimina en cascada:
 * - Registros en tabla OrdenProducto asociados
 * - (Según configuración de Sequelize con cascade)
 */
router.delete("/:id", validateOrdenId, OrdenController.deleteOrden)

export default router;
