import { createContext, useState, useEffect } from "react";
import { login, getMe } from "../services/auth.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loginHandler = async (correo, contraseña) => {
        const res = await login(correo, contraseña);
        console.log(res);
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
        <AuthContext.Provider value={{ user, loginHandler, logoutHandler }}>
            {children}
        </AuthContext.Provider>
    );
};
