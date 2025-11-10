import { Router } from "express"
import { DireccionController } from "../controllers/DireccionController.js"
import { validateCreateDireccion, validateDireccionId, validateUpdateDireccion } from "../validators/direccionValidator.js";

const router = Router()

// Obtener todas las direcciones
router.get("/", DireccionController.getDirecciones)

// Obtener una dirección por ID
router.get("/:id", validateDireccionId, DireccionController.getDireccionById)

// Crear una nueva dirección
router.post("/", validateCreateDireccion, DireccionController.createDireccion)

// Actualizar una dirección
router.put("/:id", [...validateDireccionId, ...validateUpdateDireccion], DireccionController.updateDireccion)

// Eliminar una dirección
router.delete("/:id", validateDireccionId, DireccionController.deleteDireccion)

export default router;
