import { Router } from "express"
import { OrdenProductoController } from "../controllers/OrdenProductoController.js"
import { validateCreateOrdenProducto, validateUpdateOrdenProducto } from "../validators/ordenProductoValidator.js";

const router = Router()

// Obtener todos los órdenes-productos
router.get("/", OrdenProductoController.getOrdenesProductos)

// Obtener un orden-producto por ID
router.get("/:id", OrdenProductoController.getOrdenProductoById)

// Crear un nuevo orden-producto
router.post("/", validateCreateOrdenProducto, OrdenProductoController.createOrdenProducto)

// Actualizar un orden-producto
router.put("/:id", [...validateUpdateOrdenProducto], OrdenProductoController.updateOrdenProducto)

// Eliminar un orden-producto
router.delete("/:id", OrdenProductoController.deleteOrdenProducto)

export default router;
