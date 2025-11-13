import CategoriaCard from "../components/CategoriaCard";
import Header from "../components/header";

export default function Catalogo() {

    const categorias = [
        {
            id: 1,
            title: "Lapicero con 10 minas de colores",
            image: "../../public/Hello kitty.jpg",
        },
        {
            id: 2,
            title: "Lapicero moñitos de piedra",
            image: "../../public/Hello kitty.jpg",
        },
        {
            id: 3,
            title: "Lapicero borrable animalitos",
            image: "../../public/Hello kitty.jpg",
        },
        {
            id: 4,
            title: "Lapicero apliques Kuromi",
            image: "../../public/Hello kitty.jpg",
        },
    ]

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
            <section className="py-12 px-8 bg-gradient-to-b from-white to-gray-50">
                <div className="relative">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-40">
                            {categorias.map((categoria) => (
                                <CategoriaCard key={categoria.id} image={categoria.image} title={categoria.title} idCategoria={categoria.id} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}