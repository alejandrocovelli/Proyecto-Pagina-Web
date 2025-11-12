/**
 * ========================================
 * VALIDADORES: CATEGORIA
 * ========================================
 * Define reglas de validación para datos de categorías
 * Valida nombre y ID de categoría
 */

import { body, check, param } from "express-validator";
import { validateResult } from "./validatorUtils.js";

/**
 * Validador para CREAR CATEGORIA
 * Valida que el nombre sea válido
 * 
 * Campo requerido:
 * - nombre: String, 2-45 caracteres
 */
export const validateCreateCategoria = [
    body('nombre')
        .exists().withMessage('El nombre es requerido')
        .not().isEmpty().withMessage('El nombre no puede estar vacío')
        .isString().withMessage('El nombre debe ser un texto')
        .isLength({ min: 2, max: 45 }).withMessage('El nombre debe tener entre 2 y 45 caracteres'),
    
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

/**
 * Validador para ACTUALIZAR CATEGORIA
 * Todos los campos son opcionales
 */
export const validateUpdateCategoria = [
    body('nombre')
        .optional()
        .isString().withMessage('El nombre debe ser un texto')
        .isLength({ min: 2, max: 45 }).withMessage('El nombre debe tener entre 2 y 45 caracteres'),
    
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

/**
 * Validador para ID DE CATEGORIA
 * Valida el parámetro idCategoria en rutas
 */
export const validateCategoriaId = [
    param('idCategoria')
        .exists().withMessage('El ID de categoría es requerido')
        .isInt({ min: 1 }).withMessage('El ID de categoría debe ser un número entero positivo'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];