import { useEffect, useState } from "react";
import CategoriaCard from "../components/CategoriaCard";
import Header from "../components/header";
import { getCategoriasService } from "../services/ProductoService";
import ModalCrearCategoria from "../components/ModalCrearCategoria";
import { crearCategoriaService } from "../services/ProductoService";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../context/ToastContext.jsx";
import fondo from "../../public/Group 69.png"

export default function Catalogo() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openCategoriaModal, setOpenCategoriaModal] = useState(false);
    const { user } = useAuth();
    const { showToast } = useToast();

    const getCategorias = async () => {
        setLoading(true);
        try {
            const response = await getCategoriasService();
            setCategorias(response.data);
        } catch (error) {
            console.error("Error al cargar categorias:", error);
            showToast({ type: 'error', message: 'Error al cargar las categorías' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategorias();
    }, [])

    const handleCrearCategoria = async (nuevaCategoria) => {
        try {
            const data = await crearCategoriaService(nuevaCategoria);
            // consola para debugging
            showToast({ type: 'success', message: 'Categoría creada exitosamente' });
            // recargar listado de categorias
            await getCategorias();
        } catch (error) {
            console.error("Error creando categoría:", error);
            showToast({ type: 'error', message: 'Error al crear la categoría' });
        }
    };

    return (
        <div className="w-full h-screen">
            <Header currentPage="Catalogo" />

            {/* Hero Banner */}
            <div className="relative w-full h-2/5 bg-gray-900 overflow-hidden">
                <img src="../../Banner.jpg" alt="Catalogo" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end pb-10">
                    <h1 className="text-white text-5xl font-bold ml-8">Catálogo</h1>
                </div>
            </div>

            {/* Categorias Grid */}
            <section style={{ backgroundImage: `url(${fondo})` }} className="relative py-12 px-8 bg-customBlue2 bg-cover bg-center w-screen">
                {user && user.tipo == 1 && <button
                    className="absolute right-5 top-2 bg-customPurple1 text-white px-5 py-2 rounded text-sm hover:bg-purple-600 transition"
                    onClick={() => setOpenCategoriaModal(true)}
                >
                    +
                </button>}
                <div className="relative">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-40">
                            {loading ? (
                                <p>Cargando categorias...</p>
                            ) :
                                categorias.map((categoria) => (
                                    <CategoriaCard key={categoria.idCategoria} image={categoria.productos[0]?.foto} nombre={categoria.nombre} idCategoria={categoria.idCategoria} />
                                ))
                            }
                        </div>
                    </div>
                </div>
                <ModalCrearCategoria
                    open={openCategoriaModal}
                    setOpen={setOpenCategoriaModal}
                    onSubmit={handleCrearCategoria}
                />
            </section>
        </div>
    )
}