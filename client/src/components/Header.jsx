import { Link } from "react-router-dom"
import { User, Handbag, Gem, House } from "lucide-react";

export default function Header(currentPage) {
    return (
        <header className="w-full bg-customPurple1 text-white">
            <div className="px-12 py-6 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
                    <span className="text-5xl">🪐</span>
                    Paper universe
                </Link>
                <nav className="flex items-center gap-8">
                    <Link to="/" className="flex flex-col items-center hover:opacity-80 transition">
                        <House size={35}/>
                        <span className="text-lg font-medium">Inicio</span>
                    </Link>
                    <Link to="/catalogo" className="flex flex-col items-center hover:opacity-80 transition">
                        <Handbag size={35}/>
                        <span className="text-lg font-medium">Catalogo</span>
                    </Link>
                    <Link to="/" className="flex flex-col items-center hover:opacity-80 transition">
                        <Gem size={35}/>
                        <span className="text-lg font-medium">Servicios</span>
                    </Link>
                    <Link to="/user" className="flex flex-col items-center hover:opacity-80 transition">
                        <User size={35}/>
                        <span className="text-lg font-medium">Acceder</span>
                    </Link>
                </nav>
            </div>
        </header>
    )
}