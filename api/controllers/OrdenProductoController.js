import { OrdenProductoService } from "../services/OrdenProductoService";

const ordenProductoService = new OrdenProductoService();

export class OrdenProductoController {
    static async getOrdenesProductos(req, res) {
        try {
            const result = await ordenProductoService.getOrdenesProductos()
            if(!result) {
                res.status(400).json({ error: "Error al listar órdenes-productos", result})
            }
            res.status(200).json({mensaje: "Órdenes-productos listados correctamente", result})
        } catch (error) {
            console.error("Error en getOrdenesProductos:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }
}