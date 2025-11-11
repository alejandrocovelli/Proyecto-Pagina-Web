import { AuthService } from "../services/AuthService.js";

const authService = new AuthService();

export class AuthController {
    static async login(req, res) {
        try {
            const { correo, contraseña } = req.body;
            const result = await authService.login(correo, contraseña);
            res.status(200).json(result);
        } catch(error) {
            res.status(400).json({ error: error.message })
        }
    }

    static async me(req, res) {
        try {
            const user = req.user;
            if (!user) return res.status(401).json({ mensaje: "Usuario no autenticado" });
            res.status(200).json({ mensaje: "Usuario autenticado", user })
        } catch (error) {
            return ApiResponse.error(res, error);
        }
    }
}