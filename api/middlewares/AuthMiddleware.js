import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario.js";

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