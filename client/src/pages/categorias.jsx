//import { useParams } from "react-router-dom"
import Header from "../components/Header";
import BarraLateral from "../components/BarraLateral";
import ProductoCard from "../components/ProductoCard";
import {
  getCategoriasService,
  crearProductoService,
  getProductosService,
} from "../services/ProductoService";
import { useEffect, useState } from "react";
import ModalCrear from "../components/ModalCrear";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../context/ToastContext.jsx";
import fondo from "../../public/Group 69.png";

export default function Categorias() {
  const [sidebarSections, setSidebarSections] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [productos, setProductos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { idCategoria } = useParams();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const handleCrearProducto = async (nuevoProducto) => {
    try {
      const formData = new FormData();

      //Trae los datos del modal y lo vuelve un FormData para mandar el req con body en el endpoint
      Object.entries(nuevoProducto).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const data = await crearProductoService(formData);
      showToast({ type: 'success', message: 'Producto creado exitosamente' });
      cargarProductos();
    } catch (error) {
      console.error("Error creando producto:", error);
      showToast({ type: 'error', message: 'Error al crear el producto' });
    }
  };

  const cargarProductos = async () => {
    try {
      const filtros = {};
      filtros.idCategoria = idCategoria;
      const data = await getProductosService(filtros);
      setProductos(data.data);
    } catch (error) {
      console.error("Error cargando productos:", error);
      showToast({ type: 'error', message: 'Error al cargar los productos' });
    }
  };

  const cargarCategorias = async () => {
    try {
      const data = await getCategoriasService();
      const secciones = data.data.map((cat) => ({
        id: cat.idCategoria,
        nombre: cat.nombre,
      }));

      setSidebarSections(secciones);
    } catch (error) {
      console.error("Error cargando categorías:", error);
      showToast({ type: 'error', message: 'Error al cargar las categorías' });
    }
  };

  useEffect(() => {
    cargarCategorias();
    cargarProductos();
  }, [idCategoria]);

  useEffect(() => {
    if (sidebarSections.length === 0) return;

    const categoria = sidebarSections.find(
      (cat) => cat.id === Number(idCategoria)
    );
    setCategoriaSeleccionada(categoria || null);
  }, [idCategoria, sidebarSections]);

  const handleCategoriaClick = (idCategoria) => {
    navigate(`/categoria/${idCategoria}`);
  };

  return (
    <div className="w-full">
      <Header currentPage="Categoria" />
      <button
        className="md:hidden p-4 text-customPurple1 absolute left-4 top-20 z-20"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      <div className="relative min-h-screen bg-gray-100 overflow-hidden">
        <div className="flex">
          {/* BarraLateral */}
          <BarraLateral
            sections={sidebarSections}
            onClick={handleCategoriaClick}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          {/* Main Content */}
          <main
            style={{ backgroundImage: `url(${fondo})` }}
            className="flex-1 bg-customBlue2 bg-cover bg-center w- relative z-10 px-20"
          >
            {user && user.tipo == 1 && (
              <button
                className="absolute right-5 top-5 bg-customPurple1 text-white px-5 py-2 rounded text-sm hover:bg-purple-600 transition"
                onClick={() => setOpenModal(true)}
              >
                +
              </button>
            )}
            <div className="p-8">
              {/* Breadcrumb */}
              <div className="text-gray-600 text-sm mb-8">
                <span className="text-customPurple1">Categoría /</span>
                <span className="mx-2">{categoriaSeleccionada?.nombre}</span>
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
