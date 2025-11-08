import { Router } from "express"
import { OrdenController } from "../controllers/OrdenController.js"
import { validateCreateOrden, validateUpdateOrden } from "../validators/ordenValidator.js";
import { validateId } from "../validators/idValidator.js";

const router = Router()

// Obtener todas las órdenes
router.get("/", OrdenController.getOrdenes)

// Obtener una orden por ID
router.get("/:id", validateId, OrdenController.getOrdenById)

// Crear una nueva orden
router.post("/", validateCreateOrden, OrdenController.createOrden)

// Actualizar una orden
router.put("/:id", [...validateId, ...validateUpdateOrden], OrdenController.updateOrden)

// Eliminar una orden
router.delete("/:id", validateId, OrdenController.deleteOrden)

export default router;
