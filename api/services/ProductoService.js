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
        
        // Si se envió una imagen, subirla a Cloudinary
        if(file) {
            // Subir archivo a Cloudinary en la carpeta "productos"
            const upload = await cloudinary.uploader.upload(file.path, {
                folder: "productos",
            });
            
            // Obtener URL segura de la imagen
            imagenUrl = upload.secure_url;
            
            // Eliminar archivo temporal del servidor
            fs.unlinkSync(file.path);
        }

        // Combinar datos del producto con la URL de la imagen
        const productoFinal = {
            ...productoData,
            foto: imagenUrl
        };
        
        // Guardar producto en BD
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