import { UsuarioService } from "../services/UsuarioService.js";

const usuarioService = new UsuarioService();

export class UsuarioController {
    static async getUsuarios(req, res) {
        try {
            const result = await usuarioService.getUsuarios();
            if(!result.success) {
                return res.status(400).json({ 
                    error: "Error al listar usuarios"
                });
            }
            return res.status(200).json({
                mensaje: "Usuarios listados correctamente",
                data: result.data
            });
        } catch (error) {
            console.error("Error en getUsuarios:", error);
            return res.status(500).json({
                error: "Error interno del servidor"
            });
        }
    }

    static async getUsuarioById(req, res) {
        try {
            const result = await usuarioService.getUsuarioById(req.params.id);
            if(!result.success) {
                return res.status(404).json({ 
                    error: "Usuario no encontrado"
                });
            }
            return res.status(200).json({
                mensaje: "Usuario obtenido correctamente",
                data: result.data
            });
        } catch (error) {
            console.error("Error en getUsuarioById:", error);
            if (error.message.includes("no encontrado")) {
                return res.status(404).json({
                    error: error.message
                });
            }
            return res.status(500).json({
                error: "Error interno del servidor"
            });
        }
    }

    static async createUsuario(req, res) {
        try {
            const result = await usuarioService.createUsuario(req.body);
            if(!result.success) {
                return res.status(400).json({ 
                    error: "Error al crear usuario"
                });
            }
            return res.status(201).json({
                mensaje: "Usuario creado correctamente",
                data: result.data
            });
        } catch (error) {
            console.error("Error en createUsuario:", error);
            if (error.message.includes("Ya existe")) {
                return res.status(400).json({
                    error: error.message
                });
            }
            return res.status(500).json({
                error: "Error interno del servidor"
            });
        }
    }

    static async updateUsuario(req, res) {
        try {
            const result = await usuarioService.updateUsuario(req.params.id, req.body);
            if(!result.success) {
                return res.status(400).json({ 
                    error: "Error al actualizar usuario"
                });
            }
            return res.status(200).json({
                mensaje: "Usuario actualizado correctamente",
                data: result.data
            });
        } catch (error) {
            console.error("Error en updateUsuario:", error);
            if (error.message.includes("no encontrado")) {
                return res.status(404).json({
                    error: error.message
                });
            }
            if (error.message.includes("Ya existe")) {
                return res.status(400).json({
                    error: error.message
                });
            }
            return res.status(500).json({
                error: "Error interno del servidor"
            });
        }
    }

    static async deleteUsuario(req, res) {
        try {
            const result = await usuarioService.deleteUsuario(req.params.id);
            if(!result.success) {
                return res.status(400).json({ 
                    error: "Error al eliminar usuario"
                });
            }
            return res.status(200).json({
                mensaje: "Usuario eliminado correctamente"
            });
        } catch (error) {
            console.error("Error en deleteUsuario:", error);
            if (error.message.includes("no encontrado")) {
                return res.status(404).json({
                    error: error.message
                });
            }
            return res.status(500).json({
                error: "Error interno del servidor"
            });
        }
    }
}