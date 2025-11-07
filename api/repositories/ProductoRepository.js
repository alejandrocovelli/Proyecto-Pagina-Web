import { Producto } from "../models/Producto.js";
import { Categoria } from "../models/Categoria.js";
import { sequelize } from "../config/database.js";

export class ProductoRepository {
    async getProductos() {
        return await sequelize.transaction(async (transaction) => {
            const productos = await Producto.findAll({
                attributes: [
                    "idProducto",
                    "nombre",
                    "precio",
                    "precioMayorista",
                    "foto"
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

    async getProductoById(id) {
        return await sequelize.transaction(async (transaction) => {
            const producto = await Producto.findByPk(id, {
                attributes: [
                    "idProducto",
                    "nombre",
                    "precio",
                    "precioMayorista",
                    "foto"
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
            if(!producto) throw new Error("Producto no encontrado")

            return producto;
        })
    }

    async createProducto(productoData) {
        return await sequelize.transaction(async (transaction) => {
            const producto = await Producto.create(productoData, { transaction })
            if(!producto) throw new Error("Error al crear el producto")

            return producto;
        })
    }

    async updateProducto(id, productoData) {
        return await sequelize.transaction(async (transaction) => {
            const producto = await Producto.findByPk(id, { transaction })
            if(!producto) throw new Error("Producto no encontrado")

            await producto.update(productoData, { transaction })
            return producto;
        })
    }

    async deleteProducto(id) {
        return await sequelize.transaction(async (transaction) => {
            const producto = await Producto.findByPk(id, { transaction })
            if(!producto) throw new Error("Producto no encontrado")

            await producto.destroy({ transaction })
            return true;
        })
    }
}