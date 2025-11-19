import { body } from "express-validator";
import { validateResult } from "./validatorUtils.js";

export const validateLogin = [
    // Validar campo 'correo'
    body('correo')
        .exists().withMessage('El correo es requerido')
        .isEmail().withMessage('Debe ser un correo válido')
        .isLength({ min: 1, max: 100 }).withMessage('El correo no puede tener más de 100 caracteres'),
    
    // Validar campo 'contraseña'
    body('contraseña')
        .exists().withMessage('La contraseña es requerida')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        // Expresión regular: al menos una letra y un número
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
        .withMessage('La contraseña debe contener al menos una letra y un número'),
    
    // Middleware de manejo de errores
    (req, res, next) => {
        validateResult(req, res, next);
    }
];