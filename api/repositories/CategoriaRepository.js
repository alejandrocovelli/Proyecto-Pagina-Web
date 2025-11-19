import { Categoria } from "../models/Categoria.js";
import { sequelize } from "../config/database.js";
import { Producto } from "../models/Producto.js";

export class CategoriaRepository {
    async getCategorias() {
        return await sequelize.transaction(async (transaction) => {
            // Obtener todas las categorías
            const categorias = await Categoria.findAll({
                attributes: [
                    "idCategoria",
                    "nombre"
                ],
                include: [
                    {
                        model: Producto,
                        as: "productos",
                        attributes: ["idProducto", "nombre", "foto", "precio"],
                        separate: true,
                        limit: 1
                    }
                ],
                transaction
            })
            if(!categorias) throw new Error("Categorías no encontradas")

            return categorias;
        })
    }

    async getCategoriaById(id) {
        return await sequelize.transaction(async (transaction) => {
            // Buscar categoría por ID
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
            // Crear nueva categoría
            const categoria = await Categoria.create(categoriaData, { transaction })
            if(!categoria) throw new Error("Error al crear la categoría")

            return categoria;
        })
    }

    async updateCategoria(id, categoriaData) {
        return await sequelize.transaction(async (transaction) => {
            // Buscar categoría
            const categoria = await Categoria.findByPk(id, { transaction })
            if(!categoria) throw new Error("Categoría no encontrada")

            // Actualizar categoría
            await categoria.update(categoriaData, { transaction })
            return categoria;
        })
    }

    async deleteCategoria(id) {
        return await sequelize.transaction(async (transaction) => {
            // Buscar categoría
            const categoria = await Categoria.findByPk(id, { transaction })
            if(!categoria) throw new Error("Categoría no encontrada")

            // Eliminar categoría
            await categoria.destroy({ transaction })
            return true;
        })
    }
}