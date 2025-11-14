"use client"

import { useParams } from "react-router-dom"
import Header from "../components/header"
import BarraLateral from "../components/BarraLateral"
import ProductoCard from "../components/ProductoCard"

export default function Categorias() {
    const { idCategoria } = useParams()

    const sidebarSections = [
        {
            title: "Lapiceros",
            items: [
                { label: "LAPICERO PANDA TINTA NEGRA" },
                { label: "LAPICERO 10 MINAS STITCHS" },
                { label: "LAPICERO RETRACTIL CARITA KUROMI" },
            ],
        },
        {
            title: "Agendas",
            items: [
                { label: "AGENDA DRAGON BALLA Z" },
                { label: "AGENDA MAGNETICA CAPYBARA" },
                { label: "AGENDA SNOOPY HOJAS DECORADAS" },
            ],
        },
        {
            title: "Termos",
            items: [
                { label: "TERMO ASTRONAUTA CON PITILLO" },
                { label: "TERMO CINAMOROLL" },
                { label: "TERMO CON PITILLO CINAMOROLL" },
            ],
        },
    ]

    const productos = [
        {
            id: 1,
            title: "Lapicero Panda tinta negra",
            price: 3500,
            originalPrice: 7000,
            image: "../../public/agenda capibara.jpg",
            rating: 5,
        },
        {
            id: 2,
            title: "Lapicero 10 minas stitch",
            price: 4500,
            originalPrice: 8000,
            image: "../../public/agenda capibara.jpg",
            rating: 5,
        },
        {
            id: 3,
            title: "Lapicero retractil carita Kuromi",
            price: 2500,
            originalPrice: 6000,
            image: "../../public/agenda capibara.jpg",
            rating: 5,
        },
        {
            id: 4,
            title: "Caja lapicero X12 snoopy",
            price: 9500,
            originalPrice: 16000,
            image: "../../public/agenda capibara.jpg",
            rating: 5,
        },
        {
            id: 5,
            title: "Lapicero 4 minas Stitch",
            price: 4000,
            originalPrice: 6000,
            image: "../../public/agenda capibara.jpg",
            rating: 5,
        },
        {
            id: 6,
            title: "Lapicero 4 minas Super Heroes",
            price: 3500,
            originalPrice: 4000,
            image: "../../public/agenda capibara.jpg",
            rating: 5,
        },
    ]

    return (
        <div className="w-full">
            <Header currentPage="Categoria" />

            <div className="relative min-h-screen bg-gray-100 overflow-hidden">

                <div className="flex">
                    {/* BarraLateral */}
                    <BarraLateral sections={sidebarSections} />

                    {/* Main Content */}
                    <main className="flex-1 relative z-10 px-20">
                        <div className="p-8">
                            {/* Breadcrumb */}
                            <div className="text-gray-600 text-sm mb-8">
                                <span className="text-customPurple1">Categoría /</span>
                                <span className="mx-2">Lapiceros</span>
                            </div>

                            {/* Products Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-24">
                                {productos.map((producto) => (
                                    <ProductoCard
                                        key={producto.id}
                                        idProducto={producto.id}
                                        image={producto.image}
                                        title={producto.title}
                                        price={producto.price}
                                        originalPrice={producto.originalPrice}
                                        rating={producto.rating}
                                    />
                                ))}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}
