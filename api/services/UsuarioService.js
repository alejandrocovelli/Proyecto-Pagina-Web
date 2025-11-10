import { UsuarioRepository } from "../repositories/UsuarioRepository.js";

export class UsuarioService {
    constructor() {
        this.usuarioRepository = new UsuarioRepository();
    }

    async getUsuarios() {
        try {
            const users = await this.usuarioRepository.getUsuarios();
            return { success: true, data: users };
        } catch (error) {
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    }

    async getUsuarioById(id) {
        try {
            const usuario = await this.usuarioRepository.getUsuarioById(id);
            return { success: true, data: usuario };
        } catch (error) {
            throw new Error(`Error al obtener usuario: ${error.message}`);
        }
    }

    async createUsuario(usuarioData) {
        try {
            const usuario = await this.usuarioRepository.createUsuario(usuarioData);
            return { success: true, data: usuario };
        } catch (error) {
            throw new Error(`Error al crear usuario: ${error.message}`);
        }
    }

    async updateUsuario(id, usuarioData) {
        try {
            const usuario = await this.usuarioRepository.updateUsuario(id, usuarioData);
            return { success: true, data: usuario };
        } catch (error) {
            throw new Error(`Error al actualizar usuario: ${error.message}`);
        }
    }

    async deleteUsuario(id) {
        try {
            await this.usuarioRepository.deleteUsuario(id);
            return { success: true, message: "Usuario eliminado correctamente" };
        } catch (error) {
            throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
    }
}