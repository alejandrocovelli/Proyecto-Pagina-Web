import axiosClient from "./axios.js";

export const crearOrdenService = async (formData) => {
    try {
        console.log(formData);
        const res = await axiosClient.post("/ordenes", formData);
        return res.data;
    } catch ( e ) {
        throw new Error("Error al crear el orden");
    }
}

export const getDireccionesService = async () => {
    try {
        const res = await axiosClient.get("/direcciones");
        console.log(res);
        return res.data;
    } catch (error) {
        throw new Error("Error al obtener direcciones");
    }
};

export const crearDireccionService = async (formData) => {
    try {
        const res = await axiosClient.post("/direcciones", formData);
        return res.data;
    } catch ( error ) {
        throw new Error("Error al crear la dirección");
    }
}

export const getCarrito = async (id) => {
    try {
        const res = await axiosClient.get(`/ordenes/carrito/${id}`);
        return res.data; 
    } catch ( error ) {
        if (error.response?.status === 404) {
            return null;
        }
        throw error;
    }
}

export const updateOrdenService = async (idOrden, formData) => {
    try {
        console.log(idOrden, formData);
        const res = await axiosClient.put(`/ordenes/${idOrden}`, formData);
        return res.data;
    } catch ( e ) {
        throw new Error("Error al crear el orden");
    }
}

export const updateOrdenProducto = async (idOrdenProducto, body) => {
    try {
        const res = await axiosClient.put(`/ordenesProductos/${idOrdenProducto}`, body);
        return res.data;
    } catch ( error ) {
        throw new Error("Error al actualizar orden-producto");
    }
}

export const deleteOrdenProducto = async (id) => {
    try {
        const res = await axiosClient.delete(`/ordenesProductos/${id}`);
        return res.data; 
    } catch ( error ) {
        throw new Error("Error al eliminar el producto de la orden");
    }
}
