import { DireccionRepository } from "../repositories/DireccionRepository.js";

export class DireccionService {
    // Instancia del repositorio para acceso a datos
    constructor() {
        this.direccionRepository = new DireccionRepository()
    }

    async getDirecciones(idUsuario) {
        const direcciones = await this.direccionRepository.getDirecciones(idUsuario);
        return { success: true, data: direcciones };
    }

    async getDireccionById(id) {
        const direccion = await this.direccionRepository.getDireccionById(id);
        return { success: true, data: direccion };
    }

    async createDireccion(direccionData) {
        const direccion = await this.direccionRepository.createDireccion(direccionData);
        return { success: true, data: direccion };
    }

    async updateDireccion(id, direccionData) {
        const direccion = await this.direccionRepository.updateDireccion(id, direccionData);
        return { success: true, data: direccion };
    }

    async deleteDireccion(id) {
        const result = await this.direccionRepository.deleteDireccion(id);
        return { success: true, data: result };
    }
}