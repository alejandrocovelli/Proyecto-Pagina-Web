import { body } from "express-validator";
import { validateResult } from "./validatorUtils.js";

export const validateCreateOrdenProducto = [
    body('cantidad')
        .exists().withMessage('La cantidad es requerida')
        .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero mayor a 0'),
    
    body('precioUnidad')
        .exists().withMessage('El precio es requerido')
        .isInt({ min: 0 }).withMessage('El precio debe ser un número mayor o igual a 0'),
    
    body('valorTotal')
        .exists().withMessage('El valor total es requerido')
        .isInt({ min: 0 }).withMessage('El valor total debe ser un número mayor o igual a 0'),

    body('idOrden')
        .exists().withMessage('El ID de orden es requerido')
        .isInt().withMessage('El ID de orden debe ser un número entero'),
    
    body('idProducto')
        .exists().withMessage('El ID de producto es requerido')
        .isInt().withMessage('El ID de producto debe ser un número entero'),
    
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export const validateUpdateOrdenProducto = [
    body('cantidad')
        .exists().withMessage('La cantidad es requerida')
        .isInt({ min: 1 }).withMessage('La cantidad debe ser un número entero mayor a 0'),
    
    body('precioUnidad')
        .exists().withMessage('El precio es requerido')
        .isInt({ min: 0 }).withMessage('El precio debe ser un número mayor o igual a 0'),

    body('valorTotal')
        .exists().withMessage('El valor total es requerido')
        .isInt({ min: 0 }).withMessage('El valor total debe ser un número mayor o igual a 0'),
    
    (req, res, next) => {
        validateResult(req, res, next);
    }
];