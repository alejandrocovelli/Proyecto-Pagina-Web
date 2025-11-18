/**
 * ========================================
 * SERVICE: PRODUCTO
 * ========================================
 * Capa de lógica de negocio para productos
 * Maneja la lógica de subida de imágenes a Cloudinary
 * 
 * Responsabilidades:
 * - Obtener/crear/actualizar/eliminar productos
 * - Gestionar carga de imágenes en Cloudinary
 * - Limpiar archivos temporales
 * - Formatear respuestas
 */

import { ProductoRepository } from "../repositories/ProductoRepository.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export class ProductoService {
    constructor() {
        this.productoRepository = new ProductoRepository()
    }

    /**
     * Obtener todos los productos de una categoría
     * 
     * @param {Number} categoriaId - ID de la categoría
     * @returns {Promise<Object>} Respuesta con lista de productos
     */
    async getProductos(categoriaId, limit) {
        const productos = await this.productoRepository.getProductos(categoriaId, limit);
        return { success: true, data: productos };
    }

    /**
     * Obtener producto específico
     * 
     * @param {Number} id - ID del producto
     * @returns {Promise<Object>} Respuesta con datos del producto
     */
    async getProductoById(id) {
        const producto = await this.productoRepository.getProductoById(id);
        return { success: true, data: producto };
    }

    /**
     * Crear nuevo producto con imagen
     * Sube la imagen a Cloudinary y elimina archivo temporal
     * 
     * @param {Object} productoData - Datos del producto
     * @param {Object} file - Archivo de imagen (multer)
     * @returns {Promise<Object>} Respuesta con producto creado
     */
    async createProducto(productoData, file) {
        let imagenUrl = null;

        if (file) {
            try {
                console.log("ProductoService: subiendo a Cloudinary ->", file.path);
                const upload = await cloudinary.uploader.upload(file.path, {
                    folder: "productos",
                    resource_type: "image"
                });
                imagenUrl = upload?.secure_url ?? null;
                console.log("ProductoService: subida OK ->", imagenUrl);
            } catch (err) {
                console.error("ProductoService: error subiendo a Cloudinary:", err && err.message ? err.message : err);
                // intentar limpiar temporal si existe
                try {
                    if (file && fs.existsSync(file.path)) fs.unlinkSync(file.path);
                } catch (e) {
                    console.warn("ProductoService: no se pudo eliminar temporal tras fallo:", e && e.message ? e.message : e);
                }
                throw err; // permite al controller devolver 500 con details
            }

            // eliminar archivo temporal si existe
            try {
                if (file && fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                    console.log("ProductoService: archivo temporal eliminado:", file.path);
                }
            } catch (e) {
                console.warn("ProductoService: fallo al eliminar temporal:", e && e.message ? e.message : e);
            }
        }

        const productoFinal = { ...productoData, foto: imagenUrl };
        const producto = await this.productoRepository.createProducto(productoFinal);
        return { success: true, data: producto };
    }

    /**
     * Actualizar producto existente
     * 
     * @param {Number} id - ID del producto
     * @param {Object} productoData - Datos a actualizar
     * @returns {Promise<Object>} Respuesta con producto actualizado
     */
    async updateProducto(id, productoData) {
        const producto = await this.productoRepository.updateProducto(id, productoData);
        return { success: true, data: producto };
    }

    /**
     * Eliminar producto
     * 
     * @param {Number} id - ID del producto
     * @returns {Promise<Object>} Respuesta con resultado
     */
    async deleteProducto(id) {
        const result = await this.productoRepository.deleteProducto(id);
        return { success: true, data: result };
    }
}