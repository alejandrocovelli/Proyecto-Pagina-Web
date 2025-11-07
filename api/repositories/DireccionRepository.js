import { Direccion } from "../models/Direccion.js";
import { Usuario } from "../models/Usuario.js";
import { sequelize } from "../config/database.js";

export class DireccionRepository {
    async getDirecciones() {
        return await sequelize.transaction(async (transaction) => {
            const direcciones = await Direccion.findAll({
                attributes: [
                    "idDireccion",
                    "direccion",
                    "ciudad",
                    "barrio"
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

    async getDireccionById(id) {
        return await sequelize.transaction(async (transaction) => {
            const direccion = await Direccion.findByPk(id, {
                attributes: [
                    "idDireccion",
                    "direccion",
                    "ciudad",
                    "barrio"
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
            if(!direccion) throw new Error("Dirección no encontrada")

            return direccion;
        })
    }

    async createDireccion(direccionData) {
        return await sequelize.transaction(async (transaction) => {
            const direccion = await Direccion.create(direccionData, { transaction })
            if(!direccion) throw new Error("Error al crear la dirección")

            return direccion;
        })
    }

    async updateDireccion(id, direccionData) {
        return await sequelize.transaction(async (transaction) => {
            const direccion = await Direccion.findByPk(id, { transaction })
            if(!direccion) throw new Error("Dirección no encontrada")

            await direccion.update(direccionData, { transaction })
            return direccion;
        })
    }

    async deleteDireccion(id) {
        return await sequelize.transaction(async (transaction) => {
            const direccion = await Direccion.findByPk(id, { transaction })
            if(!direccion) throw new Error("Dirección no encontrada")

            await direccion.destroy({ transaction })
            return true;
        })
    }
}