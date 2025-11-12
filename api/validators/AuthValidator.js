/**
 * ========================================
 * VALIDADORES: AUTENTICACION
 * ========================================
 * Define las reglas de validación para datos de login
 * Valida correo y contraseña antes de procesarlos
 */

import { body } from "express-validator";
import { validateResult } from "./validatorUtils.js";

/**
 * Validador para LOGIN
 * Valida que los datos de login sean válidos
 * 
 * Campos requeridos:
 * - correo: Email válido
 * - contraseña: Mínimo 6 caracteres con letra y número
 */
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