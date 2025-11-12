/**
 * ========================================
 * ARCHIVO PRINCIPAL DE LA API
 * ========================================
 * Este archivo configura el servidor Express e inicializa todas las dependencias
 * necesarias para que la API funcione correctamente, incluyendo la conexión a la
 * base de datos y las relaciones entre modelos.
 * 
 * Responsabilidades:
 * - Crear instancia de Express
 * - Configurar middlewares globales (CORS, Morgan, Body Parser)
 * - Establecer las rutas de la API
 * - Configurar manejo de errores global
 * - Inicializar conexión a base de datos
 * - Iniciar el servidor
 */

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import { connectDB } from "./config/database.js";
import router from "./router/index.js";
import { applyAssociations } from "./models/associations.js";

// Crear instancia de Express
const app = express();

// ========== MIDDLEWARES GLOBALES ==========

// Habilitar CORS para permitir peticiones desde diferentes dominios
app.use(cors());

// Morgan: Registra todas las peticiones HTTP en la consola (modo desarrollo)
app.use(morgan("dev"));

// Body Parser: Parsea el cuerpo de las peticiones JSON
app.use(bodyParser.json());

// Express JSON: Middleware de Express para parsear JSON
app.use(express.json());

// Express URL Encoded: Parsea datos de formularios URL-encoded
app.use(express.urlencoded({ extended: true }));

// ========== RUTAS ==========
// Todas las rutas de la API están prefijadas con /api
app.use("/api", router);

// ========== MANEJO GLOBAL DE ERRORES ==========
/**
 * Middleware de error global que captura cualquier error no manejado
 * en las rutas y devuelve una respuesta de error consistente
 */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        error: "Error interno del servidor", 
        details: err.message 
    });
});

// ========== INICIALIZACIÓN DEL SERVIDOR ==========

// Obtener puerto desde variables de entorno o usar 3000 por defecto
const PORT = process.env.PORT || 3000;

// Iniciar servidor HTTP
app.listen(PORT, () => console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`));

// ========== INICIALIZACIÓN DE BASE DE DATOS ==========

/**
 * Conectar a la base de datos y aplicar las asociaciones entre modelos
 * Las asociaciones definen las relaciones (one-to-many, many-to-one, etc.)
 * entre las diferentes tablas de la base de datos
 */
connectDB().then(() => {
    // Aplicar todas las relaciones definidas en los modelos
    applyAssociations();
    console.log("✅ Conexión a BD establecida y relaciones configuradas");
}).catch((error) => {
    console.error("❌ Error al conectar a la base de datos:", error);
    process.exit(1);
});

export default app;

