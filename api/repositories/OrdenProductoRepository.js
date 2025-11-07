import { OrdenProducto } from "../models/OrdenProducto";
import { Orden } from "../models/Orden";
import { Producto } from "../models/Producto";

export class OrdenProductoRepository {
    async getOrdenesProductos() {
        return await sequelize.transaction(async (transaction) => {
            const ordenesProductos = await OrdenProducto.findAll({
                attributes: [
                    "idOrdenProducto",
                    "cantidad",
                    "precio"
                ],
                include: [
                    {
                        model: Orden,
                        as: "orden",
                        attributes: ["idOrden", "fecha"]
                    },
                    {
                        model: Producto,
                        as: "producto",
                        attributes: ["idProducto", "nombre", "precio"]
                    }
                ],
                transaction
            })
            if(!ordenesProductos) throw new Error("Órdenes-productos no encontrados")

            return ordenesProductos;
        })
    }
}