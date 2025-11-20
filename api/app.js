import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import { connectDB } from "./config/database.js";
import router from "./router/index.js";
import { applyAssociations } from "./models/associations.js";

// Crear instancia de Express
const app = express();

// CORS - configuración permisiva para Vercel
app.use((req, res, next) => {
    const origin = req.headers.origin;
    
    // Permitir todos los dominios de Vercel y localhost
    if (!origin || origin.includes('.vercel.app') || origin.includes('localhost')) {
        res.setHeader('Access-Control-Allow-Origin', origin || '*');
    }
    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    // Manejar preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    
    next();
});

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

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        error: "Error interno del servidor", 
        details: err.message 
    });
});

const PORT = process.env.PORT || 3000;

// Iniciar servidor HTTP
app.listen(PORT, () => console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`));

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

