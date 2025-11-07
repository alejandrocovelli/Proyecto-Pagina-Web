import { CategoriaService } from "../services/CategoriaService";

const categoriaService = new CategoriaService();

export class CategoriaController {
    static async getCategorias(req, res) {
        try {
            const result = await categoriaService.getCategorias()
            if(!result) {
                res.status(400).json({ error: "Error al listar categorías", result})
            }
            res.status(200).json({mensaje: "Categorías listadas correctamente", result})
        } catch (error) {
            console.error("Error en getCategorias:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }
}