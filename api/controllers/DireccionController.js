import { DireccionService } from "../services/DireccionService.js";

// Instancia del servicio de direcciones
const direccionService = new DireccionService();

export class DireccionController {
    static async getDirecciones(req, res) {
        try {
            const { idUsuario } = req.user;
            const result = await direccionService.getDirecciones(idUsuario)
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

    static async getDireccionById(req, res) {
        try {
            const { id } = req.params;
            const result = await direccionService.getDireccionById(id)
            if(!result) {
                return res.status(404).json({ error: "Dirección no encontrada" })
            }
            res.status(200).json({mensaje: "Dirección encontrada", result})
        } catch (error) {
            console.error("Error en getDireccionById:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    static async createDireccion(req, res) {
        try {
            const result = await direccionService.createDireccion(req.body)
            if(!result) {
                return res.status(400).json({ error: "Error al crear la dirección" })
            }
            res.status(201).json({mensaje: "Dirección creada correctamente", result})
        } catch (error) {
            console.error("Error en createDireccion:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    static async updateDireccion(req, res) {
        try {
            const { id } = req.params;
            const result = await direccionService.updateDireccion(id, req.body)
            if(!result) {
                return res.status(404).json({ error: "Dirección no encontrada" })
            }
            res.status(200).json({mensaje: "Dirección actualizada correctamente", result})
        } catch (error) {
            console.error("Error en updateDireccion:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    static async deleteDireccion(req, res) {
        try {
            const { id } = req.params;
            const result = await direccionService.deleteDireccion(id)
            if(!result) {
                return res.status(404).json({ error: "Dirección no encontrada" })
            }
            res.status(200).json({mensaje: "Dirección eliminada correctamente"})
        } catch (error) {
            console.error("Error en deleteDireccion:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }
}