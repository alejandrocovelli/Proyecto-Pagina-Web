import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function ModalCrearCategoria({ open, setOpen, onSubmit }) {
    const [nombre, setNombre] = useState("");

    const handleSave = (e) => {
        e.preventDefault();
        if (!nombre || nombre.trim() === "") return;
        // Llamamos al callback del padre con el objeto categoria
        onSubmit({ nombre: nombre.trim() });
        setNombre("");
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
                        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl relative">
                            <button
                                onClick={() => setOpen(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                            >
                                ×
                            </button>
                            <Dialog.Title className="text-xl font-semibold mb-2">
                                Crear Categoría
                            </Dialog.Title>

                            <form onSubmit={handleSave} className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="nombreCategoria"
                                        className="block text-sm font-medium mb-1"
                                    >
                                        Nombre <span className="text-red-500">*</span>:
                                    </label>
                                    <input
                                        id="nombreCategoria"
                                        type="text"
                                        name="nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-customPurple1/50"
                                        placeholder="Ej: Papelería"
                                    />
                                </div>

                                <div className="flex gap-2 justify-end">
                                    <button
                                        type="button"
                                        onClick={() => { setNombre(""); setOpen(false); }}
                                        className="px-4 py-2 rounded-lg border hover:bg-gray-50"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded-lg bg-customPurple1 text-white hover:bg-purple-700 transition"
                                    >
                                        Crear Categoría
                                    </button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}