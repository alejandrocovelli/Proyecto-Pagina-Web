import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario.js";

export class AuthService {
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
