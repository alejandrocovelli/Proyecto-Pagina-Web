/**
 * ========================================
 * MIDDLEWARE DE AUTENTICACIÓN (JWT)
 * ========================================
 * Verifica que el usuario esté autenticado validando el token JWT
 * Se aplica a rutas protegidas para asegurar que solo usuarios autenticados
 * puedan acceder a ciertos recursos.
 * 
 * Responsabilidades:
 * - Extraer el token del header Authorization
 * - Validar que el token sea válido
 * - Verificar que el token no esté expirado
 * - Inyectar datos del usuario en req.user para usar en rutas
 * - Retornar errores apropiados si el token es inválido
 * 
 * Flujo de autenticación:
 * 1. Cliente envía petición con header: Authorization: "Bearer <token>"
 * 2. Este middleware extrae el token
 * 3. Valida el token con la clave secreta (JWT_SECRET)
 * 4. Si es válido, extrae los datos del usuario y los pone en req.user
 * 5. Si es inválido o expirado, retorna error 401 o 403
 */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario.js";

/**
 * Middleware de autenticación JWT
 * Debe usarse en rutas que requieren autenticación
 * 
 * Ejemplo de uso en rutas:
 * router.get("/perfil", AuthMiddleware, controller.getPerfil);
 * 
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función para pasar al siguiente middleware
 * 
 * @returns {void} - Llama a next() si el token es válido, o retorna error
 */
export const AuthMiddleware = (req, res, next) => {
    try {
        // Obtener el header Authorization
        // Formato esperado: "Bearer <token>"
        const authHeader = req.headers.authorization;

        // Verificar que el header exista y comience con "Bearer "
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Token no proporcionado" })
        }
        
        // Extraer el token quitando la palabra "Bearer "
        const token = authHeader.split(" ")[1];
        
        /**
         * Verificar y decodificar el token JWT
         * jwt.verify valida:
         * - La firma del token (que fue creado con JWT_SECRET)
         * - Que el token no esté expirado
         * - Que el formato sea válido
         */
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Si el token es válido, guardar los datos del usuario en req.user
        // Estos datos se pueden usar en los controladores posteriormente
        req.user = decoded;
        
        // Continuar con el siguiente middleware o controlador
        next();
        
    } catch (error) {
        // Manejo específico de diferentes errores de JWT
        
        // Error: Token expirado
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expirado" });
        }
        
        // Error: Token inválido o malformado
        if (error.name === "JsonWebTokenError") {
            return res.status(403).json({ error: "Token inválido" });
        }
        
        // Otros errores de autenticación
        return res.status(500).json({ error: "Error en autenticación" });
    }
}