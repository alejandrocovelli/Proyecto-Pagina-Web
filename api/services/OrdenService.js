import { OrdenRepository } from "../repositories/OrdenRepository";

export class OrdenService {
    constructor() {
        this.ordenRepository = new OrdenRepository()
    }

    async getOrdenes() {
        const ordenes = await this.ordenRepository.getOrdenes();
        return { success: true, data: ordenes };
    }
}