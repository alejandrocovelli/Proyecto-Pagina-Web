import { Router } from "express"
import { OrdenProductoController } from "../controllers/OrdenProductoController"

const router = Router()

router.get("/", OrdenProductoController.getOrdenesProductos)

export default router;
