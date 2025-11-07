import { Router } from "express"
import { ProductoController } from "../controllers/ProductoController"

const router = Router()

router.get("/", ProductoController.getProductos)

export default router;
