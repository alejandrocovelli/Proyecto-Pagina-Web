import { OrdenProductoRepository } from "../repositories/OrdenProductoRepository.js";

export class OrdenProductoService {
    constructor() {
        this.ordenProductoRepository = new OrdenProductoRepository()
    }

    async getOrdenesProductos() {
        const ordenesProductos = await this.ordenProductoRepository.getOrdenesProductos();
        return { success: true, data: ordenesProductos };
    }

    async getOrdenProductoById(id) {
        const ordenProducto = await this.ordenProductoRepository.getOrdenProductoById(id);
        return { success: true, data: ordenProducto };
    }

    async createOrdenProducto(ordenProductoData) {
        const ordenProducto = await this.ordenProductoRepository.createOrdenProducto(ordenProductoData);
        return { success: true, data: ordenProducto };
    }

    async updateOrdenProducto(id, ordenProductoData) {
        const ordenProducto = await this.ordenProductoRepository.updateOrdenProducto(id, ordenProductoData);
        return { success: true, data: ordenProducto };
    }

    async deleteOrdenProducto(id) {
        const result = await this.ordenProductoRepository.deleteOrdenProducto(id);
        return { success: true, data: result };
    }
}