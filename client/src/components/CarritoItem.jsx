export default function CarritoItem({
    op, // ordenProducto tal como viene del backend
    onCantidadChange,
    onRemove,
}) {
    // Usamos los nombres exactos que provee el backend
    const nombre = op.producto?.nombre ?? `Producto ${op.idProducto}`;
    const precio = Number(op.precioUnidad ?? op.producto?.precio ?? 0);
    const cantidad = Number(op.cantidad ?? 1);
    const foto = op.producto?.foto ?? "../../public/default-ui-image-placeholder.webp";
    const valorTotal = Number(op.valorTotal ?? precio * cantidad);

    return (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            {/* Mobile: Stack vertically, Desktop: Horizontal */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                {/* Image */}
                <div className="w-full md:w-24 h-32 md:h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                    <img 
                        src={foto || "../../public/default-ui-image-placeholder.webp"} 
                        alt={nombre} 
                        className="w-full h-full object-cover" 
                    />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col gap-3">
                    {/* Title and Price - Mobile: Stack, Desktop: Same line */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                        <div className="flex-1">
                            <h3 className="text-base md:text-lg font-semibold text-customPurple1 mb-1 md:mb-2">
                                {nombre}
                            </h3>
                            <p className="text-gray-600 text-sm">
                                ${precio.toLocaleString()} x {cantidad}
                            </p>
                        </div>

                        {/* Total Price - Right on desktop, below on mobile */}
                        <div className="md:text-right">
                            <p className="text-xl md:text-2xl font-bold text-customPurple1">
                                ${valorTotal.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Controls - Full width on mobile, inline on desktop */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 mt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-center sm:justify-start gap-3 bg-gray-100 rounded-lg p-2 sm:p-2">
                            <button
                                onClick={() => onCantidadChange(Math.max(1, cantidad - 1))}
                                className="w-8 h-8 md:w-6 md:h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition text-base md:text-sm font-semibold"
                            >
                                −
                            </button>
                            <span className="w-8 md:w-6 text-center font-semibold text-base md:text-sm">
                                {cantidad}
                            </span>
                            <button
                                onClick={() => onCantidadChange(cantidad + 1)}
                                className="w-8 h-8 md:w-6 md:h-6 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition text-base md:text-sm font-semibold"
                            >
                                +
                            </button>
                        </div>

                        {/* Delete Button */}
                        <button
                            onClick={onRemove}
                            className="w-full sm:w-auto text-red-500 hover:text-red-700 font-semibold text-sm md:text-sm transition py-2 sm:py-0 border border-red-200 sm:border-0 rounded-lg sm:rounded-none hover:bg-red-50 sm:hover:bg-transparent"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}