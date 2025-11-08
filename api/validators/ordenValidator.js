import { body } from "express-validator";
import { validateResult } from "./validatorUtils.js";

export const validateCreateOrden = [
    body('estado')
        .exists().withMessage('El estado es requerido')
        .isInt({ min: 1, max: 4 }).withMessage('El estado debe ser 1 (pendiente), 2 (en proceso), 3 (cancelado) o 4 (aceptado)'),
    
    body('totalPago')
        .exists().withMessage('El total es requerido')
        .isInt({ min: 0 }).withMessage('El total debe ser un número mayor o igual a 0'),
    
    body('idUsuario')
        .exists().withMessage('El ID de usuario es requerido')
        .isInt().withMessage('El ID de usuario debe ser un número entero'),
    
    body('idDireccion')
        .exists().withMessage('El ID de dirección es requerido')
        .isInt().withMessage('El ID de dirección debe ser un número entero'),
    
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export const validateUpdateOrden = [
    body('estado')
        .optional()
        .isInt({ min: 1, max: 4 }).withMessage('El estado debe ser 1 (pendiente), 2 (en proceso), 3 (cancelado) o 4 (aceptado)'),
    
    body('totalPago')
        .optional()
        .isInt({ min: 0 }).withMessage('El total debe ser un número mayor o igual a 0'),
    
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