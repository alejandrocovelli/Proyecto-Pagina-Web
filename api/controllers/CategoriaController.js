/**
 * ========================================
 * CONTROLLER: CATEGORIA
 * ========================================
 * Maneja peticiones HTTP relacionadas con categorías
 * Procesa solicitudes y retorna respuestas JSON
 * 
 * Responsabilidades:
 * - Recibir y procesar peticiones HTTP
 * - Delegar lógica al servicio
 * - Retornar respuestas con códigos HTTP apropiados
 */

import { CategoriaService } from "../services/CategoriaService.js";

// Crear instancia del servicio
const categoriaService = new CategoriaService();

export class CategoriaController {
    /**
     * GET /api/categorias
     * Obtener lista de todas las categorías
     * 
     * @returns {Response} JSON con array de categorías (código 200)
     */
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

    /**
     * GET /api/categorias/:id
     * Obtener categoría específica por ID
     * 
     * @param {Number} id - ID de la categoría (parámetro de ruta)
     * @returns {Response} JSON con datos de la categoría
     */
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

    /**
     * POST /api/categorias
     * Crear nueva categoría
     * 
     * Body requerido:
     * {
     *   "nombre": "Nombre de la categoría"
     * }
     * 
     * @returns {Response} JSON con categoría creada (código 201)
     */
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

    /**
     * PUT /api/categorias/:id
     * Actualizar categoría existente
     * 
     * Body (opcional):
     * {
     *   "nombre": "Nuevo nombre"
     * }
     * 
     * @param {Number} id - ID de la categoría (parámetro de ruta)
     * @returns {Response} JSON con categoría actualizada
     */
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

    /**
     * DELETE /api/categorias/:id
     * Eliminar categoría
     * 
     * @param {Number} id - ID de la categoría (parámetro de ruta)
     * @returns {Response} JSON con mensaje de éxito
     */
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