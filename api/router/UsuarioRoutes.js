import { Router } from "express"
import { UsuarioController } from "../controllers/UsuarioController.js"

const router = Router()

router.get("/", UsuarioController.getUsuarios)

export default router;