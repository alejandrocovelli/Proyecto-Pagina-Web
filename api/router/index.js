import { Router } from "express"

// Importar routers específicos
import UsuarioRoutes from "./UsuarioRoutes.js"
import ProductosRoutes from "./ProductosRoutes.js"
import CategoriasRoutes from "./CategoriasRoutes.js"
import DireccionesRoutes from "./DireccionesRoutes.js"
import OrdenesRoutes from "./OrdenesRoutes.js"
import OrdenesProductosRoutes from "./OrdenesProductosRoutes.js"
import AuthRoutes from "./AuthRoutes.js"

// Crear router principal
const router = Router()

router.use("/", AuthRoutes)

router.use("/usuarios", UsuarioRoutes)

router.use("/productos", ProductosRoutes)

router.use("/categorias", CategoriasRoutes)

router.use("/direcciones", DireccionesRoutes)

router.use("/ordenes", OrdenesRoutes)

router.use("/ordenesProductos", OrdenesProductosRoutes)

export default router;