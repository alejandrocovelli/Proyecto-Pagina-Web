import axiosClient from "./axios.js";

export const crearCategoriaService = async ({ nombre } = {}) => {
    try {
        const res = await axiosClient.post("/categorias", { nombre });
        return res.data;
    } catch ( e ) {
        throw new Error("Error al crear la categoría");
    }
}

export const crearProductoService = async (formData) => {
    try {
        const res = await axiosClient.post("/productos", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch ( e ) {
        throw new Error("Error al crear el producto");
    }
}

export const getCategoriasService = async () => {
    try {
        const res = await axiosClient.get("/categorias");
        return res.data; 
    } catch ( e ) {
        throw new Error("Error al cargar categorías");
    }
}

export const getProductosService = async ({ idCategoria, limit } = {}) => {
    try {
        const res = await axiosClient.get("/productos", {
            params: {
                idCategoria,
                limit,
            }
        });
        return res.data; 
    } catch ( e ) {
        throw new Error("Error al cargar los productos");
    }
}

export const getProductoById = async (id) => {
    try {
        const res = await axiosClient.get(`/productos/${id}`);
        return res.data; 
    } catch ( e ) {
        throw new Error("Error al cargar los productos");
    }
}

