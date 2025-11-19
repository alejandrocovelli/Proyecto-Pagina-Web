import axios from "axios";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "https://paperuniverse-backend.onrender.com/api",
    withCredentials: true,
});

// Agregar token antes de cada request
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Manejo global de errores
axiosClient.interceptors.response.use(
    (res) => res,
    (err) => {
        console.error("API Error:", err);

        // si el token está vencido
        if (err.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }

        return Promise.reject(err);
    }
);

export default axiosClient;