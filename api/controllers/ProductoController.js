import { ProductoService } from "../services/ProductoService.js";

const productoService = new ProductoService();

export class ProductoController {
    static async getProductos(req, res) {
        try {
            const { idCategoria } = req.body;
            const result = await productoService.getProductos(idCategoria)
            if(!result) {
                res.status(400).json({ error: "Error al listar productos", result})
            }
            res.status(200).json({mensaje: "Productos listados correctamente", result})
        } catch (error) {
            console.error("Error en getProductos:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    static async getProductoById(req, res) {
        try {
            const { id } = req.params;
            const result = await productoService.getProductoById(id)
            if(!result) {
                return res.status(404).json({ error: "Producto no encontrado" })
            }
            res.status(200).json({mensaje: "Producto encontrado", result})
        } catch (error) {
            console.error("Error en getProductoById:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    static async createProducto(req, res) {
        try {
            const result = await productoService.createProducto(req.body, req.file);
            if(!result) {
                return res.status(400).json({ error: "Error al crear el producto" })
            }
            res.status(201).json({mensaje: "Producto creado correctamente", result})
        } catch (error) {
            console.error("Error en createProducto:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    static async updateProducto(req, res) {
        try {
            const { id } = req.params;
            const result = await productoService.updateProducto(id, req.body)
            if(!result) {
                return res.status(404).json({ error: "Producto no encontrado" })
            }
            res.status(200).json({mensaje: "Producto actualizado correctamente", result})
        } catch (error) {
            console.error("Error en updateProducto:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    static async deleteProducto(req, res) {
        try {
            const { id } = req.params;
            const result = await productoService.deleteProducto(id)
            if(!result) {
                return res.status(404).json({ error: "Producto no encontrado" })
            }
            res.status(200).json({mensaje: "Producto eliminado correctamente"})
        } catch (error) {
            console.error("Error en deleteProducto:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }
}