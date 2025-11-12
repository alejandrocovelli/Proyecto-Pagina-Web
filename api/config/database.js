/**
 * ========================================
 * CONFIGURACIÓN DE BASE DE DATOS
 * ========================================
 * Este archivo configura la conexión con MySQL usando Sequelize ORM.
 * Define todos los parámetros necesarios para conectar con la base de datos
 * y proporciona la función de conexión para inicializar la BD.
 * 
 * Responsabilidades:
 * - Cargar variables de entorno
 * - Crear instancia de Sequelize
 * - Establecer conexión con MySQL
 * - Validar credenciales y conexión
 */

import { Sequelize } from "sequelize"
import dotenv from 'dotenv';

// Cargar variables de entorno del archivo .env
dotenv.config();

/**
 * Log de las variables de entorno para debugging
 * Nota: En producción, no mostrar información sensible como contraseñas
 */
console.log("🧩 ENV:", {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASS ? "***" : "no definida",
  DB_NAME: process.env.DB_NAME,
  DB_DIALECT: process.env.DB_DIALECT,
});

/**
 * Crear instancia de Sequelize
 * Sequelize es un ORM (Object-Relational Mapping) que facilita
 * la interacción con la base de datos MySQL usando objetos JavaScript
 */
export const sequelize = new Sequelize({
    dialect: "mysql",                          // DBMS utilizado
    host: process.env.DB_HOST,                 // Servidor MySQL
    port: process.env.DB_PORT || 3306,         // Puerto MySQL (default 3306)
    username: process.env.DB_USER,             // Usuario MySQL
    password: process.env.DB_PASS,             // Contraseña MySQL
    database: process.env.DB_NAME,             // Nombre de la base de datos
    // logging: false,                          // Descomenta para ocultar logs SQL
});

/**
 * Función para conectar a la base de datos
 * Verifica que la conexión sea exitosa antes de continuar
 * 
 * @returns {Promise<void>}
 * @throws {Error} Si hay problemas con la conexión
 */
export const connectDB = async () => {
    try {
        // Intentar autenticar la conexión con la BD
        await sequelize.authenticate();
        console.log("✅ Conexión a la base de datos establecida correctamente.");
        
        // Nota: Las asociaciones se configuran en el archivo associations.js
        // y se aplican en app.js después de conectar
    } catch (error) {
        console.error("🚀 ~ connectDB ~ error:", error);
        throw error;
    }
}
