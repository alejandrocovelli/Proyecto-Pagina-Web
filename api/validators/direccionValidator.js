import { body, param } from "express-validator";
import { validateResult } from "./validatorUtils.js";

export const validateCreateDireccion = [
    body('direccion')
        .exists().withMessage('La dirección es requerida')
        .not().isEmpty().withMessage('La dirección no puede estar vacía')
        .isString().withMessage('La dirección debe ser un texto')
        .isLength({ min: 5, max: 45 }).withMessage('La dirección debe tener entre 5 y 45 caracteres'),
    
    body('ciudad')
        .exists().withMessage('La ciudad es requerida')
        .not().isEmpty().withMessage('La ciudad no puede estar vacía')
        .isString().withMessage('La ciudad debe ser un texto')
        .isLength({ min: 2, max: 45 }).withMessage('La ciudad debe tener entre 2 y 45 caracteres'),
    
    body('barrio')
        .exists().withMessage('El barrio es requerido')
        .not().isEmpty().withMessage('El barrio no puede estar vacío')
        .isString().withMessage('El barrio debe ser un texto')
        .isLength({ min: 2, max: 45 }).withMessage('El barrio debe tener entre 2 y 45 caracteres'),
    
    body('idUsuario')
        .exists().withMessage('El ID de usuario es requerido')
        .isInt().withMessage('El ID de usuario debe ser un número entero'),
    
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export const validateUpdateDireccion = [
    body('direccion')
        .optional()
        .isString().withMessage('La dirección debe ser un texto')
        .isLength({ min: 5, max: 45 }).withMessage('La dirección debe tener entre 5 y 45 caracteres'),
    
    body('ciudad')
        .optional()
        .isString().withMessage('La ciudad debe ser un texto')
        .isLength({ min: 2, max: 45 }).withMessage('La ciudad debe tener entre 2 y 45 caracteres'),
    
    body('barrio')
        .optional()
        .isString().withMessage('El barrio debe ser un texto')
        .isLength({ min: 2, max: 45 }).withMessage('El barrio debe tener entre 2 y 45 caracteres'),
    
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export const validateDireccionId = [
    param('idDireccion')
        .exists().withMessage('El ID de dirección es requerido')
        .isInt({ min: 1 }).withMessage('El ID de dirección debe ser un número entero positivo'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];