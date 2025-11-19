import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { getDireccionesService } from "../services/CarritoService";
import { useAuth } from "../hooks/useAuth";

export default function ModalDireccion({ open, setOpen, onSubmit }) {
    const { user } = useAuth();
    const [form, setForm] = useState({
        direccion: "",
        ciudad: "",
        barrio: "",
    });

    const [direcciones, setDirecciones] = useState([]); // direcciones del usuario
    const [selectedId, setSelectedId] = useState(null);
    const [loadingDirs, setLoadingDirs] = useState(false);

    useEffect(() => {
        if (!open) return;
        // cargar direcciones del usuario al abrir el modal
        const cargar = async () => {
            if (!user?.idUsuario) return;
            try {
                setLoadingDirs(true);
                const res = await getDireccionesService();
                // la API devuelve { mensaje, result } o { success, data } según endpoints; normalizamos:
                const lista = res.result?.data || res.data || res;
                // en muchos servicios tu backend envía { success: true, data: [...] } o {mensaje, result}
                // Si la respuesta es un objeto con propiedad 'data' que es array, lo usamos; si no, intentamos usar res directamente.
                
                setDirecciones(lista || []);
            } catch (error) {
                console.error("Error cargando direcciones:", error);
                setDirecciones([]);
            } finally {
                setLoadingDirs(false);
            }
        };
        cargar();
    }, [open, user]);

    useEffect(() => {
        if (!open) {
            setForm({ direccion: "", ciudad: "", barrio: "" });
            setSelectedId(null);
        }
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleUseSelected = () => {
        if (!selectedId) return;
        const dir = direcciones.find(d => Number(d.id) === Number(selectedId) || Number(d.idDireccion) === Number(selectedId));
        // Normalizamos el id; algunos modelos usan idDireccion, otros id
        const idKey = dir?.idDireccion ?? dir?.id ?? selectedId;
        onSubmit({ idDireccion: idKey, direccionObj: dir });
        setOpen(false);
    };

    const handleSaveNew = (e) => {
        e.preventDefault();
        if (!form.direccion.trim() || !form.ciudad.trim() || !form.barrio.trim()) return;
        onSubmit({
            direccion: form.direccion.trim(),
            ciudad: form.ciudad.trim(),
            barrio: form.barrio.trim(),
        });
        setOpen(false);
    };

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
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
                        <Dialog.Panel className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl relative">
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                            >
                                ×
                            </button>
                            <Dialog.Title className="text-xl font-semibold mb-2">
                                Dirección de envío
                            </Dialog.Title>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left: lista de direcciones existentes */}
                                <div>
                                    <h3 className="font-medium mb-3">Direcciones guardadas</h3>
                                    {loadingDirs ? (
                                        <div className="text-sm text-gray-500">Cargando direcciones...</div>
                                    ) : direcciones.length === 0 ? (
                                        <div className="text-sm text-gray-500">No tienes direcciones guardadas.</div>
                                    ) : (
                                        <div className="space-y-3 max-h-64 overflow-auto pr-2">
                                            {direcciones.map((d) => {
                                                const id = d.idDireccion ?? d.id ?? d.idDireccion;
                                                return (
                                                    <label key={String(id)} className={`block p-3 border rounded-lg cursor-pointer ${Number(selectedId) === Number(id) ? "ring-2 ring-customPurple1/40 bg-gray-50" : "bg-white"}`}>
                                                        <input
                                                            type="radio"
                                                            name="selectedDireccion"
                                                            value={id}
                                                            checked={Number(selectedId) === Number(id)}
                                                            onChange={() => setSelectedId(id)}
                                                            className="mr-2"
                                                        />
                                                        <div className="text-sm">
                                                            <div className="font-medium">{d.direccion}</div>
                                                            <div className="text-xs text-gray-600">{d.barrio} — {d.ciudad}</div>
                                                        </div>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    )}

                                    <div className="mt-4 flex gap-2">
                                        <button
                                            type="button"
                                            onClick={handleUseSelected}
                                            disabled={!selectedId}
                                            className="px-4 py-2 rounded-lg bg-customPurple1 text-white hover:bg-purple-700 disabled:opacity-50"
                                        >
                                            Usar dirección seleccionada
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => { setSelectedId(null); }}
                                            className="px-4 py-2 rounded-lg border hover:bg-gray-50"
                                        >
                                            Limpiar selección
                                        </button>
                                    </div>
                                </div>

                                {/* Right: formulario para nueva dirección */}
                                <div>
                                    <h3 className="font-medium mb-3">Agregar una nueva dirección</h3>
                                    <form onSubmit={handleSaveNew} className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Dirección <span className="text-red-500">*</span>:</label>
                                            <input
                                                name="direccion"
                                                value={form.direccion}
                                                onChange={handleChange}
                                                required
                                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-customPurple1/50"
                                                placeholder="Calle, número, etc."
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">Ciudad <span className="text-red-500">*</span>:</label>
                                            <input
                                                name="ciudad"
                                                value={form.ciudad}
                                                onChange={handleChange}
                                                required
                                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-customPurple1/50"
                                                placeholder="Ej: Buenos Aires"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1">Barrio <span className="text-red-500">*</span>:</label>
                                            <input
                                                name="barrio"
                                                value={form.barrio}
                                                onChange={handleChange}
                                                required
                                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-customPurple1/50"
                                                placeholder="Ej: Palermo"
                                            />
                                        </div>

                                        <div className="flex gap-2 justify-end">
                                            <button
                                                type="button"
                                                onClick={() => { setForm({ direccion: "", ciudad: "", barrio: "" }); }}
                                                className="px-4 py-2 rounded-lg border hover:bg-gray-50"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 rounded-lg bg-customPurple1 text-white hover:bg-purple-700 transition"
                                            >
                                                Guardar y usar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}