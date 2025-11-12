# 🏗️ Guía Visual de Arquitectura

## 📊 Flujo de una Request HTTP Completo

```
┌─────────────────────────────────────────────────────────────────┐
│  CLIENTE (Frontend/Postman)                                     │
│                                                                 │
│  POST /api/ordenes                                              │
│  Header: Authorization: Bearer <token>                          │
│  Body: {                                                        │
│    idUsuario: 2,                                                │
│    idDireccion: 1,                                              │
│    estado: 1,                                                   │
│    productos: [{idProducto: 1, cantidad: 2}]                   │
│  }                                                              │
└────────────────────────┬──────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  ROUTER (router/OrdenesRoutes.js)                               │
│                                                                 │
│  router.post("/", validateCreateOrden, OrdenController.create)  │
│                      ▲                         ▲                 │
│                      │ valida                  │                 │
│                      │ entrada                 │ llama           │
└──────────────────────┼──────────────────────────┼────────────────┘
                       │                          │
                       ▼                          ▼
┌─────────────────────────────────────────────────────────────────┐
│  VALIDATORS (validators/ordenValidator.js)                      │
│                                                                 │
│  validateCreateOrden:                                           │
│  ├─ body('estado').isInt({min:1, max:4})                       │
│  ├─ body('productos').isArray().notEmpty()                     │
│  ├─ body('productos.*.idProducto').isInt()                     │
│  └─ body('productos.*.cantidad').isInt({min:1})                │
│                                                                 │
│  ✅ Si válido: continúa                                         │
│  ❌ Si inválido: retorna 400 con errores                        │
└────────────────────────┬──────────────────────────────────────┘
                         │ ✅ Validación OK
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  CONTROLLER (controllers/OrdenController.js)                     │
│                                                                 │
│  static async createOrden(req, res) {                          │
│    try {                                                        │
│      const result = await ordenService.createOrden(req.body)    │
│      res.status(201).json({resultado: "éxito", data: result})   │
│    } catch (error) {                                            │
│      res.status(500).json({error: error.message})               │
│    }                                                            │
│  }                                                              │
└────────────────────────┬──────────────────────────────────────┘
                         │ llama
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  SERVICE (services/OrdenService.js)                             │
│                                                                 │
│  async createOrden(ordenData) {                                 │
│    try {                                                        │
│      const data = await this.ordenRepository.createOrden(...)   │
│      return {success: true, data}                               │
│    } catch (error) {                                            │
│      return {success: false, message: error.message}            │
│    }                                                            │
│  }                                                              │
└────────────────────────┬──────────────────────────────────────┘
                         │ delega
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  REPOSITORY (repositories/OrdenRepository.js)                   │
│  ⭐ LÓGICA DE NEGOCIO CRÍTICA                                   │
│                                                                 │
│  async createOrden(ordenData) {                                 │
│    return await sequelize.transaction(async (t) => {           │
│      ┌─ Validación 1: ¿Usuario existe?                         │
│      ├─ Validación 2: ¿Dirección existe?                       │
│      ├─ Validación 3: ¿Usuario NO es admin?                    │
│      ├─ PARA CADA PRODUCTO:                                    │
│      │  └─ Calcula: cantidad × precio → valorTotal             │
│      │                                                          │
│      ├─ Calcula totalCompra                                    │
│      │                                                          │
│      ├─ ¿DESCUENTO MAYORISTA?                                  │
│      │  SI: usuario.tipo == 3 AND total >= 140,000             │
│      │      APLICA precioMayorista                              │
│      │  NO: usa precios normales                                │
│      │                                                          │
│      ├─ Crea: INSERT INTO Orden                                │
│      ├─ Crea: INSERT INTO OrdenProducto (para cada producto)   │
│      └─ Retorna: {orden, productos}                            │
│    })                                                           │
│  }                                                              │
└────────────────────────┬──────────────────────────────────────┘
                         │ accede
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  MODELS (models/Orden.js, OrdenProducto.js)                     │
│                                                                 │
│  Definen estructura de datos (tablas)                           │
│  Sequelize mapea automáticamente a SQL                          │
└────────────────────────┬──────────────────────────────────────┘
                         │ query
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  DATABASE (MySQL)                                               │
│                                                                 │
│  INSERT INTO Orden (estado, totalPago, idUsuario, idDireccion)  │
│  VALUES (1, 4000000, 5, 2)                                      │
│                                                                 │
│  INSERT INTO OrdenProducto (...)                                │
│  VALUES (100, 40000, 4000000, 43, 1)                            │
└────────────────────────┬──────────────────────────────────────┘
                         │
                         ▼
          ✅ Éxito - Datos guardados
                         │
                         ▼ retorna
┌─────────────────────────────────────────────────────────────────┐
│  RESPONSE (al cliente)                                          │
│                                                                 │
│  201 Created                                                    │
│  {                                                              │
│    "resultado": "éxito",                                        │
│    "data": {                                                    │
│      "orden": {                                                 │
│        "idOrden": 43,                                           │
│        "estado": 1,                                             │
│        "totalPago": 4000000,  ← CON DESCUENTO APLICADO         │
│        "idUsuario": 5,                                          │
│        "idDireccion": 2                                         │
│      },                                                         │
│      "productos": [...]                                         │
│    }                                                            │
│  }                                                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Estructura de Directorios

```
api/
│
├── 🔧 Configuración
│   ├── app.js                    ← Entry point, Express setup
│   └── config/
│       ├── database.js           ← Sequelize config
│       └── cloudinary.js         ← Cloudinary config
│
├── 📦 Capa de Modelos (ORM)
│   └── models/
│       ├── Usuario.js
│       ├── Producto.js
│       ├── Categoria.js
│       ├── Direccion.js
│       ├── Orden.js
│       ├── OrdenProducto.js
│       └── associations.js       ← Relaciones entre modelos
│
├── 🗄️ Capa de Datos (Repository)
│   └── repositories/
│       ├── UsuarioRepository.js
│       ├── ProductoRepository.js
│       ├── CategoriaRepository.js
│       ├── DireccionRepository.js
│       ├── OrdenRepository.js    ← ⭐ Lógica de descuentos
│       └── OrdenProductoRepository.js
│
├── 💼 Capa de Lógica (Service)
│   └── services/
│       ├── UsuarioService.js
│       ├── ProductoService.js    ← Upload a Cloudinary
│       ├── CategoriaService.js
│       ├── DireccionService.js
│       ├── OrdenService.js
│       ├── OrdenProductoService.js
│       └── AuthService.js        ← JWT generation
│
├── 🎮 Capa HTTP (Controller)
│   └── controllers/
│       ├── UsuarioController.js
│       ├── ProductoController.js
│       ├── CategoriaController.js
│       ├── DireccionController.js
│       ├── OrdenController.js
│       ├── OrdenProductoController.js
│       └── AuthController.js
│
├── ⚔️ Validación (Input)
│   └── validators/
│       ├── validatorUtils.js
│       ├── AuthValidator.js
│       ├── usuarioValidator.js
│       ├── productoValidator.js
│       ├── categoriaValidator.js
│       ├── direccionValidator.js
│       ├── ordenValidator.js
│       └── ordenProductoValidator.js
│
├── 🔐 Middleware
│   └── middlewares/
│       └── AuthMiddleware.js     ← JWT verification
│
├── 🛣️ Rutas (Endpoints)
│   └── router/
│       ├── index.js              ← Agregador principal
│       ├── AuthRoutes.js
│       ├── UsuarioRoutes.js
│       ├── ProductosRoutes.js    ← Con Multer
│       ├── CategoriasRoutes.js
│       ├── DireccionesRoutes.js
│       ├── OrdenesRoutes.js
│       └── OrdenesProductosRoutes.js
│
├── 📁 Otros
│   ├── package.json              ← Dependencias
│   ├── alejandroPaginaWeb.sql    ← Script BD
│   └── uploads/                  ← Archivos temporales
│
└── 📚 Documentación (en raíz del proyecto)
    ├── DOCUMENTACION_API.md      ← Guía completa
    ├── RESUMEN_COMENTARIOS.md    ← Archivos comentados
    └── EJEMPLOS_REQUESTS.md      ← Ejemplos de testing
```

---

## 🔄 Ciclo de Vida de Datos

```
USUARIO TIPO 3 (MAYORISTA)

┌─────────────────────────────┐
│ Crea orden con 100 camisetas│
│ Precio normal: $50,000 c/u  │
│ Total: $5,000,000           │
└──────────────┬──────────────┘
               │
               ▼
        ¿Total >= $140,000?
        ¿Usuario mayorista?
               │
        ┌──────┴──────┐
        │             │
       SÍ             NO
        │             │
        ▼             ▼
    DESCUENTO     SIN DESCUENTO
   Aplica precio  Usa precio
   mayorista      normal
   $40,000 c/u    $50,000 c/u
        │             │
    Total:        Total:
   $4,000,000     $5,000,000
        │             │
        └──────┬──────┘
               ▼
        Se almacena en
        Orden (totalPago)
        OrdenProducto (precioUnidad)
               │
               ▼
        Histórico preservado
        Incluso si precios cambian
```

---

## 🔐 Flujo de Autenticación

```
┌──────────────────────────────────────────┐
│ CLIENTE: POST /auth/login                │
│ {correo, contraseña}                     │
└────────────────┬─────────────────────────┘
                 │
                 ▼
    ┌───────────────────────────┐
    │ AuthService.login()       │
    │ 1. Busca usuario por email│
    │ 2. bcrypt.compare()       │
    │ 3. Genera JWT             │
    └────────────┬──────────────┘
                 │
           ┌─────┴─────┐
           │           │
        ✅OK         ❌Error
           │           │
           ▼           ▼
    Token+User    Error 401
           │
           ▼
    ┌──────────────────────────┐
    │ CLIENTE GUARDA TOKEN     │
    │ localStorage.token       │
    └────────────┬─────────────┘
                 │
    ┌────────────┴──────────────────┐
    │ Para próximas requests:        │
    │ Header: Authorization: Bearer  │
    │         <token>                │
    └────────────┬──────────────────┘
                 │
                 ▼
    ┌────────────────────────────────┐
    │ AuthMiddleware.js              │
    │ 1. Extrae token del header     │
    │ 2. jwt.verify() con JWT_SECRET │
    │ 3. Decodifica payload          │
    │ 4. Asigna req.user             │
    └────────────┬──────────────────┘
                 │
           ┌─────┴──────┐
           │            │
        ✅OK         ❌Error
           │            │
    Continúa   401/403 Error
    request
```

---

## 📦 Patrón Repository

Cada repositorio implementa este patrón:

```javascript
class [Entidad]Repository {
    // Todas las operaciones usan TRANSACCIONES
    // Garantizan ACID compliance
    
    async getAll() {
        return await sequelize.transaction(async (transaction) => {
            // 1. Buscar datos
            const data = await Model.findAll({...}, {transaction})
            
            // 2. Validar
            if(!data) throw new Error("No encontrado")
            
            // 3. Retornar
            return data
        })
    }
    
    async create(data) {
        return await sequelize.transaction(async (transaction) => {
            // 1. Validaciones
            // 2. Crear
            // 3. Retornar
        })
    }
}
```

### Ventajas:
- ✅ Una única forma de acceder a datos
- ✅ Lógica de BD centralizada
- ✅ Fácil de testear
- ✅ Cambiar BD no afecta servicios/controladores
- ✅ Transacciones automáticas

---

## 🎯 Descuentos Mayoristas - Árbol de Decisión

```
REQUEST: Crear Orden

        ┌─────────────────────────┐
        │ ¿Usuario existe?        │
        └──────────┬──────────────┘
                   │
             ┌─────┴─────┐
          ❌NO        ✅YES
             │            │
           Error          ▼
                   ┌──────────────────┐
                   │ ¿Dirección existe?
                   └──────┬───────────┘
                          │
                    ┌─────┴─────┐
                 ❌NO        ✅YES
                    │            │
                  Error          ▼
                        ┌───────────────────┐
                        │¿Usuario NO admin? │
                        └──────┬────────────┘
                               │
                        ┌──────┴──────┐
                     ❌NO         ✅YES
                        │            │
                      Error          ▼
                            ┌─────────────────┐
                            │ Calcula total   │
                            │ con precios     │
                            │ normales        │
                            └────────┬────────┘
                                     │
                                     ▼
                            ┌────────────────────┐
                            │¿total >= $140,000?│
                            │¿Usuario tipo 3?   │
                            └────────┬───────────┘
                                     │
                            ┌────────┴────────┐
                         ❌NO             ✅YES
                            │                 │
                     Usa precios          APLICA
                     normales             DESCUENTO
                            │                 │
                            │         Recalcula
                            │         con
                            │         precioMayorista
                            │                 │
                            └────────┬────────┘
                                     │
                                     ▼
                            ┌──────────────────┐
                            │ Crea Orden       │
                            │ con totalPago    │
                            └────────┬─────────┘
                                     │
                                     ▼
                            ┌──────────────────┐
                            │ Crea             │
                            │ OrdenProducto(s) │
                            │ con precios      │
                            │ del momento      │
                            └────────┬─────────┘
                                     │
                                     ▼
                                ✅ ÉXITO
```

---

## 🚀 Escalabilidad Futura

Con esta arquitectura es fácil:

- ✅ **Agregar nuevas entidades** - Copiar patrón Repository
- ✅ **Cambiar BD** - Solo modificar Repository
- ✅ **Agregar validaciones** - Nueva carpeta validators
- ✅ **Agregar autenticación** - Mejorar AuthMiddleware
- ✅ **Agregar logging** - Middleware adicional
- ✅ **Testing** - Mockear cada capa
- ✅ **Microservicios** - Extraer servicios a APIs separadas

---

## 💾 Tipos de Datos Importantes

| Campo | Tipo | Ejemplo | Notas |
|-------|------|---------|-------|
| **Precios** | INTEGER | 250050 | $2,500.50 = 250050 (centavos) |
| **Contraseña** | VARCHAR(255) | $2b$10$... | Hashed con bcrypt |
| **Foto** | VARCHAR(255) | https://res.cloudinary.com/... | URL pública |
| **JWT** | STRING | eyJhbGci... | Token de 1 hora |
| **Estado Orden** | INTEGER | 1,2,3,4 | 1=Pend, 2=Proc, 3=Canc, 4=Acep |
| **Tipo Usuario** | INTEGER | 1,2,3 | 1=Admin, 2=Cliente, 3=Mayorista |

---

## ✨ Conclusión

Esta arquitectura proporciona:
- 🏗️ **Estructura clara** - Cada capa con responsabilidad única
- 🔒 **Seguridad** - bcrypt, JWT, validación
- 📊 **Escalabilidad** - Fácil agregar features
- 🧪 **Testabilidad** - Capas desacopladas
- 📚 **Mantenibilidad** - Código bien comentado
- 💪 **Robustez** - Transacciones, validación, error handling
