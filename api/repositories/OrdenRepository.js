import { Orden } from "../models/Orden.js";
import { Usuario } from "../models/Usuario.js";
import { OrdenProducto } from "../models/OrdenProducto.js";
import { Producto } from "../models/Producto.js";
import { sequelize } from "../config/database.js";

export class OrdenRepository {
    async getOrdenes() {
        return await sequelize.transaction(async (transaction) => {
            const ordenes = await Orden.findAll({
                attributes: [
                    "idOrden",
                    "estado",
                    "totalPago",
                ],
                include: [
                    {
                        model: Usuario,
                        as: "usuario",
                        attributes: ["idUsuario", "nombre"]
                    },
                    {
                        model: OrdenProducto,
                        as: "ordenProductos",
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

    async getOrdenById(id) {
        return await sequelize.transaction(async (transaction) => {
            const orden = await Orden.findByPk(id, {
                attributes: [
                    "idOrden",
                    "estado",
                    "totalPago",
                ],
                include: [
                    {
                        model: Usuario,
                        as: "usuario",
                        attributes: ["idUsuario", "nombre"]
                    },
                    {
                        model: OrdenProducto,
                        as: "ordenProductos",
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
            if(!orden) throw new Error("Orden no encontrada")

            return orden;
        })
    }

    async createOrden(ordenData) {
        return await sequelize.transaction(async (transaction) => {
            const orden = await Orden.create(ordenData, { transaction })
            if(!orden) throw new Error("Error al crear la orden")

            return orden;
        })
    }

    async updateOrden(id, ordenData) {
        return await sequelize.transaction(async (transaction) => {
            const orden = await Orden.findByPk(id, { transaction })
            if(!orden) throw new Error("Orden no encontrada")

            await orden.update(ordenData, { transaction })
            return orden;
        })
    }

    async deleteOrden(id) {
        return await sequelize.transaction(async (transaction) => {
            const orden = await Orden.findByPk(id, { transaction })
            if(!orden) throw new Error("Orden no encontrada")

            await orden.destroy({ transaction })
            return true;
        })
    }
}