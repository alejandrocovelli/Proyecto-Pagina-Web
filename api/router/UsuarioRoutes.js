import { Router } from "express"
import { UsuarioController } from "../controllers/UsuarioController.js"
import { validateCreateUsuario, validateUpdateUsuario, validateUsuarioId } from "../validators/usuarioValidator.js";

const router = Router()

router.get("/", UsuarioController.getUsuarios);
router.get("/:id", validateUsuarioId, UsuarioController.getUsuarioById);
router.post("/", validateCreateUsuario, UsuarioController.createUsuario);
router.put("/:id", [...validateUsuarioId, ...validateUpdateUsuario], UsuarioController.updateUsuario);
router.delete("/:id", validateUsuarioId, UsuarioController.deleteUsuario);

export default router;