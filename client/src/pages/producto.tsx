import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header";
import { Heart, Truck } from "lucide-react";
import { getProductoById } from "../services/ProductoService";
import { crearOrdenService, getCarrito, updateOrdenService } from "../services/CarritoService";
import { useAuth } from "../hooks/useAuth";


export default function Producto() {
  const { idProducto  } = useParams();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(producto);
  useEffect(() => {
    console.log("Cargando producto con ID:", idProducto );
    const cargarProducto = async () => {
      try {
        const data = await getProductoById(Number(idProducto));
        console.log("PRODUCTO:", data.data);

        setProducto(data.data);
      } catch (error) {
        console.error("Error cargando producto:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarProducto();
  }, [idProducto ]);

  const handleAddToCart = async () => {
    try {
      const carrito = await getCarrito(user.idUsuario);
      console.log(carrito);
      const ordenData = {
        productos: [
          {
            idProducto: producto?.idProducto,
            cantidad: quantity,
          },
        ],
      };
      if(carrito && carrito.result.data.idOrden){
        await updateOrdenService(carrito.result.data.idOrden, ordenData);
      } else {
        console.log("holaaa");
        await crearOrdenService({
          ...ordenData,
          estado: 1, 
          idUsuario: user.idUsuario,
        });
      }
      
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  }

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

      <div className="flex-1 h-full bg-customBlue2 py-8 px-4">
        <div className="max-w-7xl h-full mx-auto flex flex-col min-h-0">
          {/* Breadcrumb */}
          <div className="text-gray-600 font-medium mb-8 bg-white p-4 rounded-lg">
            {producto?.categoria?.nombre}/{producto?.nombre}
          </div>

          {/* Product Detail: left photo and right info (title, envio box, price/controls) */}
          {/* Fixed to bottom of viewport so it stays attached to screen bottom */}
          <div className="z-10 grid w-full grid-cols-1 md:grid-cols-5 grid-rows-2 gap-3 h-[60vh]">
            {/* Left column: only the product photo */}
            <div className="md:col-span-2 row-span-2">
              <div className="bg-white rounded-lg p-6 flex items-center justify-center h-full">
                <img
                  src={producto?.foto || "../public/default-ui-image-placeholder.webp"}
                  alt={producto?.nombre}
                  className="rounded-lg shadow-sm max-h-80 md:max-h-96 max-w-full object-contain"
                />
              </div>
            </div>

            {/* Right column: spans two columns on md (use col-span 2) */}
            <div className="md:col-span-3 row-span-2 bg-white rounded-lg h-full pt-6 mt-auto">
              {/* Title */}
              <div className="pb-4 px-6 border-b-8 border-customBlue2">
                <h1 className="text-3xl font-bold text-customPurple1">
                  {producto?.nombre}
                </h1>
              </div>

              {/* Main row: envio box on left, price/controls on right */}
              <div className="flex gap-4 px-6 h-full">
                {/* Envío box (left part of this area) */}
                <div className="w-2/5 flex items-start pt-6 h-full">
                  <div className="w-full bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center">
                    <Truck size={32} className="text-customPurple1" />
                    <span className="text-sm text-gray-600 mt-2">Envío</span>
                  </div>
                </div>

                {/* Price and actions (takes remaining columns) */}
                <div className="w-3/5 py-6 flex flex-col justify-center items-center relative border-l-8 border-customBlue2">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-center">
                      <span className="text-4xl font-bold text-customPurple1">
                        ${producto?.precioMayorista.toLocaleString()}
                      </span>
                      <div className="text-sm text-gray-400 line-through">
                        ${producto?.precio.toLocaleString()}
                      </div>
                    </div>

                    <div className="ml-auto flex items-center gap-3">
                      <button className="text-gray-400 hover:text-gray-600">
                        ★
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="absolute top-5 right-3 text-customPurple1 hover:text-purple-600"
                  >
                    <Heart
                      size={20}
                      fill={isFavorite ? "currentColor" : "none"}
                    />
                  </button>

                  {/* Quantity and add to cart */}
                  <div className="flex items-center gap-4 mb-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 mt-10">
                    <button onClick={() => handleAddToCart()}  className="w-48 bg-customPurple1 hover:bg-purple-600 text-white font-bold py-3 rounded-lg transition">
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
