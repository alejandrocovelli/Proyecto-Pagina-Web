import { Router } from "express"
import { ProductoController } from "../controllers/ProductoController.js"

const router = Router()

// Obtener todos los productos
router.get("/", ProductoController.getProductos)

// Obtener un producto por ID
router.get("/:id", ProductoController.getProductoById)

// Crear un nuevo producto
router.post("/", ProductoController.createProducto)

// Actualizar un producto
router.put("/:id", ProductoController.updateProducto)

// Eliminar un producto
router.delete("/:id", ProductoController.deleteProducto)

export default router;
