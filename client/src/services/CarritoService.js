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