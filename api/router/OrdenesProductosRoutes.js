import { Router } from "express"
import { OrdenProductoController } from "../controllers/OrdenProductoController.js"
import { validateCreateOrdenProducto, validateUpdateOrdenProducto } from "../validators/ordenProductoValidator.js";
import { validateId } from "../validators/idValidator.js";

const router = Router()

// Obtener todos los órdenes-productos
router.get("/", OrdenProductoController.getOrdenesProductos)

// Obtener un orden-producto por ID
router.get("/:id", validateId, OrdenProductoController.getOrdenProductoById)

// Crear un nuevo orden-producto
router.post("/", validateCreateOrdenProducto, OrdenProductoController.createOrdenProducto)

// Actualizar un orden-producto
router.put("/:id", [...validateId, ...validateUpdateOrdenProducto], OrdenProductoController.updateOrdenProducto)

// Eliminar un orden-producto
router.delete("/:id", validateId, OrdenProductoController.deleteOrdenProducto)

export default router;
