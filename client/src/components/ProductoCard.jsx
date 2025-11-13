import { Heart } from "lucide-react";

export default function ProductCard({ image, title, price, originalPrice, rating = 5, onAddToCart, onFavorite}) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="relative h-60 bg-gray-100">
                <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
                <button onClick={onFavorite} className="absolute top-3 right-3 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition">
                    <Heart size={20} className="text-purple-500" />
                </button>
            </div>
            <div className="min-h-40 p-4">
                <h3 className="text-purple-600 font-semibold mb-2 line-clamp-2">{title}</h3>
                <div className="flex flex-col mb-3">
                    <span className="text-xl font-bold text-purple-600">${price.toLocaleString()}</span>
                    {originalPrice && (
                        <span className="text-sm text-gray-400 line-through">${originalPrice.toLocaleString()}</span>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>★</span>
                        ))}
                    </div>
                    <button onClick={onAddToCart} className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600 transition" >+</button>
                </div>
            </div>
        </div>
    )
}