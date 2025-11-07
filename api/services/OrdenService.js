import { OrdenRepository } from "../repositories/OrdenRepository.js";

export class OrdenService {
    constructor() {
        this.ordenRepository = new OrdenRepository()
    }

    async getOrdenes() {
        const ordenes = await this.ordenRepository.getOrdenes();
        return { success: true, data: ordenes };
    }

    async getOrdenById(id) {
        const orden = await this.ordenRepository.getOrdenById(id);
        return { success: true, data: orden };
    }

    async createOrden(ordenData) {
        const orden = await this.ordenRepository.createOrden(ordenData);
        return { success: true, data: orden };
    }

    async updateOrden(id, ordenData) {
        const orden = await this.ordenRepository.updateOrden(id, ordenData);
        return { success: true, data: orden };
    }

    async deleteOrden(id) {
        const result = await this.ordenRepository.deleteOrden(id);
        return { success: true, data: result };
    }
}