/**
 * ========================================
 * ROUTER: ORDENES PRODUCTOS ROUTES
 * ========================================
 * Definición de rutas para tabla junction OrdenProducto
 * Punto de entrada: /api/ordenesProductos
 * 
 * Responsabilidades:
 * - Mapear métodos HTTP a controladores
 * - Aplicar validadores a cada ruta
 * - Validar datos de creación y actualización
 * 
 * Endpoints disponibles:
 * - GET /api/ordenesProductos - Listar todos los registros
 * - GET /api/ordenesProductos/:id - Obtener registro específico
 * - POST /api/ordenesProductos - Crear nuevo registro
 * - PUT /api/ordenesProductos/:id - Actualizar registro
 * - DELETE /api/ordenesProductos/:id - Eliminar registro
 * 
 * Nota: 
 * - Normalmente los registros se crean automáticamente al crear una orden
 * - Estos endpoints son principalmente para consultas y correcciones
 * - No hay autenticación requerida
 */

import { Router } from "express"
import { OrdenProductoController } from "../controllers/OrdenProductoController.js"
import { validateCreateOrdenProducto, validateUpdateOrdenProducto } from "../validators/ordenProductoValidator.js";

const router = Router()

/**
 * GET /api/ordenesProductos
 * Obtener todos los registros OrdenProducto
 * 
 * Respuestas:
 * - 200: Array de todos los registros con orden y producto
 * - 400: Error al listar
 * - 500: Error del servidor
 * 
 * Sin autenticación requerida
 */
router.get("/", OrdenProductoController.getOrdenesProductos)

/**
 * GET /api/ordenesProductos/:id
 * Obtener registro OrdenProducto específico por ID
 * 
 * Parámetros URL:
 * - id: Número entero positivo (ID del registro)
 * 
 * Respuestas:
 * - 200: Registro encontrado con orden y producto
 * - 404: Registro no encontrado
 * - 500: Error del servidor
 * 
 * Sin validación explícita de parámetro (validar si es necesario)
 */
router.get("/:id", OrdenProductoController.getOrdenProductoById)

/**
 * POST /api/ordenesProductos
 * Crear nuevo registro OrdenProducto
 * 
 * Body requerido:
 * {
 *   "idOrden": number,
 *   "idProducto": number,
 *   "cantidad": number,
 *   "precioUnidad": number,
 *   "valorTotal": number
 * }
 * 
 * Respuestas:
 * - 201: Registro creado exitosamente
 * - 400: Datos inválidos (validación fallida)
 * - 500: Error del servidor
 * 
 * Middleware: validateCreateOrdenProducto
 * - Valida cantidad (entero > 0)
 * - Valida precioUnidad (entero >= 0)
 * - Valida valorTotal (entero >= 0)
 * - Valida idOrden e idProducto (enteros)
 * 
 * Nota: Normalmente no se llama directamente
 * Se crea automáticamente en OrdenRepository.createOrden()
 */
router.post("/", validateCreateOrdenProducto, OrdenProductoController.createOrdenProducto)

/**
 * PUT /api/ordenesProductos/:id
 * Actualizar registro OrdenProducto
 * 
 * Parámetros URL:
 * - id: Número entero positivo (ID del registro)
 * 
 * Body (todos opcionales en este caso):
 * {
 *   "cantidad": number,
 *   "precioUnidad": number,
 *   "valorTotal": number
 * }
 * 
 * Respuestas:
 * - 200: Registro actualizado exitosamente
 * - 400: Datos inválidos (validación fallida)
 * - 404: Registro no encontrado
 * - 500: Error del servidor
 * 
 * Middleware: validateUpdateOrdenProducto
 * - Valida cantidad (entero > 0)
 * - Valida precioUnidad (entero >= 0)
 * - Valida valorTotal (entero >= 0)
 * 
 * Uso: Corregir cantidad o precios en caso de error
 */
router.put("/:id", [...validateUpdateOrdenProducto], OrdenProductoController.updateOrdenProducto)

/**
 * DELETE /api/ordenesProductos/:id
 * Eliminar registro OrdenProducto
 * 
 * Parámetros URL:
 * - id: Número entero positivo (ID del registro)
 * 
 * Respuestas:
 * - 200: Registro eliminado exitosamente
 * - 404: Registro no encontrado
 * - 500: Error del servidor
 * 
 * Sin validación explícita (validar si es necesario)
 */
router.delete("/:id", OrdenProductoController.deleteOrdenProducto)

export default router;
