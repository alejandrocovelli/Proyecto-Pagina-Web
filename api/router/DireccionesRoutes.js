import { Router } from "express"
import { DireccionController } from "../controllers/DireccionController"

const router = Router()

router.get("/", DireccionController.getDirecciones)

export default router;
