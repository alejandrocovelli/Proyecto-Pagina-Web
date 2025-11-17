import { useState } from "react"
import Header from "../components/header"
import TabNavegacion from "../components/TabNavegacion"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth.js"

export default function Login() {
    const { loginHandler } = useAuth();
    const [activeTab, setActiveTab] = useState("Inicio de Sesion")
    const navigate = useNavigate();
    // Campos comunes
    const [correo, setCorreo] = useState("")
    const [contraseña, setContraseña] = useState("")

    // Campo solo para registro
    const [nombre, setNombre] = useState("")

    const handleSubmit = async (e) => {
		try {
            e.preventDefault();
            if (activeTab === "Inicio de Sesion") {
                console.log(correo, contraseña);
                await loginHandler(correo, contraseña);
                // El AuthContext se encargará de obtener la información del usuario
                // redirigir a la página de inicio
                navigate("/");
            } else {
                // Aqui va el register
            }
		} catch (error) {
			console.error("Error al iniciar sesión. Por favor, verifica tus credenciales.");
		}
	};

    const isLogin = activeTab === "Inicio de Sesion"

    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header currentPage={isLogin ? "Login" : "Registro"} />

            <div className={`relative flex-1 bg-customBlue2 flex flex-col items-center overflow-hidden ${isLogin ? 'justify-start' : 'justify-end'}`}>

                <div className={`z-10 text-center ${isLogin ? 'block' : 'hidden'}`}>
                    <img src="../../logoPaperUniverse.svg" alt="logo" className="hidden md:block h-40 md:h-60 mx-auto" />
                </div>

                <div className={`transition-all duration-300 relative z-10 bg-blue-300/90 p-6 mx-4 ${isLogin ? 'rounded-3xl w-[60vw] h-[50vh]' : 'rounded-t-3xl w-[80vw] h-[80vh]'}`}>
                    {/* Tabs */}
                    <div className="mb-4">
                        <TabNavegacion tabs={["Inicio de Sesion", "Registrarse"]} activeTab={activeTab} onChange={setActiveTab} />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 px-6">
                        {/* Nombre solo en registro */}
                        {!isLogin && (
                            <div>
                                <label className="text-white text-sm block mb-2">Nombre</label>
                                <input
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    className="w-full bg-white text-gray-800 rounded-full px-4 py-2 border-2 border-customPurple1 focus:border-customPurple1 focus:ring-2 focus:ring-customPurple1 outline-none transition"
                                    placeholder="Tu nombre"
                                />
                            </div>
                        )}

                        <div>
                            <label className="text-white text-sm block mb-2">Correo electronico</label>
                            <input
                                type="correo"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                className="w-full bg-white text-gray-800 rounded-full px-4 py-2 border-2 border-customPurple1 focus:border-customPurple1 focus:ring-2 focus:ring-customPurple1 outline-none transition"
                                placeholder="tu@gmail.com"
                            />
                        </div>

                        <div>
                            <label className="text-white text-sm block mb-2">Contraseña</label>
                            <input
                                type="password"
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                                className="w-full bg-white text-gray-800 rounded-full px-4 py-2 border-2 border-customPurple1 focus:border-customPurple1 focus:ring-2 focus:ring-customPurple1 outline-none transition"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* En login mostramos link olvido contraseña; en registro una nota */}
                        {isLogin ? (
                            <div className="flex justify-between items-center">
                                <a href="#" className="text-white text-sm underline">Olvidé la contraseña</a>
                                <span></span>
                            </div>
                        ) : (
                            <p className="text-white text-sm">Al registrarte aceptas nuestros términos y condiciones.</p>
                        )}

                        <button
                            type="submit"
                            className={`w-40 mx-auto block bg-customPurple1 hover:bg-purple-600 text-white font-bold py-2 rounded-full transition mt-6`}
                        >
                            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
