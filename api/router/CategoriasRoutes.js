import { Router } from "express"
import { CategoriaController } from "../controllers/CategoriaController.js"
import { validateCategoriaId, validateCreateCategoria, validateUpdateCategoria } from "../validators/categoriaValidator.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";

// Crear router para rutas de categorías
const router = Router()

router.get("/", AuthMiddleware, CategoriaController.getCategorias)

router.get("/:id", validateCategoriaId, AuthMiddleware, CategoriaController.getCategoriaById)

router.post("/", validateCreateCategoria, AuthMiddleware, CategoriaController.createCategoria)

router.put("/:id", [...validateCategoriaId, ...validateUpdateCategoria], AuthMiddleware, CategoriaController.updateCategoria)

router.delete("/:id", validateCategoriaId, AuthMiddleware, CategoriaController.deleteCategoria)

export default router;
