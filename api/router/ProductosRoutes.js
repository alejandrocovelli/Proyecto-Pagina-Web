import { Router } from "express"
import { ProductoController } from "../controllers/ProductoController.js"
import { validateCreateProducto, validateGetProduct, validateProductoId, validateUpdateProducto } from "../validators/productoValidator.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = Router()

// Obtener todos los productos
router.get("/", validateGetProduct, ProductoController.getProductos)

// Obtener un producto por ID
router.get("/:id", validateProductoId, ProductoController.getProductoById)

// Crear un nuevo producto
router.post("/", upload.single("imagen"), validateCreateProducto, ProductoController.createProducto)

// Actualizar un producto
router.put("/:id", [...validateProductoId, ...validateUpdateProducto], ProductoController.updateProducto)

// Eliminar un producto
router.delete("/:id", validateProductoId, ProductoController.deleteProducto)

export default router;
