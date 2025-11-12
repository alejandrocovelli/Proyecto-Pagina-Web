# 🧪 Ejemplos de Requests - Colección para Testing

## 🔐 1. AUTENTICACIÓN

### 1.1 Login
```
POST /api/auth/login
Content-Type: application/json

{
  "correo": "cliente@example.com",
  "contraseña": "Cliente@123"
}

Response 200:
{
  "resultado": "éxito",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "usuario": {
      "idUsuario": 2,
      "tipo": 2
    }
  }
}
```

### 1.2 Get Current User (Protected)
```
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Response 200:
{
  "resultado": "éxito",
  "data": {
    "idUsuario": 2,
    "nombre": "Juan Pérez",
    "correo": "cliente@example.com",
    "tipo": 2
  }
}
```

---

## 👥 2. USUARIOS

### 2.1 Crear Usuario
```
POST /api/usuarios
Content-Type: application/json

{
  "nombre": "Carlos López",
  "correo": "carlos@example.com",
  "contraseña": "Seguro@123",
  "tipo": 2
}

Response 201:
{
  "resultado": "éxito",
  "data": {
    "idUsuario": 10,
    "nombre": "Carlos López",
    "correo": "carlos@example.com",
    "tipo": 2
  }
}
```

### 2.2 Listar Usuarios
```
GET /api/usuarios

Response 200:
{
  "resultado": "éxito",
  "data": [
    {
      "idUsuario": 1,
      "nombre": "Admin",
      "correo": "admin@example.com",
      "tipo": 1
    },
    {
      "idUsuario": 2,
      "nombre": "Juan Pérez",
      "correo": "cliente@example.com",
      "tipo": 2
    }
  ]
}
```

### 2.3 Obtener Usuario por ID
```
GET /api/usuarios/2

Response 200:
{
  "resultado": "éxito",
  "data": {
    "idUsuario": 2,
    "nombre": "Juan Pérez",
    "correo": "cliente@example.com",
    "tipo": 2
  }
}
```

### 2.4 Actualizar Usuario
```
PUT /api/usuarios/2
Content-Type: application/json

{
  "nombre": "Juan Pérez Actualizado",
  "tipo": 3
}

Response 200:
{
  "resultado": "éxito",
  "data": {
    "idUsuario": 2,
    "nombre": "Juan Pérez Actualizado",
    "tipo": 3
  }
}
```

### 2.5 Eliminar Usuario
```
DELETE /api/usuarios/10

Response 200:
{
  "resultado": "éxito",
  "mensaje": "Usuario eliminado"
}
```

---

## 🏷️ 3. CATEGORÍAS

### 3.1 Crear Categoría
```
POST /api/categorias
Content-Type: application/json

{
  "nombre": "Electrónica"
}

Response 201:
{
  "resultado": "éxito",
  "data": {
    "idCategoria": 5,
    "nombre": "Electrónica"
  }
}
```

### 3.2 Listar Categorías
```
GET /api/categorias

Response 200:
{
  "resultado": "éxito",
  "data": [
    {
      "idCategoria": 1,
      "nombre": "Ropa"
    },
    {
      "idCategoria": 2,
      "nombre": "Electrónica"
    }
  ]
}
```

### 3.3 Obtener Categoría por ID
```
GET /api/categorias/1

Response 200:
{
  "resultado": "éxito",
  "data": {
    "idCategoria": 1,
    "nombre": "Ropa"
  }
}
```

---

## 📦 4. PRODUCTOS

### 4.1 Crear Producto (Con Imagen)
```
POST /api/productos
Content-Type: multipart/form-data

Campos:
- nombre: "Laptop Dell XPS 13"
- precio: 250000
- precioMayorista: 200000
- idCategoria: 2
- imagen: <archivo.jpg>

Response 201:
{
  "resultado": "éxito",
  "data": {
    "idProducto": 15,
    "nombre": "Laptop Dell XPS 13",
    "precio": 250000,
    "precioMayorista": 200000,
    "foto": "https://res.cloudinary.com/...",
    "idCategoria": 2
  }
}
```

### 4.2 Listar Productos
```
GET /api/productos

Response 200:
{
  "resultado": "éxito",
  "data": [
    {
      "idProducto": 1,
      "nombre": "Camiseta Básica",
      "precio": 50000,
      "precioMayorista": 40000,
      "foto": "url...",
      "idCategoria": 1
    }
  ]
}
```

### 4.3 Listar Productos por Categoría
```
GET /api/productos?categoriaId=2

Response 200:
{
  "resultado": "éxito",
  "data": [
    {
      "idProducto": 15,
      "nombre": "Laptop Dell XPS 13",
      "precio": 250000,
      "idCategoria": 2
    }
  ]
}
```

### 4.4 Obtener Producto por ID
```
GET /api/productos/15

Response 200:
{
  "resultado": "éxito",
  "data": {
    "idProducto": 15,
    "nombre": "Laptop Dell XPS 13",
    "precio": 250000,
    "precioMayorista": 200000,
    "foto": "https://res.cloudinary.com/...",
    "idCategoria": 2
  }
}
```

---

## 🏠 5. DIRECCIONES

### 5.1 Crear Dirección
```
POST /api/direcciones
Content-Type: application/json

{
  "direccion": "Calle Principal 123 Apto 4B",
  "ciudad": "Bogotá",
  "barrio": "La Candelaria",
  "idUsuario": 2
}

Response 201:
{
  "resultado": "éxito",
  "data": {
    "idDireccion": 8,
    "direccion": "Calle Principal 123 Apto 4B",
    "ciudad": "Bogotá",
    "barrio": "La Candelaria",
    "idUsuario": 2
  }
}
```

### 5.2 Listar Direcciones
```
GET /api/direcciones

Response 200:
{
  "resultado": "éxito",
  "data": [
    {
      "idDireccion": 1,
      "direccion": "Carrera 5 456",
      "ciudad": "Bogotá",
      "barrio": "Zona Centro",
      "usuario": {
        "idUsuario": 2,
        "nombre": "Juan Pérez"
      }
    }
  ]
}
```

### 5.3 Actualizar Dirección
```
PUT /api/direcciones/8
Content-Type: application/json

{
  "ciudad": "Medellín",
  "barrio": "Laureles"
}

Response 200:
{
  "resultado": "éxito",
  "data": {
    "idDireccion": 8,
    "direccion": "Calle Principal 123 Apto 4B",
    "ciudad": "Medellín",
    "barrio": "Laureles"
  }
}
```

---

## 📋 6. ÓRDENES (EL MAS IMPORTANTE)

### 6.1 Crear Orden (Cliente Regular)
```
POST /api/ordenes
Content-Type: application/json

{
  "idUsuario": 2,
  "idDireccion": 1,
  "estado": 1,
  "productos": [
    {
      "idProducto": 1,
      "cantidad": 2
    },
    {
      "idProducto": 3,
      "cantidad": 1
    }
  ]
}

Flujo en Servidor:
1. Valida usuario existe (tipo 2 = Cliente Regular)
2. Valida dirección existe
3. Para producto 1: precio($50,000) × 2 = $100,000
4. Para producto 3: precio($80,000) × 1 = $80,000
5. Total = $180,000 (sin descuento)
6. Crea Orden
7. Crea OrdenProducto para cada producto

Response 201:
{
  "resultado": "éxito",
  "data": {
    "orden": {
      "idOrden": 42,
      "estado": 1,
      "totalPago": 180000,
      "idUsuario": 2,
      "idDireccion": 1
    },
    "productos": [
      {
        "idOrdenProducto": 120,
        "cantidad": 2,
        "precioUnidad": 50000,
        "valorTotal": 100000,
        "idOrden": 42,
        "idProducto": 1
      },
      {
        "idOrdenProducto": 121,
        "cantidad": 1,
        "precioUnidad": 80000,
        "valorTotal": 80000,
        "idOrden": 42,
        "idProducto": 3
      }
    ]
  }
}
```

### 6.2 Crear Orden (Cliente Mayorista CON DESCUENTO)
```
POST /api/ordenes
Content-Type: application/json

{
  "idUsuario": 5,
  "idDireccion": 2,
  "estado": 1,
  "productos": [
    {
      "idProducto": 1,
      "cantidad": 100
    }
  ]
}

Flujo en Servidor:
1. Valida usuario existe (tipo 3 = Mayorista)
2. Calcula: precio($50,000) × 100 = $5,000,000
3. ¿Total >= $140,000? SÍ
4. ¿Usuario es mayorista? SÍ
5. APLICA DESCUENTO: usa precioMayorista($40,000)
6. Nuevo total: $40,000 × 100 = $4,000,000 ✨ DESCUENTO APLICADO

Response 201:
{
  "resultado": "éxito",
  "data": {
    "orden": {
      "idOrden": 43,
      "estado": 1,
      "totalPago": 4000000,  // ← Con descuento mayorista
      "idUsuario": 5,
      "idDireccion": 2
    },
    "productos": [
      {
        "idOrdenProducto": 122,
        "cantidad": 100,
        "precioUnidad": 40000,  // ← Precio mayorista
        "valorTotal": 4000000,
        "idOrden": 43,
        "idProducto": 1
      }
    ]
  }
}
```

### 6.3 Listar Órdenes
```
GET /api/ordenes

Response 200:
{
  "resultado": "éxito",
  "data": [
    {
      "idOrden": 42,
      "estado": 1,
      "totalPago": 180000,
      "usuario": {
        "idUsuario": 2,
        "nombre": "Juan Pérez"
      },
      "ordenProductos": [
        {
          "idOrdenProducto": 120,
          "cantidad": 2,
          "precioUnidad": 50000,
          "valorTotal": 100000,
          "producto": {
            "idProducto": 1,
            "nombre": "Camiseta",
            "precio": 50000
          }
        }
      ]
    }
  ]
}
```

### 6.4 Obtener Orden por ID
```
GET /api/ordenes/42

Response 200:
{
  "resultado": "éxito",
  "data": {
    "idOrden": 42,
    "estado": 1,
    "totalPago": 180000,
    "usuario": {...},
    "ordenProductos": [...]
  }
}
```

### 6.5 Actualizar Estado de Orden
```
PUT /api/ordenes/42
Content-Type: application/json

{
  "estado": 2
}

Response 200:
{
  "resultado": "éxito",
  "data": {
    "idOrden": 42,
    "estado": 2,
    "totalPago": 180000
  }
}
```

---

## 🚨 7. CASOS DE ERROR

### 7.1 Validación Fallida
```
POST /api/usuarios
Content-Type: application/json

{
  "nombre": "Carlos",
  "correo": "email-invalido",  // ❌ Formato inválido
  "contraseña": "123456",      // ❌ Sin letra
  "tipo": 5                     // ❌ Tipo inválido (1-3)
}

Response 400:
{
  "error": "Errores de validación",
  "details": [
    {"campo": "correo", "mensaje": "Formato de email inválido"},
    {"campo": "contraseña", "mensaje": "Debe contener letra y número"},
    {"campo": "tipo", "mensaje": "Tipo debe ser 1, 2 o 3"}
  ]
}
```

### 7.2 Recurso No Encontrado
```
GET /api/usuarios/999

Response 404:
{
  "error": "Usuario no encontrado"
}
```

### 7.3 Token Expirado
```
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Response 401:
{
  "error": "Token expirado"
}
```

### 7.4 Admin Intenta Comprar
```
POST /api/ordenes
{
  "idUsuario": 1,  // ← Admin (tipo 1)
  ...
}

Response 400:
{
  "error": "El administrador no puede comprar"
}
```

### 7.5 Producto No Existe
```
POST /api/ordenes
{
  "productos": [
    {
      "idProducto": 999,  // ← No existe
      "cantidad": 1
    }
  ]
  ...
}

Response 400:
{
  "error": "Producto 999 no encontrado"
}
```

---

## 💡 Tips para Testing

### Con Postman:
1. Crear colección "Proyecto API"
2. Crear carpetas por módulo (Auth, Usuarios, Órdenes, etc.)
3. Guardar respuestas 200 como ejemplos
4. Usar variables de entorno para token y URLs

### Variables de Entorno Útiles:
```
{
  "base_url": "http://localhost:5000/api",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": 2,
  "productoId": 1,
  "direccionId": 1,
  "ordenId": 42
}
```

### Scripts Pre-Request (en Postman):
```javascript
// Agregar token automáticamente
pm.request.headers.add({
    key: "Authorization",
    value: "Bearer " + pm.environment.get("token")
});
```

---

## 🔄 Flujo Recomendado de Testing

1. **Login** - Obtener token
2. **Crear Usuario** - Para pruebas
3. **Crear Categoría** - Para productos
4. **Crear Producto** - Con imagen
5. **Crear Dirección** - Para orden
6. **Crear Orden** - Case normal
7. **Crear Orden** - Mayorista (con descuento)
8. **Actualizar Orden** - Cambiar estado
9. **Listar Órdenes** - Verificar historicidad
10. **Pruebas de Error** - Validar errores

---

## ✨ Notas Importantes

- Todos los requests tienen `Content-Type: application/json` excepto create producto que es `multipart/form-data`
- El token JWT dura 1 hora
- Contraseñas deben tener letra + número (mínimo 6 caracteres)
- Precios están en enteros (centavos × 100)
- Descuento mayorista solo si total >= $140,000
