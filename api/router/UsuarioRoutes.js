import { Router } from "express"
import { UsuarioController } from "../controllers/UsuarioController.js"
import { validateCreateUsuario, validateUpdateUsuario, validateUsuarioId } from "../validators/usuarioValidator.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";

// Crear router para rutas de usuario
const router = Router()

router.get("/", UsuarioController.getUsuarios);

router.get("/:id", validateUsuarioId, UsuarioController.getUsuarioById);

router.post("/", validateCreateUsuario, UsuarioController.createUsuario);

router.put("/:id", [...validateUsuarioId, ...validateUpdateUsuario], AuthMiddleware, UsuarioController.updateUsuario);

router.delete("/:id", validateUsuarioId, AuthMiddleware, UsuarioController.deleteUsuario);

export default router;