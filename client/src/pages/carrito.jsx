//import { useParams } from "react-router-dom"
import Header from "../components/header";
import BarraLateral from "../components/BarraLateral";
import ProductoCard from "../components/ProductoCard";
import { useEffect, useState } from "react";
import ModalCrear from "../components/ModalCrear";
import { useNavigate, } from "react-router-dom";
import CarritoItem from "../components/CarritoItem";
import { crearDireccionService, deleteOrdenProducto, getCarrito, updateOrdenProducto, updateOrdenService } from "../services/CarritoService";
import { useAuth } from "../hooks/useAuth";
import fondo from "../../public/Group 69.png"
import ModalDireccion from "../components/ModalDireccion";

export default function Carrito() {
    const [carrito, setCarrito] = useState([]) // aquí guardaremos exactamente data.ordenProductos
    const [orderMeta, setOrderMeta] = useState(null); // aquí guardamos data (idOrden, totalPago, usuario, estado)
    const [loading, setLoading] = useState(false);
    const [openDireccion, setOpenDireccion] = useState(false);
    const { user } = useAuth();

    const navigate = useNavigate()

    const handleOpenPago = () => {
        setOpenDireccion(true);
    };

    // Callback cuando el modal devuelve la dirección
    const handleDireccionSubmit = async (direccionPayload) => {
        // direccionPayload puede ser:
        // - { idDireccion, direccionObj }  -> usuario seleccionó una dirección existente
        // - { direccion, ciudad, barrio }  -> usuario creó una nueva dirección

        if (!user?.idUsuario) {
            console.error("Usuario no autenticado, no se puede crear/usar dirección.");
            return;
        }

        setLoading(true);
        try {
            // Si es dirección existente, no la creamos: solo avanzamos con la orden
            if (direccionPayload?.idDireccion) {
                // Nota: por ahora actualizamos solo el estado de la orden.
                // Si quieres asociar idDireccion a la orden, debemos permitir idDireccion en el backend (validator + controller).
                if (orderMeta?.idOrden) {
                    await updateOrdenService(orderMeta.idOrden, { estado: 2 }); // 2 = en proceso
                }
                setOpenDireccion(false);
                return;
            }

            // Si viene un objeto nuevo, lo creamos y luego actualizamos la orden
            if (direccionPayload?.direccion) {
                await crearDireccionService({ ...direccionPayload, idUsuario: user.idUsuario });
                if (orderMeta?.idOrden) {
                    await updateOrdenService(orderMeta.idOrden, { estado: 2 }); // 2 = en proceso
                }
                setOpenDireccion(false);
                return;
            }

        } catch (error) {
            console.error("Error procesando la dirección:", error);
        } finally {
            await cargarCarrito();
            setLoading(false);
        }
    };

    const comprar = async () => {
        // antiguamente compraba directamente; ahora abrimos modal para pedir dirección
        handleOpenPago();
    }

    const cargarCarrito = async () => {
        if (!user?.idUsuario) return;
        setLoading(true);
        try {
            const res = await getCarrito(user.idUsuario);
            if (!res) {
                setCarrito([]);
                setOrderMeta(null);
                setLoading(false);
                return;
            }

            // Extraemos la parte de datos del body tal como la devuelve tu backend.
            // Normalmente res = { mensaje: "...", result: { success: true, data: { ... } } }
            const data = res?.result?.data ?? res?.data ?? null;

            if (!data) {
                setCarrito([]);
                setOrderMeta(null);
                setLoading(false);
                return;
            }

            setCarrito(data.ordenProductos || []);
            setOrderMeta({
                idOrden: data.idOrden,
                totalPago: data.totalPago,
                usuario: data.usuario,
                estado: data.estado,
            });
        } catch (error) {
            console.error("Error al cargar el carrito:", error);
            setCarrito([]);
            setOrderMeta(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarCarrito();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.idUsuario]);

    // total: preferir total enviado por backend si existe (orderMeta.totalPago)
    const carritoTotal = orderMeta?.totalPago ?? carrito.reduce((total, op) => {
        const price = Number(op.precioUnidad ?? op.producto?.precio ?? 0);
        const qty = Number(op.cantidad ?? 0);
        return total + price * qty;
    }, 0);

    // Handler para cambiar cantidad desde UI.
    // Usamos los nombres que vienen del backend: op.cantidad, op.idProducto, op.idOrdenProducto
    const handleQuantityChange = async (op, nuevaCantidad) => {
        // Si no hay orden persistida en backend, actualizar localmente
        if (!orderMeta?.idOrden) {
            setCarrito((prev) => prev.map((it) => it.idOrdenProducto === op.idOrdenProducto ? { ...it, cantidad: nuevaCantidad } : it));
            return;
        }

        setLoading(true);
        try {
            await updateOrdenProducto(op.idOrdenProducto, { cantidad: Number(nuevaCantidad) });
            await cargarCarrito();
        } catch (error) {
            console.error("Error actualizando cantidad:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProduct = async (op) => {
        if (!orderMeta?.idOrden) {
            setCarrito((prev) => prev.filter((it) => it.idOrdenProducto !== op.idOrdenProducto));
            return;
        }
        setLoading(true);
        try {
            await deleteOrdenProducto(op.idOrdenProducto);
            await cargarCarrito();
        } catch (error) {
            console.error("Error al eliminar producto del carrito:", error);
            return;
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <Header currentPage="Carrito" />

            <div style={{ backgroundImage: `url(${fondo})` }} className="min-h-screen bg-customBlue2 bg-cover bg-center w-screen from-white to-gray-50 py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold text-customPurple1 mb-8">Mi Carrito</h1>

                    {loading ? (
                        <div className="p-8 text-center">Cargando carrito...</div>
                    ) : carrito.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-12 text-center">
                            <div className="text-6xl mb-4">🛒</div>
                            <p className="text-gray-600 text-lg">Tu carrito está vacío</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-4">
                                {carrito.map((op) => (
                                    <CarritoItem
                                        key={op.idOrdenProducto ?? op.idProducto}
                                        op={op}
                                        onCantidadChange={(nueva) => handleQuantityChange(op, nueva)}
                                        onRemove={() => handleDeleteProduct(op)}
                                    />
                                ))}
                            </div>

                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-lg shadow-md p-6 sticky top-6 space-y-4">
                                    <h2 className="text-xl font-bold text-customPurple1 mb-6">Resumen del Carrito</h2>

                                    <div className="space-y-3 border-b border-gray-200 pb-4">
                                        {carrito.map((op) => (
                                            <div
                                                key={op.idOrdenProducto ?? op.idProducto}
                                                className="flex justify-between text-sm text-gray-600"
                                            >
                                                <span>
                                                    {op.producto?.nombre} x{op.cantidad}
                                                </span>
                                                <span className="font-semibold">${(Number(op.precioUnidad ?? op.producto?.precio ?? 0) * Number(op.cantidad)).toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-2 py-4">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal</span>
                                            <span>${carritoTotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Envío</span>
                                            <span>Gratis</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Impuestos</span>
                                            <span>Calcular</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-lg font-semibold text-gray-800">Total</span>
                                            <span className="text-3xl font-bold text-customPurple1">
                                                ${carritoTotal.toLocaleString()}
                                            </span>
                                        </div>

                                        <button onClick={comprar} className="w-full bg-customPurple1 hover:bg-purple-600 text-white font-bold py-3 rounded-lg transition mb-3">
                                            Comprar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ModalDireccion open={openDireccion} setOpen={setOpenDireccion} onSubmit={handleDireccionSubmit} />
        </div>
    );
}