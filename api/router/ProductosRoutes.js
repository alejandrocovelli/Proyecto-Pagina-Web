import { Router } from "express"
import { ProductoController } from "../controllers/ProductoController.js"
import { validateCreateProducto, validateGetProduct, validateProductoId, validateUpdateProducto } from "../validators/productoValidator.js";
import multer from "multer";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";

// Configurar multer para subida de archivos temporales
// dest: "uploads/" - directorio donde se guardan temporalmente
const upload = multer({ dest: "uploads/" });

// Crear router para rutas de productos
const router = Router()

router.get("/", validateGetProduct, AuthMiddleware, ProductoController.getProductos)

router.get("/:idProducto", validateProductoId, AuthMiddleware, ProductoController.getProductoById)

router.post("/", upload.single("foto"), validateCreateProducto, AuthMiddleware, ProductoController.createProducto)

router.put("/:id", [...validateProductoId, ...validateUpdateProducto], AuthMiddleware, ProductoController.updateProducto)

router.delete("/:id", validateProductoId, AuthMiddleware, ProductoController.deleteProducto)

export default router;
