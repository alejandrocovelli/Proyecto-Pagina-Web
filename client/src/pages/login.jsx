import { useState } from "react"
import Header from "../components/header"
import TabNavegacion from "../components/TabNavegacion"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth.js"
import fondo from "../../public/Group 69.png"

export default function Login() {
    const { loginHandler, registerHandler } = useAuth();
    const [activeTab, setActiveTab] = useState("Inicio de Sesion")
    const navigate = useNavigate();
    // Campos comunes
    const [correo, setCorreo] = useState("")
    const [contraseña, setContraseña] = useState("")

    // Campo solo para registro
    const [nombre, setNombre] = useState("")
    const [tipo, setTipo] = useState("")

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
                await registerHandler(nombre, correo, contraseña, tipo);
                navigate("/");
            }
		} catch (error) {
			console.error("Error al iniciar sesión. Por favor, verifica tus credenciales.");
		}
	};

    const isLogin = activeTab === "Inicio de Sesion"

    return (
        <div className="w-full min-h-screen flex flex-col bg-customBlue2">
            <Header currentPage={isLogin ? "Login" : "Registro"} />

            <div style={{ backgroundImage: `url(${fondo})` }} className={`relative flex-1 bg-cover bg-center w-full flex flex-col items-center overflow-y-auto ${isLogin ? 'justify-center' : 'justify-end'}`}>

                <div className={`z-10 text-center mt-4 md:mt-8 ${isLogin ? 'block' : 'hidden'}`}>
                    <img src="../../logoPaperUniverse.svg" alt="logo" className="hidden md:block h-40 md:h-60 mx-auto" />
                </div>

                <div className={`transition-all duration-300 relative z-20 bg-blue-300/90 p-6 shadow-xl mx-auto w-[90vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] ${isLogin ? 'rounded-3xl' : 'rounded-t-3xl'} min-h-[300px] max-h-[85vh] overflow-y-auto`}>
                    {/* Tabs */}
                    <div className="mb-4">
                        <TabNavegacion tabs={["Inicio de Sesion", "Registrarse"]} activeTab={activeTab} onChange={setActiveTab} />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Nombre solo en registro */}
                        {!isLogin && (
                            <div>
                                <label className="text-white text-sm block mb-2">Nombre</label>
                                <input
                                    type="text"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    className="w-full bg-white text-gray-800 rounded-full px-4 py-2 border-2 border-customPurple1 focus:ring-customPurple1 transition"
                                    placeholder="Tu nombre"
                                />
                            </div>
                        )}

                        <div>
                            <label className="text-white text-sm block mb-2">Correo electrónico</label>
                            <input
                                type="correo"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                className="w-full bg-white text-gray-800 rounded-full px-4 py-2 border-2 border-customPurple1 focus:ring-customPurple1 transition"
                                placeholder="tu@gmail.com"
                            />
                        </div>

                        <div>
                            <label className="text-white text-sm block mb-2">Contraseña</label>
                            <input
                                type="password"
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                                className="w-full bg-white text-gray-800 rounded-full px-4 py-2 border-2 border-customPurple1 focus:ring-customPurple1 transition"
                                placeholder="••••••••"
                            />
                        </div>

                        {!isLogin && (
                            <div>
                                <label className="text-white text-sm block mb-2">Tipo de usuario</label>

                                <select
                                    name="tipo"
                                    value={tipo}
                                    onChange={(e) => setTipo(e.target.value)}
                                    className="w-full bg-white text-gray-800 rounded-full px-4 py-2 border-2 border-customPurple1 focus:ring-customPurple1 transition"
                                >
                                    <option value="">Seleccione un tipo...</option>
                                    <option value={1}>Administrador</option>
                                    <option value={2}>Cliente normal</option>
                                    <option value={3}>Cliente mayorista</option>
                                </select>
                            </div>
                        )}

                        {/* En login mostramos link olvido contraseña; en registro una nota */}
                        {isLogin ? (
                            <div></div>
                        ) : (
                            <p className="text-white text-xs text-center pt-2">Al registrarte aceptas nuestros términos y condiciones.</p>
                        )}

                        <button
                            type="submit"
                            className={`w-44 mx-auto block bg-customPurple1 hover:bg-purple-600 text-white font-bold py-2 rounded-full transition mt-6`}
                        >
                            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
