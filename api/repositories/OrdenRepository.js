import { Orden } from "../models/Orden";
import { Usuario } from "../models/Usuario";
import { OrdenProducto } from "../models/OrdenProducto";
import { Producto } from "../models/Producto";

export class OrdenRepository {
    async getOrdenes() {
        return await sequelize.transaction(async (transaction) => {
            const ordenes = await Orden.findAll({
                attributes: [
                    "idOrden",
                    "fecha",
                    "total",
                    "estado"
                ],
                include: [
                    {
                        model: Usuario,
                        as: "usuario",
                        attributes: ["idUsuario", "nombre"]
                    },
                    {
                        model: OrdenProducto,
                        as: "ordenesProductos",
                        include: [
                            {
                                model: Producto,
                                as: "producto"
                            }
                        ]
                    }
                ],
                transaction
            })
            if(!ordenes) throw new Error("Órdenes no encontradas")

            return ordenes;
        })
    }
}