import { Link } from "react-router-dom"
import { User, Handbag, Gem, House, ShoppingCart } from "lucide-react";

export default function Header(currentPage) {
    return (
        <>
        <header className="w-full bg-customPurple1 text-white hidden md:block">
            <div className="px-12 py-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
                    <span className="text-5xl">🪐</span>
                    Paper universe
                </Link>
                <nav className="flex items-center gap-10">
                    <Link to="/" className="flex flex-col items-center hover:opacity-80 transition">
                        <House size={25}/>
                        <span className="text-lg font-medium">Inicio</span>
                    </Link>
                    <Link to="/catalogo" className="flex flex-col items-center hover:opacity-80 transition">
                        <Handbag size={25}/>
                        <span className="text-lg font-medium">Catalogo</span>
                    </Link>
                    <Link to="/carrito" className="flex flex-col items-center hover:opacity-80 transition">
                        <ShoppingCart size={25}/>
                        <span className="text-lg font-medium">Carrito</span>
                    </Link>
                    <Link to="/usuario" className="flex flex-col items-center hover:opacity-80 transition">
                        <User size={25}/>
                        <span className="text-lg font-medium">Perfil</span>
                    </Link>
                </nav>
            </div>
        </header>
            <nav className="md:hidden fixed top-0 left-0 w-full bg-customPurple1 text-white py-2 shadow-[0_-4px_10px_rgba(0,0,0,0.3)] z-50">
                <div className="flex justify-around items-center text-center">
                    <Link to="/" className="flex flex-col items-center hover:opacity-80 transition">
                    <span className="text-4xl">🪐</span>
                    </Link>

                    <Link to="/catalogo" className="flex flex-col items-center hover:opacity-80 transition">
                        <Handbag size={22} />
                        <span className="text-xs">Catálogo</span>
                    </Link>

                    <Link to="/carrito" className="flex flex-col items-center hover:opacity-80 transition">
                        <ShoppingCart size={22} />
                        <span className="text-xs">Carrito</span>
                    </Link>

                    <Link to="/usuario" className="flex flex-col items-center hover:opacity-80 transition">
                        <User size={22} />
                        <span className="text-xs">Perfil</span>
                    </Link>
                </div>
            </nav>

            {/* Para que el contenido no quede debajo del header superior móvil */}
            <div className="md:hidden h-[60px]"></div>
        </>
    )
}