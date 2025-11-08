import { Router } from "express"
import { DireccionController } from "../controllers/DireccionController.js"
import { validateCreateDireccion, validateUpdateDireccion } from "../validators/direccionValidator.js";
import { validateId } from "../validators/idValidator.js";

const router = Router()

// Obtener todas las direcciones
router.get("/", DireccionController.getDirecciones)

// Obtener una dirección por ID
router.get("/:id", validateId, DireccionController.getDireccionById)

// Crear una nueva dirección
router.post("/", validateCreateDireccion, DireccionController.createDireccion)

// Actualizar una dirección
router.put("/:id", [...validateId, ...validateUpdateDireccion], DireccionController.updateDireccion)

// Eliminar una dirección
router.delete("/:id", validateId, DireccionController.deleteDireccion)

export default router;
