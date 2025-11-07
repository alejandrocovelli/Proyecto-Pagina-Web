import { Usuario } from "./Usuario.js";
import { Direccion } from "./Direccion.js";
import { Categoria } from "./Categoria.js";
import { Orden } from "./Orden.js";
import { OrdenProducto } from "./OrdenProducto.js";
import { Producto } from "./Producto.js";

export const applyAssociations = () => {
    Usuario.hasMany(Direccion, {
        foreignKey: "idUsuario",
        as: "direcciones",
    });

    Direccion.belongsTo(Usuario, {
        foreignKey: "idUsuario",
        as: "usuario",
    });

    Categoria.hasMany(Producto, {
        foreignKey: "idCategoria",
        as: "productos",
    });

    Producto.belongsTo(Categoria, {
        foreignKey: "idCategoria",
        as: "categoria",
    });

    Usuario.hasMany(Orden, {
        foreignKey: "idUsuario",
        as: "ordenes",
    });

    Orden.belongsTo(Usuario, {
        foreignKey: "idUsuario",
        as: "usuario",
    });

    Direccion.hasMany(Orden, {
        foreignKey: "idDireccion",
        as: "ordenes",
    });

    Orden.belongsTo(Direccion, {
        foreignKey: "idDireccion",
        as: "direccion",
    });

    Orden.hasMany(OrdenProducto, {
        foreignKey: "idOrden",
        as: "ordenProductos",
    });

    OrdenProducto.belongsTo(Orden, {
        foreignKey: "idOrden",
        as: "orden",
    });

    Producto.hasMany(OrdenProducto, {
        foreignKey: "idProducto",
        as: "ordenProductos",
    });

    OrdenProducto.belongsTo(Producto, {
        foreignKey: "idProducto",
        as: "producto",
    });
};