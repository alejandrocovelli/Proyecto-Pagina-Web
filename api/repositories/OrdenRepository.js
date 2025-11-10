import { Orden } from "../models/Orden.js";
import { Usuario } from "../models/Usuario.js";
import { OrdenProducto } from "../models/OrdenProducto.js";
import { Producto } from "../models/Producto.js";
import { sequelize } from "../config/database.js";
import { Direccion } from "../models/Direccion.js";

export class OrdenRepository {
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

    async createOrden(ordenData) {
        return await sequelize.transaction(async (transaction) => {
            const usuarioLogueado = await Usuario.findByPk(ordenData.idUsuario)
            if(!usuarioLogueado) throw new Error("No se encontro al usuario")
            
                const direccion = await Direccion.findByPk(ordenData.idDireccion)
            if(!direccion) throw new Error("No se encontro la dirección")
            
                if(usuarioLogueado.tipo == 1) {
                throw new Error("El administrador no puede comprar")
            }

            const { productos, ...dataOrden } = ordenData;

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

            let totalCompra = productosCliente.reduce((acumulador, producto) => acumulador + producto.valorTotal, 0);
            let productosClienteMayorista = []
            
            if (usuarioLogueado.tipo == 3 && totalCompra >= 140000) {
                productosClienteMayorista = await Promise.all(productosCliente.map(async (item) => {
                    const producto = await Producto.findByPk(item.idProducto, {transaction});
                    return {
                        cantidad: item.cantidad,
                        precioUnidad: producto.precioMayorista,
                        valorTotal: producto.precioMayorista * item.cantidad,
                        idProducto: ordenData.idProducto
                    }
                }))
                totalCompra = productosClienteMayorista.reduce((acumulador, producto) => acumulador + producto.valorTotal, 0)
            }

            const nuevaOrden = {
                estado: ordenData.estado,
                totalPago: totalCompra,
                idUsuario: ordenData.idUsuario,
                idDireccion: ordenData.idDireccion
            }

            const orden = await Orden.create(nuevaOrden, { transaction })
            if(!orden) throw new Error("Error al crear la orden")

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

    async updateOrden(id, ordenData) {
        return await sequelize.transaction(async (transaction) => {
            const orden = await Orden.findByPk(id, { transaction })
            if(!orden) throw new Error("Orden no encontrada")

            await orden.update(ordenData, { transaction })
            return orden;
        })
    }

    async deleteOrden(id) {
        return await sequelize.transaction(async (transaction) => {
            const orden = await Orden.findByPk(id, { transaction })
            if(!orden) throw new Error("Orden no encontrada")

            await orden.destroy({ transaction })
            return true;
        })
    }
}