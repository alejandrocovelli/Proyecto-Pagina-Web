/**
 * ========================================
 * VALIDATOR: ORDEN PRODUCTO
 * ========================================
 * Validación de datos para registros OrdenProducto
 * Define reglas de validación para cada endpoint
 * 
 * Responsabilidades:
 * - Validar estructura de datos
 * - Validar tipos de datos (cantidad, precios, IDs)
 * - Validar rangos y restricciones
 * - Enviar errores 400 si validación falla
 * 
 * Contexto:
 * - Normalmente estos registros se crean automáticamente en createOrden
 * - Estos validadores son para crear/actualizar manualmente si es necesario
 */

import { body } from "express-validator";
import { validateResult } from "./validatorUtils.js";

/**
 * Validación para crear registro OrdenProducto (POST)
 * 
 * Valida:
 * - cantidad: Requerida, entero > 0
 * - precioUnidad: Requerido, entero >= 0
 * - valorTotal: Requerido, entero >= 0 (cantidad × precioUnidad)
 * - idOrden: Requerido, entero (debe existir en tabla Orden)
 * - idProducto: Requerido, entero (debe existir en tabla Producto)
 * 
 * @middleware Express middleware array
 * Si falla: Retorna 400 con array de errores
 * Si pasa: Procede al controlador
 */
export const validateCreateOrdenProducto = [
    // Cantidad del producto
    body('cantidad')
        .exists().withMessage('La cantidad es requerida')
        .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero mayor a 0'),
    
    // Precio unitario en momento de compra
    body('precioUnidad')
        .exists().withMessage('El precio es requerido')
        .isInt({ min: 0 }).withMessage('El precio debe ser un número mayor o igual a 0'),
    
    // Valor total = cantidad × precioUnidad
    body('valorTotal')
        .exists().withMessage('El valor total es requerido')
        .isInt({ min: 0 }).withMessage('El valor total debe ser un número mayor o igual a 0'),

    // Identificador de la orden
    body('idOrden')
        .exists().withMessage('El ID de orden es requerido')
        .isInt().withMessage('El ID de orden debe ser un número entero'),
    
    // Identificador del producto
    body('idProducto')
        .exists().withMessage('El ID de producto es requerido')
        .isInt().withMessage('El ID de producto debe ser un número entero'),
    
    // Middleware de verificación de errores
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

/**
 * Validación para actualizar registro OrdenProducto (PUT)
 * 
 * Valida:
 * - cantidad: Requerida, entero > 0
 * - precioUnidad: Requerido, entero >= 0
 * - valorTotal: Requerido, entero >= 0
 * 
 * Nota: No se actualizan idOrden e idProducto para evitar cambiar relaciones
 * 
 * Uso: Corregir cantidad o precios en caso de error en la orden
 * 
 * @middleware Express middleware array
 * Si falla: Retorna 400 con array de errores
 * Si pasa: Procede al controlador
 */
export const validateUpdateOrdenProducto = [
    // Cantidad del producto
    body('cantidad')
        .exists().withMessage('La cantidad es requerida')
        .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero mayor a 0'),
    
    // Precio unitario
    body('precioUnidad')
        .exists().withMessage('El precio es requerido')
        .isInt({ min: 0 }).withMessage('El precio debe ser un número mayor o igual a 0'),

    // Valor total
    body('valorTotal')
        .exists().withMessage('El valor total es requerido')
        .isInt({ min: 0 }).withMessage('El valor total debe ser un número mayor o igual a 0'),
    
    // Middleware de verificación de errores
    (req, res, next) => {
        validateResult(req, res, next);
    }
];