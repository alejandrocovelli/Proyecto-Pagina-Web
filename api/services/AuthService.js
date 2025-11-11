import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario.js";

export class AuthService {
    async login(correo, contraseña) {
        const user = await Usuario.findOne({ where: { correo } });
        if (!user) throw new Error("Usuario no encontrado");

        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (!isMatch) throw new Error("Contraseña incorrecta");
        console.log(process.env.JWT_SECRET)
        const token = jwt.sign(
            { idUsuario: user.idUsuario, tipo: user.tipo },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return { success: true, token, user };
    }
}
