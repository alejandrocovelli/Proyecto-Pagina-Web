import { ProductoRepository } from "../repositories/ProductoRepository.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export class ProductoService {
    constructor() {
        this.productoRepository = new ProductoRepository()
    }

    async getProductos(categoriaId) {
        const productos = await this.productoRepository.getProductos(categoriaId);
        return { success: true, data: productos };
    }

    async getProductoById(id) {
        const producto = await this.productoRepository.getProductoById(id);
        return { success: true, data: producto };
    }

    async createProducto(productoData, file) {
        let imagenUrl = null;
        if(file) {
            const upload = await cloudinary.uploader.upload(file.path, {
                folder: "productos",
            });
            imagenUrl = upload.secure_url;
            fs.unlinkSync(file.path); //eliminar archivo temporal
        }

        const productoFinal = {
            ...productoData,
            foto: imagenUrl
        };
        const producto = await this.productoRepository.createProducto(productoFinal);
        return { success: true, data: producto };
    }

    async updateProducto(id, productoData) {
        const producto = await this.productoRepository.updateProducto(id, productoData);
        return { success: true, data: producto };
    }

    async deleteProducto(id) {
        const result = await this.productoRepository.deleteProducto(id);
        return { success: true, data: result };
    }
}