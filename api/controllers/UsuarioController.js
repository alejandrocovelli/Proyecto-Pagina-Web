import { UsuarioService } from "../services/UsuarioService.js";

const usuarioService = new UsuarioService();

export class UsuarioController {
    static async getUsuarios(req, res) {
        try {
            const result = await usuarioService.getUsuarios()
            if(!result) {
                res.status(400).json({ error: "Error al listar usuarios", result})
            }
            res.status(200).json({mensaje: "Usuarios listados correctamente", result})
        } catch (error) {
            console.error("Error en getUsuarios:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }
}