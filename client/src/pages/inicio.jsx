
import Header from "../components/header"
import ProductoCard from "../components/ProductoCard"

export default function Inicio() {

    const bestSellers = [
        {
            id: 1,
            title: "CAJA LAPICERO X12 CAPYBARA",
            price: 12000,
            originalPrice: 25000,
            image: "../../public/capibara.jpg",
        },
        {
            id: 2,
            title: "CAJA LAPICERO X12 GANCHO PLATA SANRIO",
            price: 14000,
            originalPrice: 22000,
            image: "../../public/Sanrio.jpg",
        },
        {
            id: 3,
            title: "TIRA LIBRETAS X4 CAPYBARA",
            price: 6000,
            originalPrice: 12000,
            image: "../../public/agenda capibara.jpg",
        },
        {
            id: 4,
            title: "AGENDA LLAVERO HELLO KITTY",
            price: 10500,
            originalPrice: 30000,
            image: "../../public/Hello kitty.jpg",
        },
    ]

    return (
        <div className="w-full h-screen">
            <Header currentPage="Inicio" />

            {/* Hero Banner */}
            <div className="relative w-full h-2/4 bg-gray-900 overflow-hidden">
                <img src="../../Banner.jpg" alt="Paper Universe" className="w-full h-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
                    <h1 className="text-white text-8xl font-bold mb-8">Paper Universe</h1>
                    <p className="text-white text-2xl mb-8">Tu universo de papelería kawaii ✨</p>
                    <p className="text-white text-2xl text-center max-w-5xl">
                        En Nuestra tienda podras conseguir los mejores productos de papelería Kawaii
                    </p>
                </div>
            </div>

            {/* Best Sellers Section */}
            <section className="pb-12 bg-gradient-to-b from-white to-gray-50">
                <div className="relative">
                    <div className="flex justify-center items-center py-4 mb-4 bg-customPurple1">
                        <h2 className="text-3xl font-bold text-white text-center">💖 Lo Mas Vendido</h2>
                    </div>
                    <div className="max-w-[100rem] mx-32">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
                            {bestSellers.map((producto) => (
                                <ProductoCard
                                    key={producto.id}
                                    image={producto.image}
                                    title={producto.title}
                                    price={producto.price}
                                    originalPrice={producto.originalPrice}
                                    rating={5}
                                    idProducto={producto.id}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
