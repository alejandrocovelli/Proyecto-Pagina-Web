import { Direccion } from "../models/Direccion"
import { Usuario } from "../models/Usuario"

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
                        as: "direccion",
                    }
                ],
                transaction
            })
            if(!usuarios) throw new Error("Usuarios no encontrados")

            return usuarios;
        })
    }
}