import { sequelize } from "../config/database.js"
import { Direccion } from "../models/Direccion.js"
import { Usuario } from "../models/Usuario.js"
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';

export class UsuarioRepository {
    async getUsuarios() {
        return await sequelize.transaction(async (transaction) => {
            const usuarios = await Usuario.findAll({
                attributes: [
                    "idUsuario",
                    "nombre",
                    "correo",
                    "tipo"
                ],
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
            const usuario = await Usuario.findByPk(id, {
                attributes: [
                    "idUsuario",
                    "nombre",
                    "correo",
                    "tipo"
                ],
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

            // Hash de la contraseña
            const salt = await bcrypt.genSalt(10);
            usuarioData.contraseña = await bcrypt.hash(usuarioData.contraseña, salt);

            const usuario = await Usuario.create(usuarioData, { transaction });
            
            // Retornar usuario sin contraseña
            return usuario;
        });
    }

    async updateUsuario(id, usuarioData) {
        return await sequelize.transaction(async (transaction) => {
            const usuario = await Usuario.findByPk(id, { transaction });
            
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            // Si se está actualizando el correo, verificar que no exista
            if (usuarioData.correo) {
                const existingUser = await Usuario.findOne({
                    where: { 
                        correo: usuarioData.correo,
                        idUsuario: { [Op.ne]: id }
                    }
                }, { transaction });

                if (existingUser) {
                    throw new Error('Ya existe un usuario con este correo');
                }
            }

            // Hash de la contraseña si se está actualizando
            if (usuarioData.contraseña) {
                const salt = await bcrypt.genSalt(10);
                usuarioData.contraseña = await bcrypt.hash(usuarioData.contraseña, salt);
            }

            await usuario.update(usuarioData, { transaction });
            
            // Retornar usuario actualizado
            return await this.getUsuarioById(id);
        });
    }

    async deleteUsuario(id) {
        return await sequelize.transaction(async (transaction) => {
            const usuario = await Usuario.findByPk(id, { transaction });
            
            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            await usuario.destroy({ transaction });
            return true;
        });
    }
}