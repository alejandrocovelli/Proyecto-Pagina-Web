import { Producto } from "../models/Producto";
import { Categoria } from "../models/Categoria";

export class ProductoRepository {
    async getProductos() {
        return await sequelize.transaction(async (transaction) => {
            const productos = await Producto.findAll({
                attributes: [
                    "idProducto",
                    "nombre",
                    "descripcion",
                    "precio",
                    "stock",
                    "imagen"
                ],
                include: [
                    {
                        model: Categoria,
                        as: "categoria",
                        attributes: ["idCategoria", "nombre"]
                    }
                ],
                transaction
            })
            if(!productos) throw new Error("Productos no encontrados")

            return productos;
        })
    }
}