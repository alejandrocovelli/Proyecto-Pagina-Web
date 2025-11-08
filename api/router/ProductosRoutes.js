import { Router } from "express"
import { ProductoController } from "../controllers/ProductoController.js"
import { validateCreateProducto, validateUpdateProducto } from "../validators/productoValidator.js";
import { validateId } from "../validators/idValidator.js";

const router = Router()

// Obtener todos los productos
router.get("/", ProductoController.getProductos)

// Obtener un producto por ID
router.get("/:id", validateId, ProductoController.getProductoById)

// Crear un nuevo producto
router.post("/", validateCreateProducto, ProductoController.createProducto)

// Actualizar un producto
router.put("/:id", [...validateId, ...validateUpdateProducto], ProductoController.updateProducto)

// Eliminar un producto
router.delete("/:id", validateId, ProductoController.deleteProducto)

export default router;
