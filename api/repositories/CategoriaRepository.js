import { Categoria } from "../models/Categoria.js";
import { sequelize } from "../config/database.js";

export class CategoriaRepository {
    async getCategorias() {
        return await sequelize.transaction(async (transaction) => {
            const categorias = await Categoria.findAll({
                attributes: [
                    "idCategoria",
                    "nombre"
                ],
                transaction
            })
            if(!categorias) throw new Error("Categorías no encontradas")

            return categorias;
        })
    }

    async getCategoriaById(id) {
        return await sequelize.transaction(async (transaction) => {
            const categoria = await Categoria.findByPk(id, {
                attributes: [
                    "idCategoria",
                    "nombre"
                ],
                transaction
            })
            if(!categoria) throw new Error("Categoría no encontrada")

            return categoria;
        })
    }

    async createCategoria(categoriaData) {
        return await sequelize.transaction(async (transaction) => {
            const categoria = await Categoria.create(categoriaData, { transaction })
            if(!categoria) throw new Error("Error al crear la categoría")

            return categoria;
        })
    }

    async updateCategoria(id, categoriaData) {
        return await sequelize.transaction(async (transaction) => {
            const categoria = await Categoria.findByPk(id, { transaction })
            if(!categoria) throw new Error("Categoría no encontrada")

            await categoria.update(categoriaData, { transaction })
            return categoria;
        })
    }

    async deleteCategoria(id) {
        return await sequelize.transaction(async (transaction) => {
            const categoria = await Categoria.findByPk(id, { transaction })
            if(!categoria) throw new Error("Categoría no encontrada")

            await categoria.destroy({ transaction })
            return true;
        })
    }
}