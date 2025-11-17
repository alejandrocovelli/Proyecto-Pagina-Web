import { createContext, useState, useEffect } from "react";
import { login, getMe, register } from "../services/auth.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

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
            const res = await getMe();
            setUser(res.user);
        } catch {
            setUser(null);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) loadUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loginHandler, registerHandler, logoutHandler }}>
            {children}
        </AuthContext.Provider>
    );
};
