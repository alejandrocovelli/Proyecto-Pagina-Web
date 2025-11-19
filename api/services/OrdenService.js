import { OrdenRepository } from "../repositories/OrdenRepository.js";

export class OrdenService {
    // Instancia del repositorio para acceso a datos
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

    async getCarrito(idUsuario) {
        try {
            const carrito = await this.ordenRepository.getCarrito(idUsuario);
            console.log(carrito);
            return { success: true, data: carrito };
        } catch (error) {
            // Si el repositorio indicó que no existe, devolvemos el objeto solicitado
            if (error && String(error.message).toLowerCase().includes('carrito no encontrado')) {
                return { mensaje: "Carrito no encontrado", data: null };
            }
            // Re-lanzar otros errores para que se manejen como 500
            throw error;
        }
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