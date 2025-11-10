import { body, param } from "express-validator";
import { validationResult } from "express-validator";
import { validateResult } from "./validatorUtils.js";

export const validateCreateUsuario = [
    body('nombre')
        .exists().withMessage('El nombre es requerido')
        .not().isEmpty().withMessage('El nombre no puede estar vacío')
        .isString().withMessage('El nombre debe ser un texto')
        .isLength({ min: 2, max: 45 }).withMessage('El nombre debe tener entre 2 y 45 caracteres'),
    
    body('correo')
        .exists().withMessage('El correo es requerido')
        .isEmail().withMessage('Debe ser un correo válido')
        .isLength({ max: 100 }).withMessage('El correo no puede tener más de 100 caracteres'),
    
    body('contraseña')
        .exists().withMessage('La contraseña es requerida')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
        .withMessage('La contraseña debe contener al menos una letra y un número'),
    
    body('tipo')
        .exists().withMessage('El tipo de usuario es requerido')
        .isInt({ min: 1, max: 3 }).withMessage('El tipo debe ser 1 (Admin), 2 (Cliente) o 3 (Cliente Mayorista)'),
    
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export const validateUpdateUsuario = [
    body('nombre')
        .optional()
        .isString().withMessage('El nombre debe ser un texto')
        .isLength({ min: 2, max: 45 }).withMessage('El nombre debe tener entre 2 y 45 caracteres'),
    
    body('correo')
        .optional()
        .isEmail().withMessage('Debe ser un correo válido')
        .isLength({ max: 100 }).withMessage('El correo no puede tener más de 100 caracteres'),
    
    body('contraseña')
        .optional()
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
        .withMessage('La contraseña debe contener al menos una letra y un número'),
    
    body('tipo')
        .optional()
        .isInt({ min: 1, max: 3 }).withMessage('El tipo debe ser 1 (Admin), 2 (Cliente) o 3 (Cliente Mayorista)'),
    
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export const validateUsuarioId = [
    param('idUsuario')
        .exists().withMessage('El ID de usuario es requerido')
        .isInt({ min: 1 }).withMessage('El ID de usuario debe ser un número entero positivo'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];