import { OrdenProductoService } from "../services/OrdenProductoService.js";

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

    static async getOrdenProductoById(req, res) {
        try {
            const { id } = req.params;
            const result = await ordenProductoService.getOrdenProductoById(id)
            if(!result) {
                return res.status(404).json({ error: "Orden-producto no encontrado" })
            }
            res.status(200).json({mensaje: "Orden-producto encontrado", result})
        } catch (error) {
            console.error("Error en getOrdenProductoById:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    static async createOrdenProducto(req, res) {
        try {
            const result = await ordenProductoService.createOrdenProducto(req.body)
            if(!result) {
                return res.status(400).json({ error: "Error al crear el orden-producto" })
            }
            res.status(201).json({mensaje: "Orden-producto creado correctamente", result})
        } catch (error) {
            console.error("Error en createOrdenProducto:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    static async updateOrdenProducto(req, res) {
        try {
            const { id } = req.params;
            const result = await ordenProductoService.updateOrdenProducto(id, req.body)
            if(!result) {
                return res.status(404).json({ error: "Orden-producto no encontrado" })
            }
            res.status(200).json({mensaje: "Orden-producto actualizado correctamente", result})
        } catch (error) {
            console.error("Error en updateOrdenProducto:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    static async deleteOrdenProducto(req, res) {
        try {
            const { id } = req.params;
            const result = await ordenProductoService.deleteOrdenProducto(id)
            if(!result) {
                return res.status(404).json({ error: "Orden-producto no encontrado" })
            }
            res.status(200).json({mensaje: "Orden-producto eliminado correctamente"})
        } catch (error) {
            console.error("Error en deleteOrdenProducto:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }
}