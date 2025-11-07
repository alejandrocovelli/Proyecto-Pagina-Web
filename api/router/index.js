import { Router } from "express"
import UsuarioRoutes from "./UsuarioRoutes"

const router = Router()

router.use("/", AuthRoutes)
router.use("/usuarios", UsuarioRoutes)
router.use("/productos", ProductosRoutes)
router.use("/categorias", CategoriasRoutes)
router.use("/direcciones", DireccionesRoutes)
router.use("/ordenes", OrdenesRoutes)
router.use("/ordenesProductos", OrdenesProductosRoutes)