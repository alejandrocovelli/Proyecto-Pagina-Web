import { Router } from "express"
import { CategoriaController } from "../controllers/CategoriaController.js"
import { validateCategoriaId, validateCreateCategoria, validateUpdateCategoria } from "../validators/categoriaValidator.js";

const router = Router()

// Obtener todas las categorías
router.get("/", CategoriaController.getCategorias)

// Obtener una categoría por ID
router.get("/:id", validateCategoriaId, CategoriaController.getCategoriaById)

// Crear una nueva categoría
router.post("/", validateCreateCategoria, CategoriaController.createCategoria)

// Actualizar una categoría
router.put("/:id", [...validateCategoriaId, ...validateUpdateCategoria], CategoriaController.updateCategoria)

// Eliminar una categoría
router.delete("/:id", validateCategoriaId, CategoriaController.deleteCategoria)

export default router;
