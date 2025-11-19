/**
 * ========================================
 * SERVICE: ORDEN
 * ========================================
 * Capa de lógica de negocio para órdenes
 * Proporciona interfaz entre controladores y repositorio
 * 
 * Responsabilidades:
 * - Ejecutar operaciones CRUD de órdenes
 * - Manejo de errores con try/catch
 * - Retornar respuesta estandarizada {success, data, message}
 * 
 * Nota: La lógica de descuentos mayoristas se ejecuta en el repositorio
 * en el método createOrden() para garantizar integridad de datos
 */

import { OrdenRepository } from "../repositories/OrdenRepository.js";

export class OrdenService {
    // Instancia del repositorio para acceso a datos
    constructor() {
        this.ordenRepository = new OrdenRepository()
    }

    /**
     * Obtener todas las órdenes
     * Incluye usuario propietario y todos los productos de cada orden
     * 
     * @returns {Promise<Object>} Objeto con success y data
     * {success: true, data: Array de órdenes con productos}
     */
    async getOrdenes() {
        const ordenes = await this.ordenRepository.getOrdenes();
        return { success: true, data: ordenes };
    }

    /**
     * Obtener orden específica por ID
     * 
     * @param {Number} id - ID de la orden a obtener
     * @returns {Promise<Object>} Objeto con success y orden encontrada
     * {success: true, data: Object orden con productos}
     */
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

    /**
     * Crear nueva orden
     * 
     * IMPORTANTE: Esta función delega a createOrden() del repositorio
     * donde se realiza:
     * - Validación de usuario y dirección
     * - Validación de que usuario no sea admin
     * - Cálculo de precios
     * - Aplicación de descuentos mayoristas
     * - Creación de registros en tabla junction OrdenProducto
     * 
     * @param {Object} ordenData - Datos de la orden:
     *   {
     *     idUsuario: number,
     *     idDireccion: number,
     *     estado: string,
     *     productos: [{idProducto: number, cantidad: number}]
     *   }
     * 
     * @returns {Promise<Object>} Objeto con success y orden creada
     * {success: true, data: {orden: Object, productos: Array}}
     */
    async createOrden(ordenData) {
        const orden = await this.ordenRepository.createOrden(ordenData);
        return { success: true, data: orden };
    }

    /**
     * Actualizar orden existente
     * Típicamente para cambiar el estado de la orden
     * 
     * @param {Number} id - ID de la orden
     * @param {Object} ordenData - Datos a actualizar {estado, totalPago}
     * @returns {Promise<Object>} Objeto con success y orden actualizada
     * {success: true, data: Object orden}
     */
    async updateOrden(id, ordenData) {
        const orden = await this.ordenRepository.updateOrden(id, ordenData);
        return { success: true, data: orden };
    }

    /**
     * Eliminar orden
     * 
     * @param {Number} id - ID de la orden
     * @returns {Promise<Object>} Objeto con success y resultado
     * {success: true, data: true}
     */
    async deleteOrden(id) {
        const result = await this.ordenRepository.deleteOrden(id);
        return { success: true, data: result };
    }
}