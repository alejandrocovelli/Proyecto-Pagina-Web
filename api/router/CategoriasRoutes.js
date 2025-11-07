import { Router } from "express"
import { CategoriaController } from "../controllers/CategoriaController.js"

const router = Router()

// Obtener todas las categorías
router.get("/", CategoriaController.getCategorias)

// Obtener una categoría por ID
router.get("/:id", CategoriaController.getCategoriaById)

// Crear una nueva categoría
router.post("/", CategoriaController.createCategoria)

// Actualizar una categoría
router.put("/:id", CategoriaController.updateCategoria)

// Eliminar una categoría
router.delete("/:id", CategoriaController.deleteCategoria)

export default router;
