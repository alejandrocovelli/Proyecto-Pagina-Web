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

    async getCarrito(idUsuario) {
        return await sequelize.transaction(async (transaction) => {
            console.log(idUsuario);
            const carrito = await Orden.findOne({
                where: { 
                    estado: 1,
                    idUsuario
                },
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
            console.log(carrito);
            if(!carrito) throw new Error("Carrito no encontrado")

            return carrito;
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
            if(ordenData.idDireccion) {
                const direccion = await Direccion.findByPk(ordenData.idDireccion)
                if(!direccion) throw new Error("No se encontro la dirección")
            }
            
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

    // ...existing code...
    /**
     * Actualiza una orden y sus productos siguiendo la misma lógica que createOrden:
     * - Si llegan productos nuevos, se añaden
     * - Si el producto ya existe en la orden, se suman cantidades
     * - Recalcula precios y aplica descuento mayorista si corresponde
     * - Persiste cambios en OrdenProducto (update o create) y actualiza totalPago en Orden
     *
     * @param {Number} idOrden - id de la orden a actualizar
     * @param {Object} ordenData - datos opcionales: { estado, productos: [{idProducto, cantidad}], idDireccion }
     * @returns {Promise<Object>} { orden, productos }
     */
    // Reemplaza el método updateOrden por este (dentro de la clase OrdenRepository)
    async updateOrden(idOrden, ordenData) {
        return await sequelize.transaction(async (transaction) => {
            // 1) Validaciones básicas
            const orden = await Orden.findByPk(idOrden, { transaction });
            if (!orden) throw new Error("Orden no encontrada");

            const usuario = await Usuario.findByPk(orden.idUsuario, { transaction });
            if (!usuario) throw new Error("Usuario de la orden no encontrado");

            if (ordenData.idDireccion) {
                const direccion = await Direccion.findByPk(ordenData.idDireccion, { transaction });
                if (!direccion) throw new Error("Dirección no encontrada");
            }

            // 2) Obtener los OrdenProducto actuales
            const ordenProductos = await OrdenProducto.findAll({ where: { idOrden }, transaction });

            // Mapa idProducto -> instancia OrdenProducto
            const mapaOP = new Map();
            for (const op of ordenProductos) mapaOP.set(op.idProducto, op);

            // 3) Si no vienen productos en el payload, solo actualizar campos simples y recalcular total
            const incoming = Array.isArray(ordenData.productos) ? ordenData.productos : [];
            if (incoming.length === 0) {
                const campos = {};
                if (typeof ordenData.estado !== "undefined") campos.estado = ordenData.estado;
                if (typeof ordenData.idDireccion !== "undefined") campos.idDireccion = ordenData.idDireccion;

                await orden.update(campos, { transaction });

                // recalcular total desde ordenProductos existentes
                const actuales = await OrdenProducto.findAll({ where: { idOrden }, transaction });
                const total = actuales.reduce((s, p) => s + Number(p.valorTotal), 0);
                await orden.update({ totalPago: total }, { transaction });

                const ordenRecargada = await Orden.findByPk(idOrden, { include: [{ model: OrdenProducto, as: "ordenProductos" }], transaction });
                return { orden: ordenRecargada, productos: actuales };
            }

            // 4) Procesar incoming: sumar cantidades si ya existe, crear si no existe
            for (const item of incoming) {
                const idP = Number(item.idProducto);
                const qty = Number(item.cantidad);
                if (!idP || !qty || qty <= 0) throw new Error("Producto inválido en payload");

                const productoDB = await Producto.findByPk(idP, { transaction });
                if (!productoDB) throw new Error(`Producto ${idP} no encontrado`);

                if (mapaOP.has(idP)) {
                    // sumar cantidad y actualizar valor provisional con precio actual
                    const op = mapaOP.get(idP);
                    const nuevaCantidad = Number(op.cantidad) + qty;
                    const precioUnidad = Number(productoDB.precio);
                    const valorTotal = precioUnidad * nuevaCantidad;
                    await op.update({ cantidad: nuevaCantidad, precioUnidad, valorTotal }, { transaction });
                } else {
                    // crear nuevo OrdenProducto usando precio actual
                    const precioUnidad = Number(productoDB.precio);
                    const valorTotal = precioUnidad * qty;
                    const nuevo = await OrdenProducto.create({
                        idOrden,
                        idProducto: idP,
                        cantidad: qty,
                        precioUnidad,
                        valorTotal
                    }, { transaction });
                    mapaOP.set(idP, nuevo);
                }
            }

            // 5) Recalcular total con precios actuales
            const todosOP = await OrdenProducto.findAll({ where: { idOrden }, transaction });
            let totalCompra = todosOP.reduce((s, p) => s + Number(p.valorTotal), 0);

            // 6) Aplicar regla mayorista si corresponde
            if (usuario.tipo == 3 && totalCompra >= 140000) {
                // recalcular cada OrdenProducto con precioMayorista
                for (const op of todosOP) {
                    const productoDB = await Producto.findByPk(op.idProducto, { transaction });
                    const precioMayor = Number(productoDB.precioMayorista ?? productoDB.precio);
                    const valorTotal = precioMayor * Number(op.cantidad);
                    await op.update({ precioUnidad: precioMayor, valorTotal }, { transaction });
                }
                // recalcular total nuevamente
                const todos = await OrdenProducto.findAll({ where: { idOrden }, transaction });
                totalCompra = todos.reduce((s, p) => s + Number(p.valorTotal), 0);
            }

            // 7) Actualizar la orden (estado/idDireccion/totalPago)
            const actualizar = { totalPago: totalCompra };
            if (typeof ordenData.estado !== "undefined") actualizar.estado = ordenData.estado;
            if (typeof ordenData.idDireccion !== "undefined") actualizar.idDireccion = ordenData.idDireccion;

            await orden.update(actualizar, { transaction });

            // 8) Retornar orden recargada con sus productos
            const ordenFinal = await Orden.findByPk(idOrden, {
                include: [{ model: OrdenProducto, as: "ordenProductos", include: [{ model: Producto, as: "producto" }] }],
                transaction
            });

            return { orden: ordenFinal, productos: await OrdenProducto.findAll({ where: { idOrden }, transaction }) };
        });
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