/**
 * ========================================
 * REPOSITORY: ORDEN
 * ========================================
 * Capa de acceso a datos para órdenes/pedidos
 * Gestiona todas las operaciones CRUD de órdenes
 * 
 * Responsabilidades:
 * - Consultar órdenes con productos asociados
 * - Crear órdenes con cálculo de precios
 * - Aplicar descuentos mayoristas según tipo de cliente
 * - Crear registros en tabla junction (OrdenProducto)
 * - Usar transacciones para integridad
 * 
 * Lógica de negocio crítica:
 * - Clientes tipo 3 (mayoristas) reciben descuento si total >= $140,000
 * - Se almacena precio unitario y total en tiempo de compra
 * - Cada orden tiene múltiples productos relacionados
 */

import { Orden } from "../models/Orden.js";
import { Usuario } from "../models/Usuario.js";
import { OrdenProducto } from "../models/OrdenProducto.js";
import { Producto } from "../models/Producto.js";
import { sequelize } from "../config/database.js";
import { Direccion } from "../models/Direccion.js";

export class OrdenRepository {
    /**
     * Obtener todas las órdenes
     * Incluye usuario propietario y todos los productos en la orden
     * 
     * @returns {Promise<Array>} Array con todas las órdenes y sus productos
     * @throws {Error} Si no se encuentran órdenes
     */
    async getOrdenes() {
        return await sequelize.transaction(async (transaction) => {
            const ordenes = await Orden.findAll({
                attributes: [
                    "idOrden",
                    "estado",
                    "totalPago",
                ],
                include: [
                    {
                        model: Usuario,
                        as: "usuario",
                        attributes: ["idUsuario", "nombre"]
                    },
                    {
                        model: OrdenProducto,
                        as: "ordenProductos",
                        include: [
                            {
                                model: Producto,
                                as: "producto"
                            }
                        ]
                    }
                ],
                transaction
            })
            if(!ordenes) throw new Error("Órdenes no encontradas")

            return ordenes;
        })
    }

    /**
     * Obtener orden específica por ID
     * Incluye todos los productos de la orden
     * 
     * @param {Number} id - ID de la orden
     * @returns {Promise<Object>} Objeto orden con usuario y productos
     * @throws {Error} Si la orden no existe
     */
    async getOrdenById(id) {
        return await sequelize.transaction(async (transaction) => {
            const orden = await Orden.findByPk(id, {
                attributes: [
                    "idOrden",
                    "estado",
                    "totalPago",
                ],
                include: [
                    {
                        model: Usuario,
                        as: "usuario",
                        attributes: ["idUsuario", "nombre"]
                    },
                    {
                        model: OrdenProducto,
                        as: "ordenProductos",
                        include: [
                            {
                                model: Producto,
                                as: "producto"
                            }
                        ]
                    }
                ],
                transaction
            })
            if(!orden) throw new Error("Orden no encontrada")

            return orden;
        })
    }

    /**
     * Crear nueva orden con validaciones y cálculo de precios
     * 
     * LÓGICA CRÍTICA:
     * 1. Valida que el usuario exista y no sea admin (tipo != 1)
     * 2. Valida que la dirección de entrega exista
     * 3. Para cada producto solicitado:
     *    - Busca el producto
     *    - Calcula cantidad × precio
     * 4. SI usuario tipo 3 (mayorista) Y total >= 140,000:
     *    - APLICA DESCUENTO: usa precio mayorista (precioMayorista)
     *    - Recalcula total con precios mayoristas
     * 5. Crea registro en tabla Orden
     * 6. Crea registros en tabla OrdenProducto (junction)
     * 
     * @param {Object} ordenData - Datos de la orden
     *   - idUsuario: ID del cliente (requerido)
     *   - idDireccion: ID de dirección de entrega (requerido)
     *   - estado: Estado inicial de la orden
     *   - productos: Array de {idProducto, cantidad}
     * 
     * @returns {Promise<Object>} {orden: Object, productos: Array}
     * @throws {Error} Si falta usuario, dirección, o usuario es admin
     */
    async createOrden(ordenData) {
        return await sequelize.transaction(async (transaction) => {
            // VALIDACION 1: Usuario existe y no es admin
            const usuarioLogueado = await Usuario.findByPk(ordenData.idUsuario)
            if(!usuarioLogueado) throw new Error("No se encontro al usuario")
            
            // VALIDACION 2: Dirección de entrega existe
            const direccion = await Direccion.findByPk(ordenData.idDireccion)
            if(!direccion) throw new Error("No se encontro la dirección")
            
            // VALIDACION 3: Admin no puede comprar
            if(usuarioLogueado.tipo == 1) {
                throw new Error("El administrador no puede comprar")
            }

            // Extrae array de productos del body
            const { productos, ...dataOrden } = ordenData;

            // PASO 1: Calcula precios normales para cada producto
            const productosCliente = await Promise.all(productos.map(async (item) => {
                const producto = await Producto.findByPk(item.idProducto, {transaction});
                if (!producto) throw new Error(`Producto ${item.idProducto} no encontrado`)
                return {
                    cantidad: item.cantidad,
                    precioUnidad: producto.precio,
                    valorTotal: producto.precio * item.cantidad,
                    idProducto: producto.idProducto
                }
            }))

            // PASO 2: Calcula total inicial
            let totalCompra = productosCliente.reduce((acumulador, producto) => acumulador + producto.valorTotal, 0);
            let productosClienteMayorista = []
            
            // PASO 3: Aplicar descuento mayorista si aplica
            // Condiciones:
            // - Usuario tipo 3 (mayorista)
            // - Total >= $140,000
            if (usuarioLogueado.tipo == 3 && totalCompra >= 140000) {
                // Recalcula cada producto con precio mayorista
                productosClienteMayorista = await Promise.all(productosCliente.map(async (item) => {
                    const producto = await Producto.findByPk(item.idProducto, {transaction});
                    return {
                        cantidad: item.cantidad,
                        precioUnidad: producto.precioMayorista,
                        valorTotal: producto.precioMayorista * item.cantidad,
                        idProducto: ordenData.idProducto
                    }
                }))
                // Recalcula total con precios mayoristas
                totalCompra = productosClienteMayorista.reduce((acumulador, producto) => acumulador + producto.valorTotal, 0)
            }

            // PASO 4: Crea el registro de Orden
            const nuevaOrden = {
                estado: ordenData.estado,
                totalPago: totalCompra,
                idUsuario: ordenData.idUsuario,
                idDireccion: ordenData.idDireccion
            }

            const orden = await Orden.create(nuevaOrden, { transaction })
            if(!orden) throw new Error("Error al crear la orden")

            // PASO 5: Crea registros OrdenProducto (tabla junction)
            // Si aplica mayorista, usa productosClienteMayorista
            // Si no, usa productosCliente
            const ordenesProductos = productosClienteMayorista.length > 0 
                ? await Promise.all(productosClienteMayorista.map(async (item) => {
                    await OrdenProducto.create({
                        ...item,
                        idOrden: orden.idOrden
                    }, {transaction})
                }))
                : await Promise.all(productosCliente.map(async (item) => {
                    await OrdenProducto.create({
                        ...item,
                        idOrden: orden.idOrden
                    }, {transaction})
                }))

            return { orden: orden, productos: ordenesProductos };
        })
    }

    /**
     * Actualizar orden existente
     * Típicamente para cambiar estado (pendiente, en-preparación, enviado, entregado)
     * 
     * @param {Number} id - ID de la orden
     * @param {Object} ordenData - Datos a actualizar {estado, totalPago}
     * @returns {Promise<Object>} Orden actualizada
     * @throws {Error} Si la orden no existe
     */
    async updateOrden(id, ordenData) {
        return await sequelize.transaction(async (transaction) => {
            const orden = await Orden.findByPk(id, { transaction })
            if(!orden) throw new Error("Orden no encontrada")

            await orden.update(ordenData, { transaction })
            return orden;
        })
    }

    /**
     * Eliminar orden
     * 
     * @param {Number} id - ID de la orden
     * @returns {Promise<Boolean>} true si fue eliminada
     * @throws {Error} Si la orden no existe
     */
    async deleteOrden(id) {
        return await sequelize.transaction(async (transaction) => {
            const orden = await Orden.findByPk(id, { transaction })
            if(!orden) throw new Error("Orden no encontrada")

            await orden.destroy({ transaction })
            return true;
        })
    }
}