import { OrdenProductoRepository } from "../repositories/OrdenProductoRepository";

export class OrdenProductoService {
    constructor() {
        this.ordenProductoRepository = new OrdenProductoRepository()
    }

    async getOrdenesProductos() {
        const ordenesProductos = await this.ordenProductoRepository.getOrdenesProductos();
        return { success: true, data: ordenesProductos };
    }
}