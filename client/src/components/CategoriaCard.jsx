import { useNavigate } from "react-router-dom"

export default function CategoriaCard({ image, title, idCategoria }) {
    const navigate = useNavigate()
    
    return (
        <button onClick={() => navigate(`/categoria/${idCategoria}`)} className="flex rounded-lg overflow-hidden p-5 h-52 group cursor-pointer bg-customGray3">
            <div className="h-full w-1/2 rounded-lg overflow-hidden">
                <img
                    src={image || "/placeholder.svg"}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
            </div>
            <div className="inset-0 bg-opacity-40 group-hover:bg-opacity-30 transition flex items-center justify-center">
                <h3 className="text-white font-bold text-lg text-left px-4">{title}</h3>
            </div>
        </button>
    )
}
