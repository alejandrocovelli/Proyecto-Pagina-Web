import { body } from "express-validator";
import { validateResult } from "./validatorUtils.js";

export const validateLogin = [
    body('nombre')
        .exists().withMessage('El nombre es requerido')
        .not().isEmpty().withMessage('El nombre no puede estar vacío')
        .isString().withMessage('El nombre debe ser un texto')
        .isLength({ min: 1, max: 45 }).withMessage('El nombre debe tener entre 2 y 45 caracteres'),
    body('contraseña')
        .exists().withMessage('La contraseña es requerida')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
        .withMessage('La contraseña debe contener al menos una letra y un número'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];