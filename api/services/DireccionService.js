import { DireccionRepository } from "../repositories/DireccionRepository";

export class DireccionService {
    constructor() {
        this.direccionRepository = new DireccionRepository()
    }

    async getDirecciones() {
        const direcciones = await this.direccionRepository.getDirecciones();
        return { success: true, data: direcciones };
    }
}