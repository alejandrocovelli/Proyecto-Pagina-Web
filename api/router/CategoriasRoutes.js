/**
 * ========================================
 * RUTAS: CATEGORIA
 * ========================================
 * Define todos los endpoints relacionados con categorías
 * 
 * Base URL: /api/categorias
 */

import { Router } from "express"
import { CategoriaController } from "../controllers/CategoriaController.js"
import { validateCategoriaId, validateCreateCategoria, validateUpdateCategoria } from "../validators/categoriaValidator.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";

// Crear router para rutas de categorías
const router = Router()

/**
 * GET /api/categorias
 * Obtener lista de todas las categorías
 * No requiere parámetros
 * 
 * Respuesta exitosa (200):
 * {
 *   "mensaje": "Categorías listadas correctamente",
 *   "data": [...]
 * }
 */
router.get("/", AuthMiddleware, CategoriaController.getCategorias)

/**
 * GET /api/categorias/:id
 * Obtener categoría específica por ID
 * Valida que el ID sea válido
 * 
 * Parámetros: id (número entero positivo)
 */
router.get("/:id", validateCategoriaId, AuthMiddleware, CategoriaController.getCategoriaById)

/**
 * POST /api/categorias
 * Crear nueva categoría
 * Valida que el nombre sea válido
 * 
 * Body requerido:
 * {
 *   "nombre": "Nombre de la categoría"
 * }
 */
router.post("/", validateCreateCategoria, AuthMiddleware, CategoriaController.createCategoria)

/**
 * PUT /api/categorias/:id
 * Actualizar categoría existente
 * Valida ID y datos opcionales
 * 
 * Parámetros: id (número entero positivo)
 * Body (opcional):
 * {
 *   "nombre": "Nuevo nombre"
 * }
 */
router.put("/:id", [...validateCategoriaId, ...validateUpdateCategoria], AuthMiddleware, CategoriaController.updateCategoria)

/**
 * DELETE /api/categorias/:id
 * Eliminar categoría
 * Valida que el ID sea válido
 * 
 * Parámetros: id (número entero positivo)
 */
router.delete("/:id", validateCategoriaId, AuthMiddleware, CategoriaController.deleteCategoria)

export default router;
