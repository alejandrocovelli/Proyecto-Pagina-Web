import { createContext, useState, useEffect } from "react";
import { login, getMe, register } from "../services/auth.js";
import { useToast } from "./ToastContext.jsx";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    const registerHandler = async (nombre, correo, contraseña, tipo) => {
        try {
            const res = await register(nombre, correo, contraseña, tipo);
            localStorage.setItem("token", res.token);
            setUser(res.data);
            showToast({ type: 'success', message: 'Registro exitoso. Bienvenido.' })
            return res
        } catch (err) {
            const msg = err?.response?.data?.mensaje || err?.message || 'Error al registrarse';
            showToast({ type: 'error', message: msg })
            throw err
        }
    }

    const loginHandler = async (correo, contraseña) => {
        try {
            const res = await login(correo, contraseña);
            localStorage.setItem("token", res.token);
            setUser(res.user);
            showToast({ type: 'success', message: 'Has iniciado sesión.' })
            return res
        } catch (err) {
            const msg = err?.response?.data?.mensaje || err?.message || 'Error al iniciar sesión';
            showToast({ type: 'error', message: msg })
            throw err
        }
    };

    const logoutHandler = () => {
        localStorage.removeItem("token");
        setUser(null);
        showToast({ type: 'info', message: 'Has cerrado sesión.' })
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
