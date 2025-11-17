import axiosClient from "./axios.js";

export const login = async (correo, contraseña) => {
    try {
        const res = await axiosClient.post("/login", { correo, contraseña });
        return res.data; 
    } catch ( e ) {
        throw new Error("Error al iniciar sesión");
    }
}

export const register = async(nombre, correo, contraseña, tipo) => {
    try {
        const res = await axiosClient.post("/usuarios", {nombre, correo, contraseña, tipo});
        return res.data;
    } catch (e) {
        throw new Error("Error al registrarse");
    }
}

export const getMe = () =>
    axiosClient.get("/me");
