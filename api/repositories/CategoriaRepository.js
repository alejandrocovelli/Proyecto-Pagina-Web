import { Categoria } from "../models/Categoria";

export class CategoriaRepository {
    async getCategorias() {
        return await sequelize.transaction(async (transaction) => {
            const categorias = await Categoria.findAll({
                attributes: [
                    "idCategoria",
                    "nombre",
                    "descripcion"
                ],
                transaction
            })
            if(!categorias) throw new Error("Categorías no encontradas")

            return categorias;
        })
    }
}