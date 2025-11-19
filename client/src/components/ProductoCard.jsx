import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductoCard({ idProducto, image, title, price, originalPrice, onAddToCart, onFavorite}) {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/product/${idProducto}`)} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
            <div className="relative h-36 sm:h-40 lg:h-48 bg-gray-100">
                <img src={image || "../public/default-ui-image-placeholder.webp"} alt={title} className="w-full h-full object-cover" />
                <button onClick={onFavorite} className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition">
                    <Heart size={20} className="text-customPurple1" />
                </button>
            </div>
            <div className="min-h-40 p-3 sm:p-4">
                <h3 className="text-customPurple1 font-semibold mb-2 line-clamp-2 text-sm sm:text-base">{title}</h3>
                <div className="flex flex-col mb-3">
                    <span className="text-lg sm:text-xl font-bold text-customPurple1">${price.toLocaleString()}</span>
                    {originalPrice && (
                        <span className="text-xs sm:text-sm text-gray-400 line-through">${originalPrice.toLocaleString()}</span>
                    )}
                </div>
                <div className="flex justify-end">
                    <button onClick={onAddToCart} className="bg-customPurple1 text-white px-3 py-1 rounded text-sm hover:bg-purple-600 transition" >+</button>
                </div>
            </div>
        </div>
    )
}