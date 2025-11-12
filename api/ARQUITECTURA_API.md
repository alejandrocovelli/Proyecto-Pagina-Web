# 📚 GUÍA DE ARQUITECTURA DE LA API

## Descripción General

Esta es una API REST construida con **Node.js + Express** que implementa una arquitectura en capas para gestionar una tienda en línea. La aplicación está diseñada siguiendo patrones de software profesionales para garantizar mantenibilidad, escalabilidad y claridad del código.

---

## 🏗️ ESTRUCTURA DE CAPAS

La API está organizada en las siguientes capas, cada una con responsabilidades específicas:

### 1. **CAPA DE PRESENTACIÓN (Controllers)**
**Ubicación:** `controllers/`

**Responsabilidades:**
- Recibir peticiones HTTP desde las rutas
- Extraer datos del request (body, params, query)
- Llamar a los servicios correspondientes
- Formatear respuestas HTTP consistentes
- Retornar códigos de estado apropiados (200, 201, 400, 404, 500)

**Característica:** Los métodos son estáticos para no requerir instanciación

**Ejemplo de Flujo:**
```
Cliente HTTP → Router → Controller → Service → Repository → Base de Datos
              request    procesa    lógica     consultas      datos
```

### 2. **CAPA DE LÓGICA DE NEGOCIO (Services)**
**Ubicación:** `services/`

**Responsabilidades:**
- Aplicar reglas de negocio complejas
- Procesamiento de datos antes de guardar/devolver
- Coordinar múltiples operaciones de base de datos
- Manejo de validaciones avanzadas
- Gestión de archivos (upload a Cloudinary)

**Características:**
- Inyectan el Repository en el constructor
- Retornan respuestas estructuradas: `{ success: true/false, data: {...}, message: "..." }`

### 3. **CAPA DE ACCESO A DATOS (Repositories)**
**Ubicación:** `repositories/`

**Responsabilidades:**
- Comunicarse directamente con la base de datos
- Implementar operaciones CRUD
- Usar transacciones de Sequelize para integridad
- Manejar queries complejas
- Lanzar errores específicos

**Características:**
- Todos los métodos son asíncronos (async/await)
- Usan transacciones para garantizar consistencia
- Solo trabajan con Sequelize ORM

### 4. **MODELOS DE DATOS (Models)**
**Ubicación:** `models/`

**Responsabilidades:**
- Definir la estructura de cada tabla de la BD
- Validar tipos de datos
- Establecer restricciones (unique, allowNull, etc.)
- Definir relaciones entre tablas

**Tipos de Relaciones:**
- **1:N (uno a muchos):** Usuario → Direcciones, Categoría → Productos
- **N:N (muchos a muchos):** Orden ↔ Producto (mediante OrdenProducto)

### 5. **VALIDADORES**
**Ubicación:** `validators/`

**Responsabilidades:**
- Validar datos de entrada en HTTP
- Sanitizar y limpiar datos
- Retornar errores descriptivos
- Ejecutarse como middleware ANTES del controlador

**Librería:** `express-validator`

**Validaciones que realiza:**
- Campos requeridos
- Tipos de datos (String, Int, Email, etc.)
- Longitud de campos
- Patrones (regex para contraseñas, emails)
- Valores en rango

### 6. **RUTAS (Router)**
**Ubicación:** `router/`

**Responsabilidades:**
- Mapear URLs HTTP a controladores
- Definir métodos HTTP (GET, POST, PUT, DELETE)
- Aplicar validadores como middleware
- Aplicar autenticación (middleware JWT)
- Documentar endpoints

**Estructura:**
```
router.get("/:id", validateId, Controller.metodo)
         ↓        ↓             ↓
       ruta   validadores   controlador
```

### 7. **MIDDLEWARES**
**Ubicación:** `middlewares/`

**Tipos:**
- **AuthMiddleware:** Verifica tokens JWT y autentica usuarios
- **Globales en app.js:** CORS, Morgan, Body Parser

**Flujo de Autenticación:**
```
1. Cliente envía: Authorization: "Bearer <token>"
2. AuthMiddleware extrae y valida el token
3. Si es válido, inyecta req.user con datos del usuario
4. Si es inválido, retorna error 401/403
```

### 8. **CONFIGURACIÓN**
**Ubicación:** `config/`

**Componentes:**
- **database.js:** Conexión a MySQL con Sequelize
- **cloudinary.js:** Configuración para subida de imágenes

---

## 🔄 FLUJO DE UNA PETICIÓN

### Ejemplo: GET /api/usuarios/1

```
1. CLIENTE ENVÍA PETICIÓN
   GET /api/usuarios/1
   Authorization: Bearer token123

2. ROUTER (router/UsuarioRoutes.js)
   ↓ Valida parámetro con validateUsuarioId
   ↓ Pasa al controlador

3. CONTROLLER (controllers/UsuarioController.js)
   ↓ Extrae parámetro: req.params.id = 1
   ↓ Llama al servicio

4. SERVICE (services/UsuarioService.js)
   ↓ Aplica lógica de negocio
   ↓ Llama al repository

5. REPOSITORY (repositories/UsuarioRepository.js)
   ↓ Usa Sequelize para consultar BD
   ↓ Ejecuta: Usuario.findByPk(1)
   ↓ Retorna datos al service

6. SERVICE
   ↓ Formatea respuesta: { success: true, data: {...} }
   ↓ Retorna al controller

7. CONTROLLER
   ↓ Formatea respuesta HTTP
   ↓ Retorna: res.status(200).json({ mensaje: "...", data: {...} })

8. CLIENTE RECIBE RESPUESTA
   {
     "mensaje": "Usuario obtenido correctamente",
     "data": {
       "idUsuario": 1,
       "nombre": "Juan Pérez",
       ...
     }
   }
```

---

## 🗄️ MODELOS Y RELACIONES

### Modelos Principales

#### 1. **Usuario**
```
idUsuario (PK)
nombre
correo (UNIQUE)
contraseña (hasheada)
tipo (1=Admin, 2=Cliente, 3=Mayorista)

Relaciones:
- hasMany: Direcciones
- hasMany: Órdenes
```

#### 2. **Categoría**
```
idCategoria (PK)
nombre

Relaciones:
- hasMany: Productos
```

#### 3. **Producto**
```
idProducto (PK)
nombre
precio
precioMayorista
foto (URL Cloudinary)
idCategoria (FK)

Relaciones:
- belongsTo: Categoría
- hasMany: OrdenProducto
```

#### 4. **Dirección**
```
idDireccion (PK)
direccion
ciudad
barrio
idUsuario (FK)

Relaciones:
- belongsTo: Usuario
- hasMany: Órdenes
```

#### 5. **Orden**
```
idOrden (PK)
estado (1=Pendiente, 2=En prep, 3=Enviada, 4=Entregada, 5=Cancelada)
totalPago
idUsuario (FK)
idDireccion (FK)

Relaciones:
- belongsTo: Usuario
- belongsTo: Dirección
- hasMany: OrdenProducto
```

#### 6. **OrdenProducto** (Tabla Pivote)
```
idOrdenProducto (PK)
cantidad
precioUnidad (precio en el momento de la orden)
valorTotal (cantidad × precioUnidad)
idOrden (FK)
idProducto (FK)

Relaciones:
- belongsTo: Orden
- belongsTo: Producto
```

---

## 🔐 SEGURIDAD

### Autenticación (JWT)

**Flujo:**
1. Cliente se registra/login
2. API retorna token JWT (válido 1 hora)
3. Cliente envía token en header: `Authorization: Bearer <token>`
4. API valida token con AuthMiddleware
5. Si es válido, ejecuta la acción

**Token contiene:**
```javascript
{
  idUsuario: 1,
  tipo: 2,
  iat: timestamp,
  exp: timestamp + 3600 (1 hora)
}
```

### Contraseñas

- Se hashean con **bcrypt** (salt rounds: 10)
- NUNCA se guardan en texto plano
- Se comparan con `bcrypt.compare()` de forma segura

### Control de Acceso

- **Admin (tipo=1):** Puede hacer cualquier operación
- **Cliente (tipo=2):** Puede comprar a precio regular
- **Mayorista (tipo=3):** Compra con precio mayorista

---

## 📋 ENDPOINTS PRINCIPALES

### Autenticación
```
POST   /api/auth/login          - Login (retorna token)
GET    /api/auth/me             - Datos del usuario autenticado
```

### Usuarios
```
GET    /api/usuarios            - Listar todos
GET    /api/usuarios/:id        - Obtener uno
POST   /api/usuarios            - Crear
PUT    /api/usuarios/:id        - Actualizar
DELETE /api/usuarios/:id        - Eliminar
```

### Categorías
```
GET    /api/categorias          - Listar todas
GET    /api/categorias/:id      - Obtener una
POST   /api/categorias          - Crear
PUT    /api/categorias/:id      - Actualizar
DELETE /api/categorias/:id      - Eliminar
```

### Productos
```
GET    /api/productos           - Listar (con filtro de categoría)
GET    /api/productos/:id       - Obtener uno
POST   /api/productos           - Crear (con upload de imagen)
PUT    /api/productos/:id       - Actualizar
DELETE /api/productos/:id       - Eliminar
```

### Direcciones
```
GET    /api/direcciones         - Listar
GET    /api/direcciones/:id     - Obtener una
POST   /api/direcciones         - Crear
PUT    /api/direcciones/:id     - Actualizar
DELETE /api/direcciones/:id     - Eliminar
```

### Órdenes
```
GET    /api/ordenes             - Listar todas
GET    /api/ordenes/:id         - Obtener una
POST   /api/ordenes             - Crear
PUT    /api/ordenes/:id         - Actualizar
DELETE /api/ordenes/:id         - Eliminar
```

---

## 🛠️ TECNOLOGÍAS UTILIZADAS

### Backend
- **Node.js:** Runtime de JavaScript
- **Express.js:** Framework web minimalista
- **Sequelize:** ORM para MySQL
- **MySQL:** Base de datos relacional
- **JWT:** Autenticación con tokens
- **Bcrypt:** Hashing de contraseñas
- **Cloudinary:** Almacenamiento de imágenes
- **Multer:** Manejo de upload de archivos
- **Morgan:** Logger HTTP
- **CORS:** Compartir recursos entre dominios

### Variables de Entorno (.env)
```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=password
DB_NAME=tienda_db
JWT_SECRET=tu_clave_secreta_super_larga
CLOUDINARY_CLOUD_NAME=tu_cloud
CLOUDINARY_API_KEY=tu_key
CLOUDINARY_API_SECRET=tu_secret
```

---

## 🚀 INICIANDO LA API

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
# Copiar .env.example a .env y completar

# 3. En desarrollo (con watch)
npm run dev

# 4. En producción
npm start
```

**Servidor escucha en:** `http://localhost:3000`

---

## 📝 PATRONES Y BUENAS PRÁCTICAS

### 1. **Respuestas Consistentes**
```javascript
// Éxito
res.status(200).json({
  success: true,
  mensaje: "...",
  data: {...}
})

// Error
res.status(400).json({
  success: false,
  error: "Descripción del error"
})
```

### 2. **Manejo de Errores**
- Try/catch en todos los métodos
- Errores específicos en repositories
- Captura y formateo en services
- Respuestas limpias en controllers

### 3. **Transacciones**
Todas las operaciones usan transacciones de Sequelize para garantizar que si algo falla, todo se revierte.

### 4. **Validación en Capas**
1. Validador (express-validator)
2. Service (lógica de negocio)
3. Repository (integridad de datos)

---

## 📖 EJEMPLO COMPLETO: Crear Usuario

### 1. Cliente envía petición
```bash
POST /api/usuarios
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "correo": "juan@example.com",
  "contraseña": "Password123",
  "tipo": 2
}
```

### 2. Validador (usuarioValidator.js)
✓ Nombre es string y tiene 2-45 caracteres
✓ Correo es email válido
✓ Contraseña tiene mínimo 6 caracteres con letra y número
✓ Tipo es 1, 2 o 3

### 3. Controller (UsuarioController.js)
```javascript
static async createUsuario(req, res) {
  try {
    const result = await usuarioService.createUsuario(req.body);
    return res.status(201).json({
      mensaje: "Usuario creado correctamente",
      data: result.data
    });
  } catch (error) {
    // Manejo de errores
  }
}
```

### 4. Service (UsuarioService.js)
```javascript
async createUsuario(usuarioData) {
  try {
    const usuario = await this.usuarioRepository.createUsuario(usuarioData);
    return { success: true, data: usuario };
  } catch (error) {
    throw new Error(`Error al crear usuario: ${error.message}`);
  }
}
```

### 5. Repository (UsuarioRepository.js)
```javascript
async createUsuario(usuarioData) {
  return await sequelize.transaction(async (transaction) => {
    // Validar correo único
    const existingUser = await Usuario.findOne({
      where: { correo: usuarioData.correo }
    }, { transaction });
    
    if (existingUser) {
      throw new Error('Ya existe un usuario con este correo');
    }
    
    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    usuarioData.contraseña = await bcrypt.hash(usuarioData.contraseña, salt);
    
    // Crear usuario
    const usuario = await Usuario.create(usuarioData, { transaction });
    return usuario;
  });
}
```

### 6. Respuesta al cliente
```json
HTTP/1.1 201 Created

{
  "mensaje": "Usuario creado correctamente",
  "data": {
    "idUsuario": 5,
    "nombre": "Juan Pérez",
    "correo": "juan@example.com",
    "tipo": 2
  }
}
```

---

## 🐛 DEBUGGING Y LOGS

### Morgan (Logger HTTP)
Registra todas las peticiones HTTP en modo desarrollo

### Console.log
Se recomienda usar en servicios para debugging

### Error Handling
Todos los errores se loguean en console.error para facilitar debugging

---

## 🎯 PRÓXIMAS MEJORAS

- [ ] Paginación en listados
- [ ] Búsqueda avanzada de productos
- [ ] Sistema de carritos de compra
- [ ] Notificaciones por email
- [ ] Webhooks para pagos
- [ ] Rate limiting para APIs públicas
- [ ] Caching con Redis
- [ ] Tests unitarios y de integración

---

**Última actualización:** Noviembre 2025
**Versión:** 1.0
