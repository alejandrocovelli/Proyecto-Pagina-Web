import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { Heart, Truck } from "lucide-react";
import { getProductoById } from "../services/ProductoService";
import { crearOrdenService, getCarrito, updateOrdenService } from "../services/CarritoService";
import { useAuth } from "../hooks/useAuth";

export default function Producto() {
  const { idProducto } = useParams();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const data = await getProductoById(Number(idProducto));
        setProducto(data.data);
      } catch (error) {
        console.error("Error cargando producto:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarProducto();
  }, [idProducto]);

  const handleAddToCart = async () => {
    try {
      const carrito = await getCarrito(user.idUsuario);
      const ordenData = {
        productos: [
          {
            idProducto: producto?.idProducto,
            cantidad: quantity,
          },
        ],
      };
      if (carrito && carrito.result.data.idOrden) {
        await updateOrdenService(carrito.result.data.idOrden, ordenData);
      } else {
        await crearOrdenService({
          ...ordenData,
          estado: 1,
          idUsuario: user.idUsuario,
        });
      }
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl text-gray-500">
        Cargando producto...
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl text-gray-500">
        Producto no encontrado
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header currentPage="Producto" />

      <div className="flex-1 bg-customBlue2 py-4 md:py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm md:text-base text-gray-600 font-medium mb-4 md:mb-8 bg-white p-3 md:p-4 rounded-lg">
            {producto?.categoria?.nombre} / {producto?.nombre}
          </div>

          {/* Product Detail - Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Left: Product Image */}
            <div className="bg-white rounded-lg p-4 md:p-6 flex items-center justify-center">
              <img
                src={producto?.foto || "../public/default-ui-image-placeholder.webp"}
                alt={producto?.nombre}
                className="rounded-lg shadow-sm max-h-64 md:max-h-96 w-full object-contain"
              />
            </div>

            {/* Right: Product Info */}
            <div className="bg-white rounded-lg overflow-hidden">
              {/* Title */}
              <div className="p-4 md:p-6 border-b-4 md:border-b-8 border-customBlue2">
                <h1 className="text-2xl md:text-3xl font-bold text-customPurple1">
                  {producto?.nombre}
                </h1>
                {producto?.descripcion && (
                  <p className="text-sm md:text-base text-gray-600 mt-2">
                    {producto.descripcion}
                  </p>
                )}
              </div>

              {/* Content Area */}
              <div className="p-4 md:p-6">
                {/* Mobile: Stack vertically, Desktop: Side by side */}
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                  {/* Shipping Box */}
                  <div className="w-full lg:w-2/5">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 flex flex-col items-center justify-center">
                      <Truck size={32} className="text-customPurple1" />
                      <span className="text-sm text-gray-600 mt-2">Envío Gratis</span>
                    </div>
                  </div>

                  {/* Price and Controls */}
                  <div className="w-full lg:w-3/5 flex flex-col justify-center items-center relative lg:border-l-4 lg:border-customBlue2 lg:pl-6">
                    {/* Favorite Button */}
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="absolute top-0 right-0 text-customPurple1 hover:text-purple-600"
                    >
                      <Heart
                        size={24}
                        fill={isFavorite ? "currentColor" : "none"}
                      />
                    </button>

                    {/* Price */}
                    <div className="text-center mb-4 md:mb-6">
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-3xl md:text-4xl font-bold text-customPurple1">
                          ${producto?.precioMayorista.toLocaleString()}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs md:text-sm text-gray-400 line-through">
                            ${producto?.precio.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 text-lg md:text-xl font-semibold"
                      >
                        −
                      </button>
                      <span className="w-12 md:w-16 text-center font-bold text-lg md:text-xl">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 md:w-12 md:h-12 bg-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-300 text-lg md:text-xl font-semibold"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart()}
                      className="w-full md:w-64 bg-customPurple1 hover:bg-purple-600 text-white font-bold py-3 md:py-4 rounded-lg transition text-sm md:text-base"
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}