import { Router } from "express"
import { UsuarioController } from "../controllers/UsuarioController.js"
import { validateCreateUsuario, validateUpdateUsuario } from "../validators/usuarioValidator.js";
import { validateId } from "../validators/idValidator.js";

const router = Router()

router.get("/", UsuarioController.getUsuarios);
router.get("/:id", validateId, UsuarioController.getUsuarioById);
router.post("/", validateCreateUsuario, UsuarioController.createUsuario);
router.put("/:id", [...validateId, ...validateUpdateUsuario], UsuarioController.updateUsuario);
router.delete("/:id", validateId, UsuarioController.deleteUsuario);

export default router;