import { body, param, query } from "express-validator";
import { validateResult } from "./validatorUtils.js";

export const validateGetProduct = [
    query('idCategoria')
        .optional()
        .isInt().withMessage('El id de la categoría tiene que ser un número entero'),

    query('limit')
        .optional()
        .isInt().withMessage('El limite tiene que ser un número entero')
]

export const validateCreateProducto = [
    // Validar nombre del producto
    body('nombre')
        .exists().withMessage('El nombre es requerido')
        .not().isEmpty().withMessage('El nombre no puede estar vacío')
        .isString().withMessage('El nombre debe ser un texto')
        .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),

    // Validar precio al público
    body('precio')
        .exists().withMessage('El precio es requerido')
        .isInt({ min: 0 }).withMessage('El precio debe ser un número mayor o igual a 0'),

    // Validar precio mayorista
    body('precioMayorista')
        .exists().withMessage('El precio mayorista es requerido')
        .isInt({ min: 0 }).withMessage('El precio mayorista debe ser un número mayor o igual a 0'),
    
    // Validar categoría
    body('idCategoria')
        .exists().withMessage('El ID de categoría es requerido')
        .isInt().withMessage('El ID de categoría debe ser un número entero'),
    
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export const validateUpdateProducto = [
    body('nombre')
        .optional()
        .isString().withMessage('El nombre debe ser un texto')
        .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    
    body('precio')
        .optional()
        .isInt({ min: 0 }).withMessage('El precio debe ser un número mayor o igual a 0'),
    
    body('precioMayorista')
        .optional()
        .isInt({ min: 0 }).withMessage('El precio mayorista debe ser un número mayor o igual a 0'),
    
    body('foto')
        .optional()
        .isURL().withMessage('La imagen debe ser una URL válida')
        .isLength({ min: 2, max: 255 }).withMessage('La URL debe tener entre 2 y 255 caracteres'),
    
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export const validateProductoId = [
    param('idProducto')
        .exists().withMessage('El ID de producto es requerido')
        .isInt({ min: 1 }).withMessage('El ID de producto debe ser un número entero positivo'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];