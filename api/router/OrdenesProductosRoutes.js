import { Router } from "express"
import { OrdenProductoController } from "../controllers/OrdenProductoController.js"
import { validateCreateOrdenProducto, validateUpdateOrdenProducto } from "../validators/ordenProductoValidator.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";

const router = Router()

router.get("/", AuthMiddleware, OrdenProductoController.getOrdenesProductos)

router.get("/:id", AuthMiddleware, OrdenProductoController.getOrdenProductoById)

router.post("/", validateCreateOrdenProducto, AuthMiddleware, OrdenProductoController.createOrdenProducto)

router.put("/:id", [...validateUpdateOrdenProducto], AuthMiddleware, OrdenProductoController.updateOrdenProducto)

router.delete("/:id", AuthMiddleware, OrdenProductoController.deleteOrdenProducto)

export default router;
