import { Router } from "express";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { validateLogin } from "../validators/AuthValidator";

const router = Router()

router.post("/login", validateLogin, AuthController.login )