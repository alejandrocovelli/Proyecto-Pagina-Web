import { Router } from "express"
import { UsuarioController } from "../controllers/UsuarioController"

const router = Router()

router.get("/", UsuarioController.getUsuarios)

export default router;