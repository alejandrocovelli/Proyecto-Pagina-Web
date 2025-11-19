import { OrdenService } from "../services/OrdenService.js";

// Instancia del servicio de órdenes
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

    static async getOrdenById(req, res) {
        try {
            const { id } = req.params;
            const result = await ordenService.getOrdenById(id)
            if(!result) {
                return res.status(404).json({ error: "Orden no encontrada" })
            }
            res.status(200).json({mensaje: "Orden encontrada", result})
        } catch (error) {
            console.error("Error en getOrdenById:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    static async getCarrito(req, res) {
        try {
            const { idUsuario } = req.params;
            const result = await ordenService.getCarrito(idUsuario)
            if (result && result.data === null) {
                return res.status(404).json({ mensaje: "Carrito no encontrado", result: null });
            }
            res.status(200).json({mensaje: "Carrito encontrado", result})
        } catch (error) {
            console.error("Error en getCarrito:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    static async createOrden(req, res) {
        try {
            console.log(req.body);
            const result = await ordenService.createOrden(req.body)
            if(!result) {
                return res.status(400).json({ error: "Error al crear la orden" })
            }
            res.status(201).json({mensaje: "Orden creada correctamente", result})
        } catch (error) {
            console.error("Error en createOrden:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    static async updateOrden(req, res) {
        try {
            const { idOrden } = req.params;
            const result = await ordenService.updateOrden(idOrden, req.body)
            if(!result) {
                return res.status(404).json({ error: "Orden no encontrada" })
            }
            res.status(200).json({mensaje: "Orden actualizada correctamente", result})
        } catch (error) {
            console.error("Error en updateOrden:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    static async deleteOrden(req, res) {
        try {
            const { id } = req.params;
            const result = await ordenService.deleteOrden(id)
            if(!result) {
                return res.status(404).json({ error: "Orden no encontrada" })
            }
            res.status(200).json({mensaje: "Orden eliminada correctamente"})
        } catch (error) {
            console.error("Error en deleteOrden:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }
}