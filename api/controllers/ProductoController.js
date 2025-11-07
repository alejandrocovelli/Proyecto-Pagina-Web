import { ProductoService } from "../services/ProductoService";

const productoService = new ProductoService();

export class ProductoController {
    static async getProductos(req, res) {
        try {
            const result = await productoService.getProductos()
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
}