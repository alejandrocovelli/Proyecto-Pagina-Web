//import { useParams } from "react-router-dom"
import Header from "../components/header";
import BarraLateral from "../components/BarraLateral";
import ProductoCard from "../components/ProductoCard";
import { getCategoriasService, crearProductoService, getProductosService } from "../services/ProductoService";
import { useEffect, useState } from "react";
import ModalCrear from "../components/ModalCrear";

export default function Categorias() {
  const [sidebarSections, setSidebarSections] = useState([]);
  const [productos, setProductos] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleCrearProducto = async (nuevoProducto) => {
    try {
      const formData = new FormData();

      //Trae los datos del modal y lo vuelve un FormData para mandar el req con body en el endpoint
      Object.entries(nuevoProducto).forEach(([key, value]) => {
        console.log(key,value)
        formData.append(key, value);
      });

      const data = await crearProductoService(formData);
      console.log("Respuesta del servidor:", data);
      cargarProductos();
    } catch (error) {
      console.error("Error creando producto:", error);
    }
  };

const cargarProductos = async () => {
    try {
      const data = await getProductosService();
      console.log("PRODUCTOS:", data.data);
      setProductos(data.data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data = await getCategoriasService();
        console.log("CATEGORIAS:", data.data);
        const secciones = data.data.map((cat) => ({
          id: cat.idCategoria,
          nombre: cat.nombre,
        }));

        setSidebarSections(secciones);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };

    cargarCategorias();
    cargarProductos();
  }, []);

  return (
    <div className="w-full">
      <Header currentPage="Categoria" />

      <div className="relative min-h-screen bg-gray-100 overflow-hidden">
        <div className="flex">
          {/* BarraLateral */}
          <BarraLateral sections={sidebarSections} />

          {/* Main Content */}
          <main className="flex-1 relative z-10 px-20">
            <button
              className="absolute right-5 top-5 bg-customPurple1 text-white px-5 py-2 rounded text-sm hover:bg-purple-600 transition"
              onClick={() => setOpenModal(true)}
            >
              +
            </button>
            <div className="p-8">
              {/* Breadcrumb */}
              <div className="text-gray-600 text-sm mb-8">
                <span className="text-customPurple1">Categoría /</span>
                <span className="mx-2">Lapiceros</span>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-24">
                {productos.map((producto) => (
                  <ProductoCard
                    key={producto.idProducto}
                    idProducto={producto.idProducto}
                    image={producto.foto}
                    title={producto.nombre}
                    price={producto.precio}
                    originalPrice={producto.precioMayorista}
                  />
                  
                ))}
                {console.log(productos)}
              </div>
            </div>
            <ModalCrear
              open={openModal}
              setOpen={setOpenModal}
              onSubmit={handleCrearProducto}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
