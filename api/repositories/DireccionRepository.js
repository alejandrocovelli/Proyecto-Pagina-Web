import { Direccion } from "../models/Direccion";
import { Usuario } from "../models/Usuario";

export class DireccionRepository {
    async getDirecciones() {
        return await sequelize.transaction(async (transaction) => {
            const direcciones = await Direccion.findAll({
                attributes: [
                    "idDireccion",
                    "calle",
                    "numero",
                    "colonia",
                    "codigoPostal",
                    "ciudad",
                    "estado"
                ],
                include: [
                    {
                        model: Usuario,
                        as: "usuario",
                        attributes: ["idUsuario", "nombre"]
                    }
                ],
                transaction
            })
            if(!direcciones) throw new Error("Direcciones no encontradas")

            return direcciones;
        })
    }
}