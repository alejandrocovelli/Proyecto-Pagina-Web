/**
 * ========================================
 * VALIDADORES: USUARIO
 * ========================================
 * Define las reglas de validación para los datos de entrada del usuario
 * Usa express-validator para validar y sanitizar datos
 * 
 * Responsabilidades:
 * - Validar que los datos cumplan con los requisitos
 * - Sanitizar datos (limpiar caracteres especiales, etc.)
 * - Retornar errores descriptivos
 * - Ejecutarse ANTES del controlador
 * 
 * Los validadores se aplican como middleware en las rutas
 * Ejemplo: router.post("/", validateCreateUsuario, controller.createUsuario)
 */

import { body, param } from "express-validator";
import { validationResult } from "express-validator";
import { validateResult } from "./validatorUtils.js";

/**
 * Validador para CREAR USUARIO
 * Valida que todos los campos requeridos estén presentes y sean válidos
 * 
 * Campos requeridos:
 * - nombre: String, 1-45 caracteres
 * - correo: Email válido, máximo 100 caracteres
 * - contraseña: Mínimo 6 caracteres con letra y número
 * - tipo: Entero 1-3 (1=Admin, 2=Cliente, 3=Mayorista)
 */
export const validateCreateUsuario = [
    // Validar campo 'nombre'
    body('nombre')
        .exists().withMessage('El nombre es requerido')
        .not().isEmpty().withMessage('El nombre no puede estar vacío')
        .isString().withMessage('El nombre debe ser un texto')
        .isLength({ min: 1, max: 45 }).withMessage('El nombre debe tener entre 2 y 45 caracteres'),
    
    // Validar campo 'correo'
    body('correo')
        .exists().withMessage('El correo es requerido')
        .isEmail().withMessage('Debe ser un correo válido')
        .isLength({ max: 100 }).withMessage('El correo no puede tener más de 100 caracteres'),
    
    // Validar campo 'contraseña'
    body('contraseña')
        .exists().withMessage('La contraseña es requerida')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        // Expresión regular: al menos una letra y un número
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
        .withMessage('La contraseña debe contener al menos una letra y un número'),
    
    // Validar campo 'tipo'
    body('tipo')
        .exists().withMessage('El tipo de usuario es requerido')
        .isInt({ min: 1, max: 3 }).withMessage('El tipo debe ser 1 (Admin), 2 (Cliente) o 3 (Cliente Mayorista)'),
    
    // Middleware de manejo de errores de validación
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

/**
 * Validador para ACTUALIZAR USUARIO
 * Todos los campos son opcionales
 * Usa .optional() para permitir campos no enviados
 */
export const validateUpdateUsuario = [
    // Campo 'nombre' (opcional)
    body('nombre')
        .optional()
        .isString().withMessage('El nombre debe ser un texto')
        .isLength({ min: 2, max: 45 }).withMessage('El nombre debe tener entre 2 y 45 caracteres'),
    
    // Campo 'correo' (opcional)
    body('correo')
        .optional()
        .isEmail().withMessage('Debe ser un correo válido')
        .isLength({ max: 100 }).withMessage('El correo no puede tener más de 100 caracteres'),
    
    // Campo 'contraseña' (opcional)
    body('contraseña')
        .optional()
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
        .withMessage('La contraseña debe contener al menos una letra y un número'),
    
    // Campo 'tipo' (opcional)
    body('tipo')
        .optional()
        .isInt({ min: 1, max: 3 }).withMessage('El tipo debe ser 1 (Admin), 2 (Cliente) o 3 (Cliente Mayorista)'),
    
    // Middleware de manejo de errores
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

/**
 * Validador para ID DE USUARIO (en parámetros de ruta)
 * Valida el parámetro idUsuario cuando se busca/actualiza/elimina un usuario
 * 
 * @param {Number} idUsuario - ID del usuario en la ruta (/usuarios/:idUsuario)
 */
export const validateUsuarioId = [
    // Validar parámetro 'idUsuario'
    param('idUsuario')
        .exists().withMessage('El ID de usuario es requerido')
        .isInt({ min: 1 }).withMessage('El ID de usuario debe ser un número entero positivo'),
    
    // Middleware de manejo de errores
    (req, res, next) => {
        validateResult(req, res, next);
    }
];