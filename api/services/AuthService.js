/**
 * ========================================
 * SERVICE: AUTENTICACION
 * ========================================
 * Capa de lógica de negocio para autenticación
 * Maneja el proceso de login y generación de tokens JWT
 * 
 * Responsabilidades:
 * - Verificar credenciales del usuario
 * - Validar contraseña contra hash
 * - Generar tokens JWT
 * - Gestionar sesiones de usuario
 * 
 * Flujo:
 * 1. Usuario envía correo y contraseña
 * 2. Se busca usuario por correo en la BD
 * 3. Se compara contraseña con hash usando bcrypt
 * 4. Si es válida, se genera token JWT
 * 5. Se retorna token y datos del usuario
 */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario.js";

export class AuthService {
    /**
     * Realizar login de usuario
     * Verifica credenciales y genera token JWT
     * 
     * @param {String} correo - Email del usuario
     * @param {String} contraseña - Contraseña en texto plano
     * 
     * @returns {Promise<Object>} Objeto con token y datos del usuario
     * @throws {Error} Si credenciales son inválidas
     * 
     * Flujo:
     * 1. Buscar usuario por correo
     * 2. Verificar que exista
     * 3. Comparar contraseña con hash
     * 4. Generar token JWT con datos del usuario
     * 5. Retornar token (válido por 1 hora)
     */
    async login(correo, contraseña) {
        // Buscar usuario por correo en la base de datos
        const user = await Usuario.findOne({ where: { correo } });
        
        // Si no existe el usuario, lanzar error
        if (!user) throw new Error("Usuario no encontrado");

        // Comparar contraseña ingresada con hash almacenado
        // bcrypt.compare() verifica de forma segura sin exponer la contraseña
        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        
        // Si la contraseña no coincide, lanzar error
        if (!isMatch) throw new Error("Contraseña incorrecta");
        
        // Log para debugging (eliminar en producción)
        console.log(process.env.JWT_SECRET)
        
        /**
         * Generar token JWT
         * Payload: datos del usuario que se codificarán en el token
         * Secret: clave privada para firmar el token
         * Options: configuración del token (expiración, etc.)
         */
        const token = jwt.sign(
            { 
                idUsuario: user.idUsuario,  // ID del usuario
                tipo: user.tipo              // Tipo/rol del usuario
            },
            process.env.JWT_SECRET,          // Clave secreta para firmar
            { expiresIn: "1h" }              // Token válido por 1 hora
        );

        // Retornar respuesta exitosa con token
        return { 
            success: true, 
            token, 
            user: {
                idUsuario: user.idUsuario,
                nombre: user.nombre,
                correo: user.correo,
                tipo: user.tipo
            }
        };
    }
}
