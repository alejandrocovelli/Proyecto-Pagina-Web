/**
 * ========================================
 * SERVICE: USUARIO
 * ========================================
 * Capa de lógica de negocio (Business Logic Layer - BLL)
 * Intermediaria entre el controlador y el repository
 * 
 * Responsabilidades:
 * - Aplicar reglas de negocio
 * - Procesar datos antes de guardar/devolver
 * - Manejar errores y convertirlos en respuestas consistentes
 * - Coordinar múltiples operaciones de BD si es necesario
 * - Validaciones más complejas que las del validador
 * 
 * Patrón: Service/Business Logic Layer
 * La lógica de negocio está centralizada y separada del acceso a datos
 */
import { UsuarioRepository } from "../repositories/UsuarioRepository.js";
import jwt from "jsonwebtoken";

export class UsuarioService {
    /**
     * Constructor: Inicializar el repositorio
     * Se crea una instancia del repository para usar sus métodos
     */
    constructor() {
        this.usuarioRepository = new UsuarioRepository();
    }

    /**
     * Obtener lista de todos los usuarios
     * Aplica lógica de negocio y formatea respuesta
     * 
     * @returns {Promise<Object>} Objeto con éxito y array de usuarios
     * @throws {Error} Si hay error en el repositorio
     */
    async getUsuarios() {
        try {
            // Llamar al repository para obtener usuarios
            const users = await this.usuarioRepository.getUsuarios();
            
            // Retornar respuesta consistente
            return { success: true, data: users };
        } catch (error) {
            // Capturar y re-lanzar error con contexto
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    }

    /**
     * Obtener usuario específico por ID
     * 
     * @param {Number} id - ID del usuario a obtener
     * @returns {Promise<Object>} Objeto con éxito y datos del usuario
     * @throws {Error} Si usuario no existe o hay error en BD
     */
    async getUsuarioById(id) {
        try {
            // Validar que el ID sea válido
            if (!id || isNaN(id)) {
                throw new Error('ID de usuario inválido');
            }

            // Obtener usuario del repositorio
            const usuario = await this.usuarioRepository.getUsuarioById(id);
            
            // Retornar respuesta
            return { success: true, data: usuario };
        } catch (error) {
            throw new Error(`Error al obtener usuario: ${error.message}`);
        }
    }

    /**
     * Crear un nuevo usuario
     * 
     * @param {Object} usuarioData - Datos del nuevo usuario
     * @returns {Promise<Object>} Objeto con éxito y usuario creado
     * @throws {Error} Si hay error en validación o BD
     */
    async createUsuario(usuarioData) {
        try {
            // El repositorio maneja:
            // - Validación de correo único
            // - Hash de contraseña
            const usuario = await this.usuarioRepository.createUsuario(usuarioData);
            console.log(usuario.dataValues);
            const token = jwt.sign(
                { 
                    idUsuario: usuario.dataValues.idUsuario,  // ID del usuario
                    tipo: usuario.dataValues.tipo              // Tipo/rol del usuario
                },
                process.env.JWT_SECRET,          // Clave secreta para firmar
                { expiresIn: "1h" }              // Token válido por 1 hora
            );
            console.log(token);
            return { success: true, token, data: usuario };
        } catch (error) {
            throw new Error(`Error al crear usuario: ${error.message}`);
        }
    }

    /**
     * Actualizar usuario existente
     * 
     * @param {Number} id - ID del usuario a actualizar
     * @param {Object} usuarioData - Datos a actualizar (parciales)
     * @returns {Promise<Object>} Objeto con éxito y usuario actualizado
     * @throws {Error} Si usuario no existe o hay error en BD
     */
    async updateUsuario(id, usuarioData) {
        try {
            // Validar ID
            if (!id || isNaN(id)) {
                throw new Error('ID de usuario inválido');
            }

            // Actualizar usuario
            const usuario = await this.usuarioRepository.updateUsuario(id, usuarioData);
            
            return { success: true, data: usuario };
        } catch (error) {
            throw new Error(`Error al actualizar usuario: ${error.message}`);
        }
    }

    /**
     * Eliminar usuario
     * 
     * @param {Number} id - ID del usuario a eliminar
     * @returns {Promise<Object>} Objeto con éxito y mensaje
     * @throws {Error} Si usuario no existe o hay error en BD
     */
    async deleteUsuario(id) {
        try {
            // Validar ID
            if (!id || isNaN(id)) {
                throw new Error('ID de usuario inválido');
            }

            // Eliminar usuario
            await this.usuarioRepository.deleteUsuario(id);
            
            return { success: true, message: "Usuario eliminado correctamente" };
        } catch (error) {
            throw new Error(`Error al eliminar usuario: ${error.message}`);
        }
    }
}