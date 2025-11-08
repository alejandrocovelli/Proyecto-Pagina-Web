import { Router } from "express"
import { CategoriaController } from "../controllers/CategoriaController.js"
import { validateCreateCategoria, validateUpdateCategoria } from "../validators/categoriaValidator.js";
import { validateId } from "../validators/idValidator.js";

const router = Router()

// Obtener todas las categorías
router.get("/", CategoriaController.getCategorias)

// Obtener una categoría por ID
router.get("/:id", validateId, CategoriaController.getCategoriaById)

// Crear una nueva categoría
router.post("/", validateCreateCategoria, CategoriaController.createCategoria)

// Actualizar una categoría
router.put("/:id", [...validateId, ...validateUpdateCategoria], CategoriaController.updateCategoria)

// Eliminar una categoría
router.delete("/:id", validateId, CategoriaController.deleteCategoria)

export default router;
