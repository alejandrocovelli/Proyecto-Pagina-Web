import { OrdenProducto } from "../models/OrdenProducto.js";
import { Orden } from "../models/Orden.js";
import { Producto } from "../models/Producto.js";
import { sequelize } from "../config/database.js";

export class OrdenProductoRepository {
    async getOrdenesProductos() {
        return await sequelize.transaction(async (transaction) => {
            const ordenesProductos = await OrdenProducto.findAll({
                attributes: [
                    "idOrdenProducto",
                    "cantidad",
                    "precioUnidad",
                    "valorTotal"
                ],
                include: [
                    {
                        model: Orden,
                        as: "orden",
                        attributes: ["idOrden", "totalPago"]
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

    async getOrdenProductoById(id) {
        return await sequelize.transaction(async (transaction) => {
            const ordenProducto = await OrdenProducto.findByPk(id, {
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
            if(!ordenProducto) throw new Error("Orden-producto no encontrado")

            return ordenProducto;
        })
    }

    async createOrdenProducto(ordenProductoData) {
        return await sequelize.transaction(async (transaction) => {
            const ordenProducto = await OrdenProducto.create(ordenProductoData, { transaction })
            if(!ordenProducto) throw new Error("Error al crear el orden-producto")

            return ordenProducto;
        })
    }

    async updateOrdenProducto(id, ordenProductoData) {
        return await sequelize.transaction(async (transaction) => {
            const ordenProducto = await OrdenProducto.findByPk(id, { transaction })
            if(!ordenProducto) throw new Error("Orden-producto no encontrado")

            await ordenProducto.update(ordenProductoData, { transaction })
            return ordenProducto;
        })
    }

    async deleteOrdenProducto(id) {
        return await sequelize.transaction(async (transaction) => {
            const ordenProducto = await OrdenProducto.findByPk(id, { transaction })
            if(!ordenProducto) throw new Error("Orden-producto no encontrado")

            await ordenProducto.destroy({ transaction })
            return true;
        })
    }
}