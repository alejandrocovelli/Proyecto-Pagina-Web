import { Usuario } from "../models/Usuario.js";
import { AuthService } from "../services/AuthService.js";

// Crear instancia del servicio
const authService = new AuthService();

export class AuthController {
    
    static async login(req, res) {
        try {
            // Extraer credenciales del body
            const { correo, contraseña } = req.body;
            // Llamar al servicio para autenticar
            const result = await authService.login(correo, contraseña);
            console.log(result);
            // Retornar respuesta con token
            res.status(200).json(result);
        } catch (error) {
            // Retornar error de credenciales inválidas
            res.status(400).json({ error: error.message })
        }
    }

    static async me(req, res) {
        try {
            // req.user lo coloca AuthMiddleware al decodificar el JWT
            const tokenUser = req.user;

            if (!tokenUser) {
                return res.status(401).json({
                    mensaje: "Usuario no autenticado"
                });
            }

            // Buscar el usuario completo en la BD (sin devolver la contraseña)
            const user = await Usuario.findByPk(tokenUser.idUsuario, {
                attributes: ["idUsuario", "nombre", "correo", "tipo"]
            });

            if (!user) {
                return res.status(404).json({ mensaje: "Usuario no encontrado" });
            }

            // Devolver el usuario completo
            res.status(200).json({
                mensaje: "Usuario autenticado",
                user
            });
        } catch (error) {
            console.error("Error en AuthController.me:", error);
            return res.status(500).json({
                error: "Error interno del servidor"
            });
        }
    }
}