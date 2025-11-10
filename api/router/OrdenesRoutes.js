import { Router } from "express"
import { OrdenController } from "../controllers/OrdenController.js"
import { validateCreateOrden, validateOrdenId, validateUpdateOrden } from "../validators/ordenValidator.js";

const router = Router()

// Obtener todas las órdenes
router.get("/", OrdenController.getOrdenes)

// Obtener una orden por ID
router.get("/:id", validateOrdenId, OrdenController.getOrdenById)

// Crear una nueva orden
router.post("/", validateCreateOrden, OrdenController.createOrden)

// Actualizar una orden
router.put("/:id", [...validateOrdenId, ...validateUpdateOrden], OrdenController.updateOrden)

// Eliminar una orden
router.delete("/:id", validateOrdenId, OrdenController.deleteOrden)

export default router;
