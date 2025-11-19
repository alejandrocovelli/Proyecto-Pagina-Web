
import { useEffect, useState } from "react";
import Header from "../components/Header"
import ProductoCard from "../components/ProductoCard"
import { getProductosService } from "../services/ProductoService";
import fondo from "../../public/Group 69.png"

export default function Inicio() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);

    const getProductos = async () => {
		setLoading(true);
		try {
            const filtros = {};
            filtros.limit = 4;
			const response = await getProductosService(filtros);
			setProductos(response.data);
		} catch (error) {
			console.error("Error al cargar productos:", error);
		} finally {
			setLoading(false);
		}
	};

    useEffect(() => {
        getProductos();
    }, [])

    return (
        <div className="w-full min-h-screen">
            <Header currentPage="Inicio" />

            {/* Hero Banner */}
            <div className="relative w-full h-64 sm:h-96 lg:h-[50vh] overflow-hidden">
                <img src="../../Banner.jpg" alt="Paper Universe" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="text-white text-5xl sm:text-6xl lg:text-8xl font-bold mb-4">Paper Universe</h1>
                    <p className="text-white text-lg sm:text-xl lg:text-2xl mb-4">Tu universo de papelería kawaii ✨</p>
                    <p className="text-white text-md sm:text-lg lg:text-2xl max-w-3xl">
                        En Nuestra tienda podras conseguir los mejores productos de papelería Kawaii
                    </p>
                </div>
            </div>

            {/* Best Sellers Section */}
            <section style={{ backgroundImage: `url(${fondo})` }} className="pb-12 bg-customBlue2 bg-cover bg-center w-full">
                <div className="relative">
                    <div className="flex justify-center items-center py-4 mb-4 bg-customPurple1">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">💖 Lo Mas Vendido</h2>
                    </div>
                    <div className="max-w-[100rem] mx-4 sm:mx-8 lg:mx-32">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-14 lg:gap-20">
                            {loading ? (
                                <p>Cargando productos...</p>
                            ) : 
                                productos.map((producto) => (
                                    <ProductoCard
                                        key={producto.idProducto}
                                        image={producto.foto}
                                        title={producto.nombre}
                                        price={producto.precio}
                                        originalPrice={producto.precioMayorista}
                                        idProducto={producto.idProducto}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
