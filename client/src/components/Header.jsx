import { Link } from "react-router-dom"

export default function Header(currentPage) {
    return (
        <header className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <div className="px-8 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
                    <span className="text-2xl">🪫</span>
                    Paper universe
                </Link>
                <nav className="flex items-center gap-8">
                    <Link to="/" className="flex flex-col items-center gap-1 hover:opacity-80 transition">
                        <span className="text-2xl">🏠</span>
                        <span className="text-sm">Inicio</span>
                    </Link>
                    <Link to="/catalog" className="flex flex-col items-center gap-1 hover:opacity-80 transition">
                        <span className="text-2xl">🎁</span>
                        <span className="text-sm">Catalogo</span>
                    </Link>
                    <Link to="/" className="flex flex-col items-center gap-1 hover:opacity-80 transition">
                        <span className="text-2xl">💎</span>
                        <span className="text-sm">Servicios</span>
                    </Link>
                    <Link to="/user" className="flex flex-col items-center gap-1 hover:opacity-80 transition">
                        <span className="text-2xl">👤</span>
                        <span className="text-sm">Acceder</span>
                    </Link>
                </nav>
            </div>
        </header>
    )
}