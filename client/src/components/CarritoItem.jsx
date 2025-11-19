export default function CarritoItem({
    title,
    price,
    quantity,
    image,
    onQuantityChange,
    onRemove,
}) {
    const subtotal = price * quantity

    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex gap-6 items-start">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1">
                <h3 className="text-lg font-semibold text-customPurple1 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                    ${price.toLocaleString()} x {quantity} = <span className="font-bold text-customPurple1">${subtotal.toLocaleString()}</span>
                </p>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                        <button
                            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                            className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition text-sm"
                        >
                            −
                        </button>
                        <span className="w-6 text-center font-semibold text-sm">{quantity}</span>
                        <button
                            onClick={() => onQuantityChange(quantity + 1)}
                            className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition text-sm"
                        >
                            +
                        </button>
                    </div>

                    <button
                        onClick={onRemove}
                        className="text-red-500 hover:text-red-700 font-semibold text-sm transition"
                    >
                        Eliminar
                    </button>
                </div>
            </div>

            <div className="text-right">
                <p className="text-2xl font-bold text-customPurple1">${subtotal.toLocaleString()}</p>
            </div>
        </div>
    )
}
