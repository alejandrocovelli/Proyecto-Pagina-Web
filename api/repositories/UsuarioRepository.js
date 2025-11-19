import { sequelize } from "../config/database.js"
import { Direccion } from "../models/Direccion.js"
import { Usuario } from "../models/Usuario.js"
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';

export class UsuarioRepository {
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