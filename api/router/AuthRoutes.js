import { Router } from "express";
import { validateLogin } from "../validators/AuthValidator.js";
import { AuthController } from "../controllers/AuthController.js";

const router = Router()

router.post("/login", validateLogin, AuthController.login)

export default router;