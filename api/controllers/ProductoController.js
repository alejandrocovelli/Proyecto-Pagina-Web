/**
 * ========================================
 * CONTROLLER: PRODUCTO
 * ========================================
 * Maneja peticiones HTTP relacionadas con productos
 * Orquesta llamadas al servicio y formatea respuestas
 * 
 * Responsabilidades:
 * - Recibir peticiones HTTP
 * - Validar datos de entrada
 * - Llamar servicios
 * - Retornar respuestas HTTP apropiadas
 */

import { ProductoService } from "../services/ProductoService.js";

// Crear instancia del servicio
const productoService = new ProductoService();

export class ProductoController {
    /**
     * GET /api/productos
     * Obtener productos de una categoría
     * 
     * Body: { idCategoria: Number }
     * 
     * @returns {Response} JSON con lista de productos
     */
    static async getProductos(req, res) {
        try {
            const { idCategoria } = req.body;
            const result = await productoService.getProductos(idCategoria)
            
            if(!result) {
                return res.status(400).json({ 
                    error: "Error al listar productos", 
                    result
                })
            }
            
            return res.status(200).json({
                mensaje: "Productos listados correctamente", 
                data: result.data
            })
        } catch (error) {
            console.error("Error en getProductos:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    /**
     * GET /api/productos/:id
     * Obtener producto específico por ID
     * 
     * @param {Number} id - ID del producto (parámetro de ruta)
     * @returns {Response} JSON con datos del producto
     */
    static async getProductoById(req, res) {
        try {
            const { id } = req.params;
            const result = await productoService.getProductoById(id)
            
            if(!result) {
                return res.status(404).json({ 
                    error: "Producto no encontrado" 
                })
            }
            
            return res.status(200).json({
                mensaje: "Producto encontrado", 
                data: result.data
            })
        } catch (error) {
            console.error("Error en getProductoById:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    /**
     * POST /api/productos
     * Crear nuevo producto
     * Puede incluir imagen que se sube a Cloudinary
     * 
     * Body: 
     * {
     *   "nombre": "Producto",
     *   "precio": 50000,
     *   "precioMayorista": "40000",
     *   "idCategoria": 1
     * }
     * File (opcional): imagen del producto
     * 
     * @returns {Response} JSON con producto creado (código 201)
     */
    static async createProducto(req, res) {
        try {
            const result = await productoService.createProducto(req.body, req.file);
            
            if(!result) {
                return res.status(400).json({ 
                    error: "Error al crear el producto" 
                })
            }
            
            return res.status(201).json({
                mensaje: "Producto creado correctamente", 
                data: result.data
            })
        } catch (error) {
            console.error("Error en createProducto:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    /**
     * PUT /api/productos/:id
     * Actualizar producto existente
     * 
     * @param {Number} id - ID del producto (parámetro de ruta)
     * @returns {Response} JSON con producto actualizado
     */
    static async updateProducto(req, res) {
        try {
            const { id } = req.params;
            const result = await productoService.updateProducto(id, req.body)
            
            if(!result) {
                return res.status(404).json({ 
                    error: "Producto no encontrado" 
                })
            }
            
            return res.status(200).json({
                mensaje: "Producto actualizado correctamente", 
                data: result.data
            })
        } catch (error) {
            console.error("Error en updateProducto:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }

    /**
     * DELETE /api/productos/:id
     * Eliminar producto
     * 
     * @param {Number} id - ID del producto (parámetro de ruta)
     * @returns {Response} JSON con mensaje de éxito
     */
    static async deleteProducto(req, res) {
        try {
            const { id } = req.params;
            const result = await productoService.deleteProducto(id)
            
            if(!result) {
                return res.status(404).json({ 
                    error: "Producto no encontrado" 
                })
            }
            
            return res.status(200).json({
                mensaje: "Producto eliminado correctamente"
            })
        } catch (error) {
            console.error("Error en deleteProducto:", error);
            return res.status(500).json({
                error: "Error interno del servidor",
            });
        }
    }
}