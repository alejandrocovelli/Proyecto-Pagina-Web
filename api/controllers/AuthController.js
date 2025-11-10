

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
}