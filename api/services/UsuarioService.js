import { UsuarioRepository } from "../repositories/UsuarioRepository.js";

export class UsuarioService {
    constructor() {
        this.usuarioRepository = new UsuarioRepository
    }

    async getUsuarios() {
        const users = await this.usuarioRepository.getUsuarios();
        return { success: true, data: users };
    }
}