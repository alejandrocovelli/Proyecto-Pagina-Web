import { Router } from "express"
import { DireccionController } from "../controllers/DireccionController.js"

const router = Router()

// Obtener todas las direcciones
router.get("/", DireccionController.getDirecciones)

// Obtener una dirección por ID
router.get("/:id", DireccionController.getDireccionById)

// Crear una nueva dirección
router.post("/", DireccionController.createDireccion)

// Actualizar una dirección
router.put("/:id", DireccionController.updateDireccion)

// Eliminar una dirección
router.delete("/:id", DireccionController.deleteDireccion)

export default router;
