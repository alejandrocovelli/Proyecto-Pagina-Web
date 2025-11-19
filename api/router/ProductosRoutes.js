/**
 * ========================================
 * RUTAS: PRODUCTO
 * ========================================
 * Define todos los endpoints relacionados con productos
 * Gestiona operaciones CRUD de productos
 * Maneja subida de imágenes con multer
 * 
 * Base URL: /api/productos
 */

import { Router } from "express"
import { ProductoController } from "../controllers/ProductoController.js"
import { validateCreateProducto, validateGetProduct, validateProductoId, validateUpdateProducto } from "../validators/productoValidator.js";
import multer from "multer";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";

// Configurar multer para subida de archivos temporales
// dest: "uploads/" - directorio donde se guardan temporalmente
const upload = multer({ dest: "uploads/" });

// Crear router para rutas de productos
const router = Router()

/**
 * GET /api/productos
 * Obtener todos los productos de una categoría
 * Valida que idCategoria sea un número entero
 * 
 * Body:
 * {
 *   "idCategoria": 1
 * }
 */
router.get("/", validateGetProduct, AuthMiddleware, ProductoController.getProductos)

/**
 * GET /api/productos/:id
 * Obtener producto específico por ID
 * Valida que el ID sea un número válido
 * 
 * Parámetros: id (número entero positivo)
 */
router.get("/:idProducto", validateProductoId, AuthMiddleware, ProductoController.getProductoById)

/**
 * POST /api/productos
 * Crear nuevo producto
 * Acepta imagen que se sube a Cloudinary
 * 
 * FormData:
 * - imagen: File (archivo de imagen, opcional)
 * - nombre: String
 * - precio: Number
 * - precioMayorista: Number
 * - idCategoria: Number
 * 
 * Nota: upload.single("imagen") parsea el archivo con clave "imagen"
 */
router.post("/", upload.single("foto"), validateCreateProducto, AuthMiddleware, ProductoController.createProducto)

/**
 * PUT /api/productos/:id
 * Actualizar producto existente
 * Valida ID y datos opcionales
 * 
 * Parámetros: id (número entero positivo)
 * Body (todos campos opcionales):
 * {
 *   "nombre": "Nuevo nombre",
 *   "precio": 60000,
 *   "precioMayorista": 50000,
 *   "foto": "https://..."
 * }
 */
router.put("/:id", [...validateProductoId, ...validateUpdateProducto], AuthMiddleware, ProductoController.updateProducto)

/**
 * DELETE /api/productos/:id
 * Eliminar producto
 * Valida que el ID sea válido
 * 
 * Parámetros: id (número entero positivo)
 */
router.delete("/:id", validateProductoId, AuthMiddleware, ProductoController.deleteProducto)

export default router;
