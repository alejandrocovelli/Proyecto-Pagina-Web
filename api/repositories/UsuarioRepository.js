import { sequelize } from "../config/database.js"
import { Direccion } from "../models/Direccion.js"
import { Usuario } from "../models/Usuario.js"

export class UsuarioRepository {
    async getUsuarios() {
        return await sequelize.transaction(async (transaction) => {
            const usuarios = await Usuario.findAll({
                attributes: [
                    "idUsuario",
                    "nombre",
                    "correo",
                    "tipo"
                ],
                include: [
                    {
                        model: Direccion,
                        as: "direcciones",
                    }
                ],
                transaction
            })
            if(!usuarios) throw new Error("Usuarios no encontrados")

            return usuarios;
        })
    }
}