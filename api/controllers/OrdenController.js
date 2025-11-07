import { OrdenService } from "../services/OrdenService";

const ordenService = new OrdenService();

export class OrdenController {
    static async getOrdenes(req, res) {
        try {
            const result = await ordenService.getOrdenes()
            if(!result) {
                res.status(400).json({ error: "Error al listar órdenes", result})
            }
            res.status(200).json({mensaje: "Órdenes listadas correctamente", result})
        } catch (error) {
            console.error("Error en getOrdenes:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }
}