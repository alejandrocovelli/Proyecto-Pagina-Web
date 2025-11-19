import { Router } from "express"
import { DireccionController } from "../controllers/DireccionController.js"
import { validateCreateDireccion, validateDireccionId, validateUpdateDireccion } from "../validators/direccionValidator.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";

const router = Router()

router.get("/", AuthMiddleware, DireccionController.getDirecciones)

router.get("/:id", validateDireccionId, AuthMiddleware, DireccionController.getDireccionById)

router.post("/", validateCreateDireccion, AuthMiddleware, DireccionController.createDireccion)

router.put("/:id", [...validateDireccionId, ...validateUpdateDireccion], AuthMiddleware, DireccionController.updateDireccion)

router.delete("/:id", validateDireccionId, AuthMiddleware, DireccionController.deleteDireccion)

export default router;
