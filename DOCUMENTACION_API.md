# 📚 Documentación Completa de la API - Proyecto Página Web

## 📋 Índice de Contenidos
1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Arquitectura General](#arquitectura-general)
3. [Stack Tecnológico](#stack-tecnológico)
4. [Estructura de Capas](#estructura-de-capas)
5. [Modelos de Datos](#modelos-de-datos)
6. [Endpoints de la API](#endpoints-de-la-api)
7. [Flujo de Lógica de Negocio](#flujo-de-lógica-de-negocio)
8. [Autenticación y Seguridad](#autenticación-y-seguridad)
9. [Guía de Errores](#guía-de-errores)

---

## 🎯 Resumen Ejecutivo

Esta es una **REST API construida con Express.js** que maneja:
- 👥 Gestión de usuarios (clientes, mayoristas, administradores)
- 📦 Catálogo de productos con categorías
- 🏠 Gestión de direcciones de entrega
- 📋 Sistema completo de órdenes con cálculo de precios
- 💰 Descuentos mayoristas automáticos
- 🔐 Autenticación con JWT
- 📸 Upload de imágenes a Cloudinary

**Tipos de Usuarios:**
- **Tipo 1:** Administrador (no puede comprar)
- **Tipo 2:** Cliente Regular (precio minorista)
- **Tipo 3:** Cliente Mayorista (descuento si compra >= $140,000)

---

## 🏗️ Arquitectura General

### Patrón Arquitectónico: Layered Architecture + Repository Pattern

```
┌─────────────────────────────────────┐
│         CAPA HTTP (Express)          │  API Endpoints
├─────────────────────────────────────┤
│     CAPA CONTROLADORES (HTTP)        │  Request/Response
├─────────────────────────────────────┤
│    CAPA VALIDADORES (Input)          │  Validación de datos
├─────────────────────────────────────┤
│    CAPA SERVICIOS (Lógica)           │  Reglas de negocio
├─────────────────────────────────────┤
│   CAPA REPOSITORIO (Datos)           │  Acceso a DB
├─────────────────────────────────────┤
│      CAPA MODELOS (ORM)              │  Entidades Sequelize
├─────────────────────────────────────┤
│   BASE DE DATOS MySQL                │  Persistencia
└─────────────────────────────────────┘
```

**Ventajas de esta arquitectura:**
- ✅ Separación de responsabilidades clara
- ✅ Fácil de testear (cada capa independiente)
- ✅ Código reutilizable y mantenible
- ✅ Escalable y flexible

---

## 🛠️ Stack Tecnológico

| Componente | Tecnología | Versión |
|-----------|-----------|---------|
| **Runtime** | Node.js | - |
| **Framework Web** | Express.js | 5.1.0 |
| **ORM** | Sequelize | 6.37.7 |
| **Database** | MySQL | - |
| **Driver DB** | mysql2 | 3.15.3 |
| **Autenticación** | JWT (jsonwebtoken) | 9.0.2 |
| **Hashing Seguro** | bcrypt | 6.0.0 |
| **Cloud Storage** | Cloudinary | 2.8.0 |
| **Upload Archivos** | Multer | 2.0.2 |
| **CORS** | cors | 2.8.5 |
| **HTTP Logging** | morgan | 1.10.1 |
| **Validación** | express-validator | 7.3.0 |
| **Env Variables** | dotenv | 17.2.3 |

---

## 📦 Estructura de Capas

### 1. CAPA CONFIGURACIÓN (`/config`)

#### **database.js**
- Inicializa conexión Sequelize
- Configura parámetros MySQL desde variables de entorno
- Exporta instancia `sequelize` para usar en toda la aplicación

#### **cloudinary.js**
- Inicializa SDK de Cloudinary
- Configura credenciales para upload de imágenes
- Permite guardar fotos de productos en la nube

---

### 2. CAPA MODELOS (`/models`)

Define la estructura de datos usando Sequelize ORM

| Modelo | Propósito | Campos Principales |
|--------|-----------|------------------|
| **Usuario** | Usuarios del sistema | idUsuario, nombre, correo, contraseña, tipo (1-3) |
| **Producto** | Catálogo de productos | idProducto, nombre, precio, precioMayorista, foto, idCategoria |
| **Categoria** | Categorías de productos | idCategoria, nombre |
| **Direccion** | Direcciones de entrega | idDireccion, direccion, ciudad, barrio, idUsuario |
| **Orden** | Pedidos de clientes | idOrden, estado, totalPago, idUsuario, idDireccion |
| **OrdenProducto** | Productos en cada orden | idOrdenProducto, cantidad, precioUnidad, valorTotal, idOrden, idProducto |

#### **associations.js**
Define las relaciones entre modelos:
```
Usuario ──────────┐
                   ├── hasMany ──── Direccion
                   └── hasMany ──── Orden

Categoria ──────────────── hasMany ──── Producto

Direccion ──────────────── hasMany ──── Orden

Orden ──────────────┐
                     └── hasMany ──── OrdenProducto ──── belongsTo ──── Producto
```

---

### 3. CAPA REPOSITORIO (`/repositories`)

Abstracción de acceso a datos. **Cada repositorio maneja:**
- ✅ Queries a la base de datos
- ✅ Manejo de transacciones
- ✅ Búsquedas con includes/joins
- ✅ Validaciones de existencia

**Patrón de cada método:**
```javascript
async metodo(id) {
    return await sequelize.transaction(async (transaction) => {
        // 1. Buscar recurso
        // 2. Validar que existe
        // 3. Ejecutar operación
        // 4. Retornar resultado
    })
}
```

**Características especiales:**
- **UsuarioRepository:** Maneja encriptación de contraseñas con bcrypt
- **ProductoRepository:** Incluye categoría en resultados
- **OrdenRepository:** **LÓGICA CRÍTICA** - Calcula precios y aplica descuentos mayoristas
- **OrdenProductoRepository:** Maneja tabla junction (relación many-to-many)

---

### 4. CAPA SERVICIOS (`/services`)

Lógica de negocio. **Cada servicio:**
- ✅ Instancia su repositorio
- ✅ Llama métodos del repositorio
- ✅ Maneja errores con try/catch
- ✅ Retorna estructura estandarizada: `{success: boolean, data: any}`

**Estructura común:**
```javascript
async metodo(id) {
    try {
        const data = await this.repository.metodo(id);
        return { success: true, data };
    } catch (error) {
        return { success: false, data: null, message: error.message };
    }
}
```

**Servicios especiales:**
- **AuthService:** Login, generación de JWT
- **ProductoService:** Maneja upload a Cloudinary
- **OrdenService:** Delega cálculos complejos al repositorio

---

### 5. CAPA VALIDADORES (`/validators`)

Validación de entrada usando express-validator

**Tipos de validadores:**
- **validateCreate...:** Todos los campos requeridos
- **validateUpdate...:** Todos los campos opcionales
- **validate...Id:** Valida parámetros de URL

**Ejemplo de validación:**
```javascript
body('nombre')
    .exists().withMessage('Campo requerido')
    .isString().withMessage('Debe ser texto')
    .isLength({ min: 2, max: 45 }).withMessage('Entre 2-45 caracteres')
```

---

### 6. CAPA CONTROLADORES (`/controllers`)

Manejo de solicitudes HTTP

**Responsabilidades:**
- ✅ Recibir req y res
- ✅ Extraer datos del request
- ✅ Llamar al servicio
- ✅ Retornar respuestas HTTP con códigos apropiados

**Códigos HTTP utilizados:**
- `200 OK` - GET, UPDATE, DELETE exitoso
- `201 Created` - POST exitoso
- `400 Bad Request` - Validación fallida
- `404 Not Found` - Recurso no existe
- `500 Internal Error` - Error del servidor

---

### 7. CAPA MIDDLEWARE (`/middlewares`)

Código que se ejecuta en todas las requests o protected routes

#### **AuthMiddleware.js**
- Valida token JWT en header `Authorization: Bearer <token>`
- Extrae información del usuario del token
- Pasa control a siguiente middleware si token es válido
- Retorna 401/403 si falla

---

### 8. CAPA RUTAS (`/router`)

Define endpoints y vincula con controladores/validadores

**Estructura:**
```javascript
router.get('/', controlador.metodo)
router.get('/:id', validator, controlador.metodo)
router.post('/', validator, controlador.metodo)
router.put('/:id', [validator1, validator2], controlador.metodo)
router.delete('/:id', validator, controlador.metodo)
```

---

## 💾 Modelos de Datos

### Usuario
```javascript
{
  idUsuario: INTEGER PRIMARY KEY AUTO_INCREMENT,
  nombre: STRING(45) NOT NULL,
  correo: STRING(100) UNIQUE NOT NULL,
  contraseña: STRING(255) NOT NULL [HASHED],
  tipo: INTEGER NOT NULL // 1=Admin, 2=Cliente, 3=Mayorista
}
```

### Producto
```javascript
{
  idProducto: INTEGER PRIMARY KEY AUTO_INCREMENT,
  nombre: STRING(100) NOT NULL,
  precio: INTEGER NOT NULL,                    // Precio minorista
  precioMayorista: STRING(45),                 // Precio mayorista
  foto: STRING(255),                           // Cloudinary URL
  idCategoria: INTEGER FOREIGN KEY NOT NULL
}
```

### Categoria
```javascript
{
  idCategoria: INTEGER PRIMARY KEY AUTO_INCREMENT,
  nombre: STRING(45) NOT NULL
}
```

### Direccion
```javascript
{
  idDireccion: INTEGER PRIMARY KEY AUTO_INCREMENT,
  direccion: STRING(45) NOT NULL,
  ciudad: STRING(45) NOT NULL,
  barrio: STRING(45) NOT NULL,
  idUsuario: INTEGER FOREIGN KEY NOT NULL
}
```

### Orden
```javascript
{
  idOrden: INTEGER PRIMARY KEY AUTO_INCREMENT,
  estado: INTEGER NOT NULL,                    // 1=Pendiente, 2=En Proceso, 3=Cancelado, 4=Aceptado
  totalPago: INTEGER NOT NULL,                 // Total calculado con descuentos
  idUsuario: INTEGER FOREIGN KEY NOT NULL,
  idDireccion: INTEGER FOREIGN KEY NOT NULL
}
```

### OrdenProducto (Junction Table)
```javascript
{
  idOrdenProducto: INTEGER PRIMARY KEY AUTO_INCREMENT,
  cantidad: INTEGER NOT NULL,                  // Unidades compradas
  precioUnidad: INTEGER NOT NULL,              // Precio en momento de compra
  valorTotal: INTEGER NOT NULL,                // cantidad × precioUnidad
  idOrden: INTEGER FOREIGN KEY NOT NULL,
  idProducto: INTEGER FOREIGN KEY NOT NULL
}
```

---

## 🔌 Endpoints de la API

### Base URL
```
http://localhost:5000/api
```

### Autenticación
```
POST /auth/login
- Body: { correo, contraseña }
- Response: { token, user: {idUsuario, tipo} }

GET /auth/me
- Header: Authorization: Bearer <token>
- Response: Usuario autenticado
```

### Usuarios
```
GET    /usuarios              → Listar todos
GET    /usuarios/:id          → Obtener uno
POST   /usuarios              → Crear
PUT    /usuarios/:id          → Actualizar
DELETE /usuarios/:id          → Eliminar
```

### Productos
```
GET    /productos             → Listar (opcional: ?categoriaId=1)
GET    /productos/:id         → Obtener uno
POST   /productos             → Crear (con upload de imagen)
PUT    /productos/:id         → Actualizar
DELETE /productos/:id         → Eliminar
```

### Categorías
```
GET    /categorias            → Listar todas
GET    /categorias/:id        → Obtener una
POST   /categorias            → Crear
PUT    /categorias/:id        → Actualizar
DELETE /categorias/:id        → Eliminar
```

### Direcciones
```
GET    /direcciones           → Listar todas
GET    /direcciones/:id       → Obtener una
POST   /direcciones           → Crear
PUT    /direcciones/:id       → Actualizar
DELETE /direcciones/:id       → Eliminar
```

### Órdenes
```
GET    /ordenes               → Listar todas con productos
GET    /ordenes/:id           → Obtener una
POST   /ordenes               → Crear nueva orden
PUT    /ordenes/:id           → Actualizar estado
DELETE /ordenes/:id           → Eliminar orden
```

### Órdenes-Productos (Junction)
```
GET    /ordenesProductos      → Listar todos los items
GET    /ordenesProductos/:id  → Obtener item específico
POST   /ordenesProductos      → Crear item (normalmente auto)
PUT    /ordenesProductos/:id  → Actualizar item
DELETE /ordenesProductos/:id  → Eliminar item
```

---

## 🔄 Flujo de Lógica de Negocio

### Flujo de Creación de Orden (Más Importante)

```
1. Cliente hace POST /api/ordenes
   Body: {
     idUsuario: 5,
     idDireccion: 2,
     estado: 1,
     productos: [
       {idProducto: 1, cantidad: 2},
       {idProducto: 3, cantidad: 1}
     ]
   }

2. VALIDACIÓN (Validator Layer)
   ✅ Estado es 1-4
   ✅ Array de productos no vacío
   ✅ Cada producto tiene idProducto y cantidad

3. CONTROLADOR
   ├─ Llama: ordenService.createOrden(req.body)
   └─ Espera respuesta

4. SERVICIO
   ├─ Llama: ordenRepository.createOrden(ordenData)
   └─ Retorna {success, data}

5. REPOSITORIO - LÓGICA CRÍTICA
   
   a) Validaciones:
      ├─ ¿Usuario existe? Si no → Error 400
      ├─ ¿Dirección existe? Si no → Error 400
      └─ ¿Usuario es admin? Si sí → Error 400
   
   b) Calcula precios NORMALES:
      Producto 1: precio($500) × cantidad(2) = $1000
      Producto 3: precio($800) × cantidad(1) = $800
      TOTAL = $1800
   
   c) ¿APLICA DESCUENTO MAYORISTA?
      SI: usuario.tipo == 3 (mayorista) AND total >= $140,000
      
      Si aplica:
      ├─ Recalcula con precioMayorista
      ├─ Nuevo total = suma con precios mayoristas
      └─ Usa array productosClienteMayorista
      
      Si NO aplica:
      └─ Usa array productosCliente (precios normales)
   
   d) Crea registro ORDEN:
      INSERT INTO Orden (estado, totalPago, idUsuario, idDireccion)
      VALUES (1, 1800, 5, 2)
      → idOrden = 42
   
   e) Crea registros ORDEN_PRODUCTO:
      INSERT INTO OrdenProducto 
      (cantidad, precioUnidad, valorTotal, idOrden, idProducto)
      VALUES 
      (2, 500, 1000, 42, 1),
      (1, 800, 800, 42, 3)

6. RESPUESTA
   {
     "resultado": "éxito",
     "data": {
       "orden": {idOrden: 42, estado: 1, totalPago: 1800, ...},
       "productos": [Array de OrdenProducto creados]
     }
   }

7. BD ACTUALIZADA
   ✅ Nuevo registro en Orden
   ✅ Nuevos registros en OrdenProducto
   ✅ Se mantiene histórico de precios en momento de compra
```

### Flujo de Upload de Producto

```
1. Cliente hace POST /api/productos
   Body: multipart/form-data
   ├─ nombre: "Laptop Dell"
   ├─ precio: 2500000
   ├─ precioMayorista: 2000000
   ├─ idCategoria: 1
   └─ imagen: <archivo.jpg>

2. MULTER MIDDLEWARE
   ├─ Recibe archivo
   ├─ Guarda temporalmente en /uploads/
   └─ Pasa control a validador

3. VALIDADOR
   ✅ Campos requeridos presentes
   ✅ Tipos de datos correctos

4. CONTROLADOR
   ├─ req.file contiene info del archivo temporal
   └─ Llama: productoService.createProducto(req.body, req.file)

5. SERVICIO ProductoService
   ├─ Llama: productoRepository.createProducto()
   ├─ Obtiene: resultado de BD
   ├─ SI req.file existe:
   │  ├─ Carga archivo a CLOUDINARY
   │  ├─ Obtiene URL pública
   │  ├─ Actualiza producto con URL
   │  └─ Elimina archivo temporal
   └─ Retorna producto con URL

6. BD
   INSERT INTO Producto 
   (nombre, precio, precioMayorista, foto, idCategoria)
   VALUES 
   ("Laptop Dell", 2500000, 2000000, "https://res.cloudinary.com/...", 1)

7. RESPUESTA
   {
     "idProducto": 10,
     "nombre": "Laptop Dell",
     "foto": "https://res.cloudinary.com/..."
   }
```

### Flujo de Login

```
1. Usuario hace POST /api/auth/login
   Body: {correo: "user@mail.com", contraseña: "pass123"}

2. VALIDADOR
   ✅ Correo es válido (formato email)
   ✅ Contraseña cumple (min 6 chars, letra + número)

3. CONTROLADOR
   └─ Llama: authService.login(correo, contraseña)

4. AUTH SERVICE
   ├─ Busca usuario por correo
   ├─ Si NO existe → Error "Credenciales inválidas"
   ├─ Si existe:
   │  ├─ Compara contraseña con bcrypt.compare()
   │  ├─ Si NO coincide → Error "Credenciales inválidas"
   │  └─ Si coincide:
   │     ├─ Crea JWT payload: {idUsuario, tipo}
   │     ├─ Firma con proceso.env.JWT_SECRET
   │     ├─ Establece expiración: 1 hora
   │     └─ Retorna token

5. RESPUESTA
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "usuario": {idUsuario: 5, tipo: 2}
   }

6. CLIENTE GUARDA TOKEN
   localStorage.setItem('token', token)

7. PARA REQUESTS PROTEGIDAS
   Header: Authorization: Bearer <token>
   ↓
   AuthMiddleware verifica token
   ↓
   Si válido: req.user = {idUsuario, tipo}
   Si inválido: Error 401/403
```

---

## 🔐 Autenticación y Seguridad

### JWT (JSON Web Token)
- **Ubicación:** Header `Authorization: Bearer <token>`
- **Payload:** `{idUsuario, tipo, iat, exp}`
- **Duración:** 1 hora
- **Algoritmo:** HS256 (HMAC-SHA256)
- **Secret:** `process.env.JWT_SECRET`

### Hashing de Contraseñas
- **Algoritmo:** bcrypt
- **Salt Rounds:** 10
- **Nunca se retorna contraseña en responses**

### CORS
- Habilitado para desarrollo
- Permite requests desde cualquier origen
- En producción: configurar whitelist de orígenes

---

## ⚠️ Guía de Errores

### Códigos HTTP

| Código | Significado | Ejemplo |
|--------|-----------|---------|
| **200** | OK | GET exitoso, UPDATE exitoso |
| **201** | Created | POST exitoso, recurso creado |
| **400** | Bad Request | Validación fallida, datos inválidos |
| **401** | Unauthorized | Token expirado o ausente |
| **403** | Forbidden | Token inválido o permisos insuficientes |
| **404** | Not Found | Recurso no existe |
| **500** | Server Error | Error en el servidor |

### Estructura de Error
```javascript
{
  error: "Descripción del error",
  message: "Detalles específicos",
  statusCode: 400
}
```

### Errores Comunes

**Error 400 - Validación fallida**
```json
{
  "error": "Errores de validación",
  "details": [
    {"campo": "correo", "mensaje": "Formato de email inválido"},
    {"campo": "contraseña", "mensaje": "Mínimo 6 caracteres"}
  ]
}
```

**Error 404 - No encontrado**
```json
{
  "error": "Usuario no encontrado"
}
```

**Error 401 - Token expirado**
```json
{
  "error": "Token expirado"
}
```

---

## 📊 Diagrama de Entidad-Relación

```
┌──────────────┐
│   USUARIO    │
├──────────────┤
│ idUsuario (PK)│
│ nombre       │
│ correo (U)   │
│ contraseña   │
│ tipo (1-3)   │
└──────┬───────┘
       │
       ├─────────────────┐
       │                 │
       ▼                 ▼
┌──────────────┐   ┌──────────────┐
│  DIRECCION   │   │    ORDEN     │
├──────────────┤   ├──────────────┤
│ idDireccion  │   │ idOrden (PK) │
│ direccion    │   │ estado       │
│ ciudad       │   │ totalPago    │
│ barrio       │   │ idUsuario(FK)│
│ idUsuario(FK)│   │ idDireccion  │
└──────────────┘   └──────┬───────┘
                          │
                          ▼
                  ┌─────────────────────┐
                  │  ORDEN_PRODUCTO     │
                  ├─────────────────────┤
                  │ idOrdenProducto(PK) │
                  │ cantidad            │
                  │ precioUnidad        │
                  │ valorTotal          │
                  │ idOrden (FK)        │
                  │ idProducto (FK)     │
                  └────────┬────────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │    PRODUCTO      │
                  ├──────────────────┤
                  │ idProducto (PK)  │
                  │ nombre           │
                  │ precio           │
                  │ precioMayorista  │
                  │ foto (Cloudinary)│
                  │ idCategoria (FK) │
                  └────────┬─────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │   CATEGORIA      │
                  ├──────────────────┤
                  │ idCategoria (PK) │
                  │ nombre           │
                  └──────────────────┘
```

---

## 📝 Notas Importantes

1. **Transacciones en Repositorio**
   - Todas las operaciones usan `sequelize.transaction()`
   - Garantiza ACID compliance
   - Si falla cualquier operación, se revierte todo

2. **Descuentos Mayoristas**
   - Solo aplica a usuarios tipo 3 (mayoristas)
   - Solo si total >= $140,000
   - Se almacena el precio en momento de compra (histórico)

3. **Precios**
   - Todos los precios están en enteros (sin decimales)
   - Ejemplo: $2,500.50 se guarda como 250050 (centavos × 100)

4. **Contraseñas**
   - Siempre hasheadas con bcrypt
   - Nunca se retornan en responses
   - Salt rounds = 10 (seguridad-velocidad balance)

5. **Cloudinary**
   - Solo se sube imagen si se proporciona
   - El archivo temporal se elimina después del upload
   - Se guarda la URL pública en la BD

---

## 🚀 Próximos Pasos para Deployar

1. **Configurar variables de entorno (.env)**
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=password
   DB_NAME=ecommerce_db
   DB_PORT=3306
   JWT_SECRET=tu_secret_seguro
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Crear base de datos y correr migrations**
   ```bash
   npm run db:migrate
   ```

4. **Iniciar servidor**
   ```bash
   npm start
   ```

5. **Testear endpoints**
   - Usar Postman o Insomnia
   - Importar colección de requests

---

**Documentación completada:** Todos los archivos han sido comentados siguiendo patrones profesionales.
**Última actualización:** 2024
