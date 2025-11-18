import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { getCategoriasService } from "../services/ProductoService";

export default function ModalCrear({ open, setOpen, onSubmit }) {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    precio: 0,
    precioMayorista: 0,
    foto: null,
    idCategoria: 0,
    descripcion: "",
  });

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data = await getCategoriasService();
        setCategorias(data.data);
      } catch (error) {
        console.error("Error cargando categorías", error);
      }
    };

    cargarCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      nombre: "",
      precio: 0,
      precioMayorista: 0,
      foto: null,
      idCategoria: 0,
      descripcion: "",
    });
    setOpen(false);
  };
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl relative">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
              <Dialog.Title className="text-xl font-semibold">
                Crear Producto
              </Dialog.Title>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium mb-1"
                  >
                    Nombre <span className="text-red-500">*</span>:
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-customPurple1/50"
                    placeholder="Ej: Lapicero con 10 minas de colores"
                  />
                </div>

                <div>
                  <label htmlFor="precio" className="block text-sm font-medium mb-1">
                    Precio <span className="text-red-500">*</span>:
                  </label>
                  <input
                    id="precio"
                    type="number"
                    name="precio"
                    value={form.precio}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-customPurple1/50"
                  />
                </div>

                <div>
                  <label htmlFor="precioMayorista"
                    className="block text-sm font-medium mb-1"
                  >
                    Precio Mayorista <span className="text-red-500">*</span>:
                  </label>
                  <input
                    id="precioMayorista"
                    type="number"
                    name="precioMayorista"
                    value={form.precioMayorista}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-customPurple1/50"
                  />
                </div>
                <div>
                  <label htmlFor="idCategoria" className="block text-sm font-medium mb-1">
                    Categoría <span className="text-red-500">*</span>:
                  </label>
                  <select
                    name="idCategoria"
                    value={form.idCategoria}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-customPurple1/50"
                  >
                    <option value="">Seleccione una categoría...</option>
                    {categorias.map((cat) => (
                      <option key={cat.idCategoria} value={cat.idCategoria}>
                        {cat.nombre
                          .toLowerCase()
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="foto" className="block text-sm font-medium mb-1">
                    Imagen del Producto:
                  </label>
                  <input
                    id="foto"
                    type="file"
                    accept="image/*"
                    name="foto"
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 cursor-pointer"
                  />
                </div>

                <div>
                  <label htmlFor="descripcion" className="block text-sm font-medium mb-1">
                    Descripción:
                  </label>
                  <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    maxLength={200}
                    className="w-full border rounded-lg px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-customPurple1/50"
                    placeholder="Lapicero de alta calidad..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-customPurple1 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Guardar Producto
                </button>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
