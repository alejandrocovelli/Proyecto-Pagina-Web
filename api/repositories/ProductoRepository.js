import { Producto } from "../models/Producto.js";
import { Categoria } from "../models/Categoria.js";
import { sequelize } from "../config/database.js";

export class ProductoRepository {
    async getProductos(categoriaId, limitProducts) {
        return await sequelize.transaction(async (transaction) => {
            let where = {}
            if(categoriaId){
                where.idCategoria = categoriaId;
            }
            const limit = limitProducts ? Number(limitProducts) : undefined;
            console.log(limit, where);
            // Buscar productos filtrados por categoría
            const productos = await Producto.findAll({
                where,
                attributes: [
                    "idProducto",
                    "nombre",
                    "precio",
                    "precioMayorista",
                    "foto"
                    // No incluir información sensible de la BD
                ],
                limit,
                // Incluir datos de la categoría relacionada
                include: [
                    {
                        model: Categoria,
                        as: "categoria",
                        attributes: ["idCategoria", "nombre"]
                    }
                ],
                transaction
            })
            console.log("Estos son los productos", productos);
            if(!productos) throw new Error("Productos no encontrados")

            return productos;
        })
    }

    async getProductoById(id) {
        return await sequelize.transaction(async (transaction) => {
            // Buscar producto por ID
            const producto = await Producto.findByPk(id, {
                attributes: [
                    "idProducto",
                    "nombre",
                    "precio",
                    "precioMayorista",
                    "foto"
                ],
                // Incluir categoría
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

    /**
     * Crear un nuevo producto
     * 
     * @param {Object} productoData - Datos del nuevo producto
     * @param {String} productoData.nombre - Nombre del producto
     * @param {Number} productoData.precio - Precio al público (centavos)
     * @param {String} productoData.precioMayorista - Precio mayorista
     * @param {String} productoData.foto - URL de la imagen (opcional)
     * @param {Number} productoData.idCategoria - ID de la categoría
     * 
     * @returns {Promise<Object>} Producto creado
     * @throws {Error} Si hay error en la creación
     */
    async createProducto(productoData) {
        return await sequelize.transaction(async (transaction) => {
            // Crear nuevo producto
            const producto = await Producto.create(productoData, { transaction })
            if(!producto) throw new Error("Error al crear el producto")

            return producto;
        })
    }

    async updateProducto(id, productoData) {
        return await sequelize.transaction(async (transaction) => {
            // Buscar producto
            const producto = await Producto.findByPk(id, { transaction })
            if(!producto) throw new Error("Producto no encontrado")

            // Actualizar producto
            await producto.update(productoData, { transaction })
            return producto;
        })
    }

    async deleteProducto(id) {
        return await sequelize.transaction(async (transaction) => {
            // Buscar producto
            const producto = await Producto.findByPk(id, { transaction })
            if(!producto) throw new Error("Producto no encontrado")

            // Eliminar producto
            await producto.destroy({ transaction })
            return true;
        })
    }
}