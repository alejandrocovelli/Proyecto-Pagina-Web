/**
 * ========================================
 * UTILIDADES DE VALIDACIÓN
 * ========================================
 * Funciones auxiliares reutilizables para la validación de datos
 * 
 * Responsabilidades:
 * - Procesar errores de validación
 * - Formatear respuestas de error consistentes
 * - Ejecutarse después de los validadores de express-validator
 */

import { check } from "express-validator";
import { validationResult } from "express-validator";

/**
 * Middleware que procesa y retorna los errores de validación
 * 
 * Se ejecuta al final de cada cadena de validadores
 * Ejemplo en validadores: ..., (req, res, next) => { validateResult(req, res, next); }
 * 
 * Si hay errores de validación:
 * - Los recopila
 * - Los formatea en un array
 * - Retorna respuesta 400 (Bad Request) con detalles de los errores
 * 
 * Si no hay errores:
 * - Continúa al siguiente middleware/controlador
 * 
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función para pasar al siguiente middleware
 * 
 * @returns {void} - Retorna respuesta de error o llama a next()
 */
export const validateResult = (req, res, next) => {
    try {
        // Obtener los errores de validación encontrados
        // Si hay errores, throw() lanza una excepción
        validationResult(req).throw();
        
        // Si no hay errores, continuar al siguiente middleware
        return next();
    } catch (err) {
        // Capturar los errores de validación
        // err.array() retorna array de objetos con detalles de cada error
        res.status(400).json({
            success: false,
            errors: err.array()
            // Cada error contiene: { param, msg, value, location }
            // Ejemplo: { param: 'correo', msg: 'Debe ser un correo válido', value: 'correo_invalido', location: 'body' }
        });
    }
};