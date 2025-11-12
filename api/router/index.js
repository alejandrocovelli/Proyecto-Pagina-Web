/**
 * ========================================
 * ROUTER PRINCIPAL
 * ========================================
 * Archivo central que agrupa todas las rutas de la API
 * Importa y registra routers específicos para cada recurso
 * 
 * Estructura de rutas:
 * /api/auth/*              - Autenticación
 * /api/usuarios/*          - Gestión de usuarios
 * /api/productos/*         - Gestión de productos
 * /api/categorias/*        - Gestión de categorías
 * /api/direcciones/*       - Gestión de direcciones
 * /api/ordenes/*           - Gestión de órdenes
 * /api/ordenesProductos/*  - Gestión de líneas de órdenes
 */

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

// ========== REGISTRAR ROUTERS ==========

/**
 * Rutas de autenticación
 * Endpoints: POST /api/auth/login, GET /api/auth/me
 */
router.use("/", AuthRoutes)

/**
 * Rutas de usuarios
 * Endpoints: GET/POST /api/usuarios, GET/PUT/DELETE /api/usuarios/:id
 */
router.use("/usuarios", UsuarioRoutes)

/**
 * Rutas de productos
 * Endpoints: GET/POST /api/productos, GET/PUT/DELETE /api/productos/:id
 */
router.use("/productos", ProductosRoutes)

/**
 * Rutas de categorías
 * Endpoints: GET/POST /api/categorias, GET/PUT/DELETE /api/categorias/:id
 */
router.use("/categorias", CategoriasRoutes)

/**
 * Rutas de direcciones
 * Endpoints: GET/POST /api/direcciones, GET/PUT/DELETE /api/direcciones/:id
 */
router.use("/direcciones", DireccionesRoutes)

/**
 * Rutas de órdenes
 * Endpoints: GET/POST /api/ordenes, GET/PUT/DELETE /api/ordenes/:id
 */
router.use("/ordenes", OrdenesRoutes)

/**
 * Rutas de líneas de órdenes
 * Endpoints: GET/POST /api/ordenesProductos, GET/PUT/DELETE /api/ordenesProductos/:id
 */
router.use("/ordenesProductos", OrdenesProductosRoutes)

export default router;