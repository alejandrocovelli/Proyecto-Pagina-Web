import { createContext, useState, useEffect } from "react";
import { login, getMe, register } from "../services/auth.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerHandler = async (nombre, correo, contraseña, tipo) => {
        const res = await register(nombre, correo, contraseña, tipo);
        localStorage.setItem("token", res.token);
        setUser(res.data);
    }

    const loginHandler = async (correo, contraseña) => {
        const res = await login(correo, contraseña);
        localStorage.setItem("token", res.token);
        setUser(res.user);
    };

    const logoutHandler = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const loadUser = async () => {
        try {
            setLoading(true)
            const res = await getMe();
            setUser(res.user);
        } catch {
            setUser(null);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        // Si hay token, intentamos cargar el usuario; si no, terminar comprobación
        if (localStorage.getItem("token")) {
            console.log("cargando usuario");
            loadUser();
        } else {
            // No hay token: ya terminamos la comprobación inicial
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, loginHandler, registerHandler, logoutHandler, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
