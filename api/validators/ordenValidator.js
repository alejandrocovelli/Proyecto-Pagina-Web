import { body, param } from "express-validator";
import { validateResult } from "./validatorUtils.js";

export const validateCreateOrden = [
    // Validación de estado
    body('estado')
        .exists().withMessage('El estado es requerido')
        .isInt({ min: 1, max: 4 }).withMessage('El estado debe ser 1 (pendiente), 2 (en proceso), 3 (cancelado) o 4 (aceptado)'),

    // Validación del array de productos
    body('productos')
        .exists().withMessage('Los productos son requeridos')
        .isArray().withMessage('Los productos deben ser un array')
        .notEmpty().withMessage('Debe incluir al menos un producto'),
    
    // Validación de cada producto en el array
    // Nota: productos.*.idProducto valida ALL elementos del array
    body('productos.*.idProducto')
        .exists().withMessage('El ID del producto es requerido')
        .isInt({ min: 1 }).withMessage('El ID del producto debe ser un número entero positivo'),
    
    body('productos.*.cantidad')
        .exists().withMessage('La cantidad es requerida')
        .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero positivo'),
    
    // Validación de usuario y dirección
    body('idUsuario')
        .exists().withMessage('El ID de usuario es requerido')
        .isInt().withMessage('El ID de usuario debe ser un número entero'),
    
    // Middleware de verificación de errores
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export const validateUpdateOrden = [
    // Estado es opcional pero si se proporciona debe ser válido
    body('estado')
        .optional()
        .isInt({ min: 1, max: 4 }).withMessage('El estado debe ser 1 (pendiente), 2 (en proceso), 3 (cancelado) o 4 (aceptado)'),
    
    body('productos')
        .optional()
        .isArray().withMessage('Los productos deben ser un array')
        .custom(arr => Array.isArray(arr) && arr.length > 0).withMessage('Si envía productos, el array no puede estar vacío'),

    body('productos.*.idProducto')
        .if(body('productos').exists()) // sólo validar si productos fue enviado
        .exists().withMessage('El ID del producto es requerido')
        .isInt({ min: 1 }).withMessage('El ID del producto debe ser un entero positivo'),

    body('productos.*.cantidad')
        .if(body('productos').exists())
        .exists().withMessage('La cantidad es requerida')
        .isInt({ min: 1 }).withMessage('La cantidad debe ser un entero positivo'),

    // Total es opcional pero si se proporciona debe ser >= 0
    body('totalPago')
        .optional()
        .isInt({ min: 0 }).withMessage('El total debe ser un número mayor o igual a 0'),
    
    // Middleware de verificación de errores
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export const validateOrdenId = [
    param('idOrden')
        .exists().withMessage('El ID de orden es requerido')
        .isInt({ min: 1 }).withMessage('El ID de orden debe ser un número entero positivo'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export const validateUsuarioId = [
    param('idUsuario')
        .exists().withMessage('El ID del usuario es requerido')
        .isInt({ min: 1 }).withMessage('El ID del usuario debe ser un número entero positivo'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];