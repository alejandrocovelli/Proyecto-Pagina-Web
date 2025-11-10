import { ProductoRepository } from "../repositories/ProductoRepository.js";

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

    async createProducto(productoData) {
        const producto = await this.productoRepository.createProducto(productoData);
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