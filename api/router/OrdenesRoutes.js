import { Router } from "express"
import { OrdenController } from "../controllers/OrdenController.js"

const router = Router()

// Obtener todas las órdenes
router.get("/", OrdenController.getOrdenes)

// Obtener una orden por ID
router.get("/:id", OrdenController.getOrdenById)

// Crear una nueva orden
router.post("/", OrdenController.createOrden)

// Actualizar una orden
router.put("/:id", OrdenController.updateOrden)

// Eliminar una orden
router.delete("/:id", OrdenController.deleteOrden)

export default router;
