import { Router } from "express"
import { OrdenController } from "../controllers/OrdenController.js"
import { validateCreateOrden, validateOrdenId, validateUpdateOrden, validateUsuarioId } from "../validators/ordenValidator.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";

const router = Router()

router.get("/", AuthMiddleware, OrdenController.getOrdenes)

router.get("/:id", validateOrdenId, AuthMiddleware, OrdenController.getOrdenById)

router.get("/carrito/:idUsuario", validateUsuarioId, AuthMiddleware, OrdenController.getCarrito)

router.post("/", validateCreateOrden, AuthMiddleware, OrdenController.createOrden)

router.put("/:idOrden", [...validateOrdenId, ...validateUpdateOrden], AuthMiddleware, OrdenController.updateOrden)

router.delete("/:id", validateOrdenId, AuthMiddleware, OrdenController.deleteOrden)

export default router;
