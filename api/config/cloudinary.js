/**
 * ========================================
 * CONFIGURACIÓN DE CLOUDINARY
 * ========================================
 * Este archivo configura la conexión con Cloudinary, un servicio en la nube
 * para almacenar, gestionar y servir imágenes y videos.
 * 
 * Responsabilidades:
 * - Cargar credenciales de Cloudinary desde variables de entorno
 * - Exportar instancia configurada para usarla en controladores y servicios
 * 
 * Cloudinary se utiliza para:
 * - Subir imágenes de productos
 * - Almacenar fotos de usuarios
 * - Generar URLs públicas de las imágenes
 * - Obtener transformaciones automáticas de imágenes
 */

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

/**
 * Configurar Cloudinary con las credenciales del archivo .env
 * 
 * Credenciales necesarias:
 * - CLOUDINARY_CLOUD_NAME: Nombre único de tu cuenta Cloudinary
 * - CLOUDINARY_API_KEY: Clave pública de API
 * - CLOUDINARY_API_SECRET: Clave privada de API (CONFIDENCIAL)
 */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Exportar instancia configurada para usar en toda la aplicación
export default cloudinary;
