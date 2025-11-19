import { check } from "express-validator";
import { validationResult } from "express-validator";

export const validateResult = (req, res, next) => {
    try {
        // Obtener los errores de validación encontrados
        // Si hay errores, throw() lanza una excepción
        validationResult(req).throw();
        
        // Si no hay errores, continuar al siguiente middleware
        return next();
    } catch (err) {
        res.status(400).json({
            success: false,
            errors: err.array()
        });
    }
};