
import Header from "../components/header"

export default function PaginaInicio() {
    return (
        <div className="w-full">
            <Header currentPage="Inicio" />

            {/* Hero Banner */}
            <div className="relative w-full h-96 bg-gray-900 overflow-hidden">
                <img src="/papeleria-kawaii-store.jpg" alt="Paper Universe" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
                    <h1 className="text-white text-5xl font-bold mb-2">Paper Universe</h1>
                    <p className="text-white text-lg mb-4">Tu universo de papelería kawaii ✨</p>
                    <p className="text-white text-center max-w-2xl">
                        En Nuestra tienda podras conseguir los mejores productos de papelería Kawaii
                    </p>
                </div>
            </div>

            {/* Best Sellers Section */}
            <section className="py-12 px-8 bg-gradient-to-b from-white to-gray-50">
                <div className="relative">

                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-purple-600 text-center mb-12">💖 Lo Mas Vendido</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
