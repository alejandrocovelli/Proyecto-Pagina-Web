import { ProductoRepository } from "../repositories/ProductoRepository";

export class ProductoService {
    constructor() {
        this.productoRepository = new ProductoRepository()
    }

    async getProductos() {
        const productos = await this.productoRepository.getProductos();
        return { success: true, data: productos };
    }
}