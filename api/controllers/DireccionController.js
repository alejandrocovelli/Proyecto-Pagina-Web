import { DireccionService } from "../services/DireccionService";

const direccionService = new DireccionService();

export class DireccionController {
    static async getDirecciones(req, res) {
        try {
            const result = await direccionService.getDirecciones()
            if(!result) {
                res.status(400).json({ error: "Error al listar direcciones", result})
            }
            res.status(200).json({mensaje: "Direcciones listadas correctamente", result})
        } catch (error) {
            console.error("Error en getDirecciones:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }
}