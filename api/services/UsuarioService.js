import { UsuarioRepository } from "../repositories/UsuarioRepository.js";
import jwt from "jsonwebtoken";

export class UsuarioService {
    constructor() {
        this.usuarioRepository = new UsuarioRepository();
    }

    async getUsuarios() {
        try {
            // Llamar al repository para obtener usuarios
            const users = await this.usuarioRepository.getUsuarios();
            
            // Retornar respuesta consistente
            return { success: true, data: users };
        } catch (error) {
            // Capturar y re-lanzar error con contexto
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    }

    async getUsuarioById(id) {
        try {
            // Validar que el ID sea válido
            if (!id || isNaN(id)) {
                throw new Error('ID de usuario inválido');
            }

            // Obtener usuario del repositorio
            const usuario = await this.usuarioRepository.getUsuarioById(id);
            
            // Retornar respuesta
            return { success: true, data: usuario };
        } catch (error) {
            throw new Error(`Error al obtener usuario: ${error.message}`);
        }
    }

    async createUsuario(usuarioData) {
        try {
            // El repositorio maneja:
            // - Validación de correo único
            // - Hash de contraseña
            const usuario = await this.usuarioRepository.createUsuario(usuarioData);
            console.log(usuario.dataValues);
            const token = jwt.sign(
                { 
                    idUsuario: usuario.dataValues.idUsuario,  // ID del usuario
                    tipo: usuario.dataValues.tipo              // Tipo/rol del usuario
                },
                process.env.JWT_SECRET,          // Clave secreta para firmar
                { expiresIn: "1h" }              // Token válido por 1 hora
            );
            console.log(token);
            return { success: true, token, data: usuario };
        } catch (error) {
            throw new Error(`Error al crear usuario: ${error.message}`);
        }
    }

    async updateUsuario(id, usuarioData) {
        try {
            // Validar ID
            if (!id || isNaN(id)) {
                throw new Error('ID de usuario inválido');
            }

            // Actualizar usuario
            const usuario = await this.usuarioRepository.updateUsuario(id, usuarioData);
            
            return { success: true, data: usuario };
        } catch (error) {
            throw new Error(`Error al actualizar usuario: ${error.message}`);
        }
    }

    async deleteUsuario(id) {
        try {
            // Validar ID
            if (!id || isNaN(id)) {
                throw new Error('ID de usuario inválido');
            }

            // Eliminar usuario
            await this.usuarioRepository.deleteUsuario(id);
            
            return { success: true, message: "Usuario eliminado correctamente" };
        } catch (error) {
            throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
    }
}