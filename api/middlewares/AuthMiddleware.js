import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/Usuario.js";

export const AuthMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Token no proporcionado" })
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredEror") {
            return res.status(401).json({ error: "Token expirado" });
        }
        if (error.name === "JsonWebTokenErrir") {
            return res.status(403).json({ error: "Token invalido" });
        }
        return res.status(500).json({ error: "Error en autenticación" });
    }
}