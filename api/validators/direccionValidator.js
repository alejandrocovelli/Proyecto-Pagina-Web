/**
 * ========================================
 * VALIDATOR: DIRECCION
 * ========================================
 * Validación de datos para direcciones usando express-validator
 * Define reglas de validación para cada endpoint
 * 
 * Responsabilidades:
 * - Validar estructura de datos
 * - Validar tipos de datos (strings, números)
 * - Validar longitudes de campos
 * - Validar que campos no estén vacíos
 * - Enviar errores con códigos 400 si validación falla
 * 
 * Contexto:
 * - Las direcciones son usadas como dirección de entrega en órdenes
 * - Cada dirección está asociada a un usuario
 */

import { body, param } from "express-validator";
import { validateResult } from "./validatorUtils.js";

/**
 * Validación para crear dirección (POST)
 * 
 * Valida:
 * - direccion: Requerida, string 5-45 caracteres
 * - ciudad: Requerida, string 2-45 caracteres
 * - barrio: Requerido, string 2-45 caracteres
 * - idUsuario: Requerido, número entero (propietario)
 * 
 * @middleware Express middleware array
 * Si falla: Retorna 400 con array de errores
 * Si pasa: Procede al controlador
 */
export const validateCreateDireccion = [
    // Validación de dirección completa
    body('direccion')
        .exists().withMessage('La dirección es requerida')
        .not().isEmpty().withMessage('La dirección no puede estar vacía')
        .isString().withMessage('La dirección debe ser un texto')
        .isLength({ min: 5, max: 45 }).withMessage('La dirección debe tener entre 5 y 45 caracteres'),
    
    // Validación de ciudad
    body('ciudad')
        .exists().withMessage('La ciudad es requerida')
        .not().isEmpty().withMessage('La ciudad no puede estar vacía')
        .isString().withMessage('La ciudad debe ser un texto')
        .isLength({ min: 2, max: 45 }).withMessage('La ciudad debe tener entre 2 y 45 caracteres'),
    
    // Validación de barrio
    body('barrio')
        .exists().withMessage('El barrio es requerido')
        .not().isEmpty().withMessage('El barrio no puede estar vacío')
        .isString().withMessage('El barrio debe ser un texto')
        .isLength({ min: 2, max: 45 }).withMessage('El barrio debe tener entre 2 y 45 caracteres'),
    
    // Validación de usuario propietario
    body('idUsuario')
        .exists().withMessage('El ID de usuario es requerido')
        .isInt().withMessage('El ID de usuario debe ser un número entero'),
    
    // Middleware de verificación de errores
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

/**
 * Validación para actualizar dirección (PUT)
 * Todos los campos son opcionales
 * 
 * Valida:
 * - direccion: Opcional, si existe debe ser string 5-45 caracteres
 * - ciudad: Opcional, si existe debe ser string 2-45 caracteres
 * - barrio: Opcional, si existe debe ser string 2-45 caracteres
 * 
 * Uso: Actualizar parcialmente los datos de una dirección
 * 
 * @middleware Express middleware array
 * Si falla: Retorna 400 con array de errores
 * Si pasa: Procede al controlador
 */
export const validateUpdateDireccion = [
    // Dirección es opcional pero si se proporciona debe ser válida
    body('direccion')
        .optional()
        .isString().withMessage('La dirección debe ser un texto')
        .isLength({ min: 5, max: 45 }).withMessage('La dirección debe tener entre 5 y 45 caracteres'),
    
    // Ciudad es opcional pero si se proporciona debe ser válida
    body('ciudad')
        .optional()
        .isString().withMessage('La ciudad debe ser un texto')
        .isLength({ min: 2, max: 45 }).withMessage('La ciudad debe tener entre 2 y 45 caracteres'),
    
    // Barrio es opcional pero si se proporciona debe ser válido
    body('barrio')
        .optional()
        .isString().withMessage('El barrio debe ser un texto')
        .isLength({ min: 2, max: 45 }).withMessage('El barrio debe tener entre 2 y 45 caracteres'),
    
    // Middleware de verificación de errores
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

/**
 * Validación para ID de dirección en parámetros de URL
 * Utilizado en GET /:id, PUT /:id, DELETE /:id
 * 
 * Valida:
 * - param idDireccion: Requerido, debe ser entero > 0
 * 
 * @middleware Express middleware array
 * Si falla: Retorna 400 con array de errores
 * Si pasa: Procede al controlador
 */
export const validateDireccionId = [
    param('idDireccion')
        .exists().withMessage('El ID de dirección es requerido')
        .isInt({ min: 1 }).withMessage('El ID de dirección debe ser un número entero positivo'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];