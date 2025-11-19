import { body } from "express-validator";
import { validateResult } from "./validatorUtils.js";

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

export const validateUpdateOrdenProducto = [
    // Cantidad del producto (opcional en update; puede ser 0 para eliminar)
    body('cantidad')
        .optional()
        .isInt({ min: 0 }).withMessage('La cantidad debe ser un número entero mayor o igual a 0'),

    // Precio unitario (opcional)
    body('precioUnidad')
        .optional()
        .isInt({ min: 0 }).withMessage('El precio debe ser un número mayor o igual a 0'),

    // Valor total (opcional)
    body('valorTotal')
        .optional()
        .isInt({ min: 0 }).withMessage('El valor total debe ser un número mayor o igual a 0'),

    // Middleware de verificación de errores
    (req, res, next) => {
        validateResult(req, res, next);
    }
];