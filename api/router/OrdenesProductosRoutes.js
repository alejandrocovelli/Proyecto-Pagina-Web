import { Router } from "express"
import { OrdenProductoController } from "../controllers/OrdenProductoController.js"

const router = Router()

// Obtener todos los órdenes-productos
router.get("/", OrdenProductoController.getOrdenesProductos)

// Obtener un orden-producto por ID
router.get("/:id", OrdenProductoController.getOrdenProductoById)

// Crear un nuevo orden-producto
router.post("/", OrdenProductoController.createOrdenProducto)

// Actualizar un orden-producto
router.put("/:id", OrdenProductoController.updateOrdenProducto)

// Eliminar un orden-producto
router.delete("/:id", OrdenProductoController.deleteOrdenProducto)

export default router;
