import { CategoriaService } from "../services/CategoriaService.js";

// Crear instancia del servicio
const categoriaService = new CategoriaService();

export class CategoriaController {
    static async getCategorias(req, res) {
        try {
            const result = await categoriaService.getCategorias()
            
            if(!result) {
                return res.status(400).json({ 
                    error: "Error al listar categorías", 
                    result
                })
            }
            
            return res.status(200).json({
                mensaje: "Categorías listadas correctamente", 
                data: result.data
            })
        } catch (error) {
            console.error("Error en getCategorias:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    static async getCategoriaById(req, res) {
        try {
            const { id } = req.params;
            const result = await categoriaService.getCategoriaById(id)
            
            if(!result) {
                return res.status(404).json({ 
                    error: "Categoría no encontrada" 
                })
            }
            
            return res.status(200).json({
                mensaje: "Categoría encontrada", 
                data: result.data
            })
        } catch (error) {
            console.error("Error en getCategoriaById:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    static async createCategoria(req, res) {
        try {
            const result = await categoriaService.createCategoria(req.body)
            
            if(!result) {
                return res.status(400).json({ 
                    error: "Error al crear la categoría" 
                })
            }
            
            return res.status(201).json({
                mensaje: "Categoría creada correctamente", 
                data: result.data
            })
        } catch (error) {
            console.error("Error en createCategoria:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    static async updateCategoria(req, res) {
        try {
            const { id } = req.params;
            const result = await categoriaService.updateCategoria(id, req.body)
            
            if(!result) {
                return res.status(404).json({ 
                    error: "Categoría no encontrada" 
                })
            }
            
            return res.status(200).json({
                mensaje: "Categoría actualizada correctamente", 
                data: result.data
            })
        } catch (error) {
            console.error("Error en updateCategoria:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    static async deleteCategoria(req, res) {
        try {
            const { id } = req.params;
            const result = await categoriaService.deleteCategoria(id)
            
            if(!result) {
                return res.status(404).json({ 
                    error: "Categoría no encontrada" 
                })
            }
            
            return res.status(200).json({
                mensaje: "Categoría eliminada correctamente"
            })
        } catch (error) {
            console.error("Error en deleteCategoria:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }
}