/**
 * ========================================
 * REPOSITORY: USUARIO
 * ========================================
 * Capa de acceso a datos (Data Access Layer - DAL)
 * Se comunica directamente con la base de datos.
 * Todas las consultas SQL (a través de Sequelize) se hacen aquí.
 * 
 * Responsabilidades:
 * - Implementar operaciones CRUD (Create, Read, Update, Delete) en la BD
 * - Usar transacciones para asegurar integridad de datos
 * - Consultar y manipular directamente los modelos de Sequelize
 * - Lanzar errores descriptivos para captar en el service
 * 
 * Patrón: Repository Pattern
 * Separa la lógica de acceso a datos del resto de la aplicación
 * Facilita testing y cambios en la BD sin afectar otros niveles
 */

import { sequelize } from "../config/database.js"
import { Direccion } from "../models/Direccion.js"
import { Usuario } from "../models/Usuario.js"
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';

export class UsuarioRepository {
    /**
     * Obtener lista completa de todos los usuarios
     * Incluye sus direcciones asociadas
     * 
     * @returns {Promise<Array>} Array de objetos usuario con sus direcciones
     * @throws {Error} Si no se encuentran usuarios
     */
    async getUsuarios() {
        // Usar transacción para asegurar que la lectura sea consistente
        return await sequelize.transaction(async (transaction) => {
            // Buscar todos los usuarios con sus atributos específicos
            const usuarios = await Usuario.findAll({
                attributes: [
                    "idUsuario",
                    "nombre",
                    "correo",
                    "tipo"
                    // Nota: No incluir contraseña en respuestas
                ],
                // Incluir direcciones relacionadas (eager loading)
                include: [
                    {
                        model: Direccion,
                        as: "direcciones",
                    }
                ],
                transaction
            });
            
            if(!usuarios) throw new Error("Usuarios no encontrados");
            return usuarios;
        });
    }

    /**
     * Obtener un usuario específico por su ID
     * Incluye sus direcciones asociadas
     * 
     * @param {Number} id - ID del usuario a buscar
     * @returns {Promise<Object>} Objeto usuario con sus direcciones
     * @throws {Error} Si el usuario no existe
     */
    async getUsuarioById(id) {
        return await sequelize.transaction(async (transaction) => {
            // Buscar usuario por clave primaria (ID)
            const usuario = await Usuario.findByPk(id, {
                attributes: [
                    "idUsuario",
                    "nombre",
                    "correo",
                    "tipo"
                    // No incluir contraseña
                ],
                // Incluir direcciones del usuario
                include: [
                    {
                        model: Direccion,
                        as: "direcciones",
                    }
                ],
                transaction
            });
            
            if (!usuario) throw new Error('Usuario no encontrado');
            return usuario;
        });
    }

    /**
     * Crear un nuevo usuario
     * Hash automático de la contraseña
     * Validación de correo único
     * 
     * @param {Object} usuarioData - Datos del nuevo usuario
     * @param {String} usuarioData.nombre - Nombre del usuario
     * @param {String} usuarioData.correo - Email único
     * @param {String} usuarioData.contraseña - Contraseña en texto plano (se hashea)
     * @param {Number} usuarioData.tipo - Tipo de usuario (1, 2 o 3)
     * 
     * @returns {Promise<Object>} Usuario creado (sin contraseña)
     * @throws {Error} Si el correo ya existe o hay error en la creación
     */
    async createUsuario(usuarioData) {
        return await sequelize.transaction(async (transaction) => {
            // Verificar si el correo ya existe
            const existingUser = await Usuario.findOne({
                where: { correo: usuarioData.correo }
            }, { transaction });

            if (existingUser) {
                throw new Error('Ya existe un usuario con este correo');
            }

            // Hash de la contraseña usando bcrypt
            // Salt rounds = 10 (seguridad vs velocidad)
            const salt = await bcrypt.genSalt(10);
            usuarioData.contraseña = await bcrypt.hash(usuarioData.contraseña, salt);

            // Crear el nuevo usuario en la BD
            const usuario = await Usuario.create(usuarioData, { transaction });
            
            // Retornar usuario sin contraseña
            return usuario;
        });
    }

    /**
     * Actualizar datos de un usuario existente
     * Maneja validación de correo único si se actualiza
     * Hash automático de nueva contraseña si se proporciona
     * 
     * @param {Number} id - ID del usuario a actualizar
     * @param {Object} usuarioData - Datos a actualizar (parciales)
     * 
     * @returns {Promise<Object>} Usuario actualizado
     * @throws {Error} Si usuario no existe o hay conflicto de correo
     */
    async updateUsuario(id, usuarioData) {
        return await sequelize.transaction(async (transaction) => {
            // Obtener usuario actual
            const usuario = await Usuario.findByPk(id, { transaction });
            
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            // Si se está actualizando el correo, verificar que sea único
            if (usuarioData.correo) {
                const existingUser = await Usuario.findOne({
                    where: { 
                        correo: usuarioData.correo,
                        idUsuario: { [Op.ne]: id }  // Excluir el usuario actual
                    }
                }, { transaction });

                if (existingUser) {
                    throw new Error('Ya existe un usuario con este correo');
                }
            }

            // Si se está actualizando la contraseña, hashearla
            if (usuarioData.contraseña) {
                const salt = await bcrypt.genSalt(10);
                usuarioData.contraseña = await bcrypt.hash(usuarioData.contraseña, salt);
            }

            // Actualizar usuario con los nuevos datos
            await usuario.update(usuarioData, { transaction });
            
            // Retornar usuario actualizado
            return await this.getUsuarioById(id);
        });
    }

    /**
     * Eliminar un usuario
     * También elimina todas sus relaciones (direcciones, órdenes, etc.)
     * debido a las restricciones de clave foránea
     * 
     * @param {Number} id - ID del usuario a eliminar
     * @returns {Promise<Boolean>} true si la eliminación fue exitosa
     * @throws {Error} Si usuario no existe
     */
    async deleteUsuario(id) {
        return await sequelize.transaction(async (transaction) => {
            // Buscar usuario
            const usuario = await Usuario.findByPk(id, { transaction });
            
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            // Eliminar usuario (y sus relaciones en cascada)
            await usuario.destroy({ transaction });
            return true;
        });
    }
}