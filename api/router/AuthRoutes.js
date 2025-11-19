import { Router } from "express";
import { validateLogin } from "../validators/AuthValidator.js";
import { AuthController } from "../controllers/AuthController.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";

// Crear router para rutas de autenticación
const router = Router()

router.post("/login", validateLogin, AuthController.login)

router.get("/me", AuthMiddleware, AuthController.me)

export default router;