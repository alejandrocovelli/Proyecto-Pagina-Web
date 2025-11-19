//import { useParams } from "react-router-dom"
import Header from "../components/header";
import BarraLateral from "../components/BarraLateral";
import ProductoCard from "../components/ProductoCard";
import { useEffect, useState } from "react";
import ModalCrear from "../components/ModalCrear";
import { useNavigate, } from "react-router-dom";
import CarritoItem from "../components/CarritoItem";
import { getCarrito, updateOrdenService } from "../services/CarritoService";
import { useAuth } from "../hooks/useAuth";
import fondo from "../../public/Group 69.png"

export default function Carrito() {
    const [quantity, setQuantity] = useState(1)
    const [cart, setCart] = useState([])
    const [orderMeta, setOrderMeta] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const navigate = useNavigate()

    // Mapea la respuesta del backend a la forma que espera la UI
    const mapBackendToCart = (data) => {
        if (!data) return { items: [], meta: null };

        const items = (data.ordenProductos || []).map((op) => ({
            idOrdenProducto: op.idOrdenProducto,
            idProducto: op.idProducto,
            title: op.producto?.nombre ?? op.producto?.name ?? `Producto ${op.idProducto}`,
            price: Number(op.precioUnidad ?? op.producto?.precio ?? 0),
            quantity: Number(op.cantidad ?? 1),
            image: op.producto?.imagen ?? op.producto?.imagenUrl ?? null,
            valorTotal: Number(op.valorTotal ?? (op.precioUnidad * op.cantidad ?? 0)),
        }));

        const meta = {
            idOrden: data.idOrden,
            totalPago: data.totalPago,
            usuario: data.usuario,
            estado: data.estado,
        };

        return { items, meta };
    };

    const cargarCarrito = async () => {
        if (!user?.idUsuario) return;
        setLoading(true);
        try {
            const res = await getCarrito(user.idUsuario); // res puede ser null o el objeto de la API
            // Si el servicio retorna null (404) o el servicio interno devolvió { mensaje: "...", data: null }
            if (!res) {
                setCart([]);
                setOrderMeta(null);
                setLoading(false);
                return;
            }

            // Distintas formas: res may be { mensaje, result: { data: {...} } } o { mensaje, data: null }
            const data =
                res?.result?.data !== undefined ? res.result.data
                : res?.data !== undefined ? res.data
                : res?.data === null || res?.mensaje === "Carrito no encontrado" ? null
                : res?.result ?? null;

            if (!data) {
                setCart([]);
                setOrderMeta(null);
                setLoading(false);
                return;
            }

            const { items, meta } = mapBackendToCart(data);
            setCart(items);
            setOrderMeta(meta);
        } catch (error) {
            console.error("Error al cargar el carrito:", error);
            setCart([]);
            setOrderMeta(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Carga cuando el usuario esté disponible
        cargarCarrito();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.idUsuario]);

    // total: preferir total enviado por backend si existe (meta.totalPago)
    const cartTotal = orderMeta?.totalPago ?? cart.reduce((total, item) => total + item.price * item.quantity, 0);

    // Handler para cambiar cantidad desde UI.
    // Nota importante: el backend actual implementa updateOrden sumando la cantidad enviada al existente,
    // por eso aquí calculamos delta = new - current; sólo enviamos al backend si delta > 0 (incremento).
    const handleQuantityChange = async (item, newQuantity) => {
        if (!orderMeta?.idOrden) {
            // No hay orden persistida en el backend (carrito no creado) -> actualizar localmente
            setCart((prev) => prev.map((it) => (it.idOrdenProducto === item.idOrdenProducto ? { ...it, quantity: newQuantity } : it)));
            return;
        }

        const delta = Number(newQuantity) - Number(item.quantity);
        if (delta === 0) return;

        if (delta > 0) {
            // Enviar sólo el incremento al backend (updateOrden suma cantidades)
            try {
                await updateOrdenService(orderMeta.idOrden, {
                    productos: [{ idProducto: item.idProducto, cantidad: delta }]
                });
                // refrescar desde servidor para obtener valores actualizados (precios, total, etc.)
                await cargarCarrito();
            } catch (error) {
                console.error("Error al aumentar cantidad en backend:", error);
            }
        } else {
            // delta < 0 -> el backend actual NO soporta decrementar cantidades mediante updateOrden (requiere endpoint específico).
            // Como comportamiento intermedio actualizamos UI localmente y dejamos una nota en consola.
            console.warn("Decremento local: el backend no soporta decrementar cantidades con el endpoint actual. Implementa un endpoint para disminuir/eliminar.");
            setCart((prev) => prev.map((it) => (it.idOrdenProducto === item.idOrdenProducto ? { ...it, quantity: newQuantity } : it)));
            // Si quieres, podemos llamar a una nueva ruta para setear cantidades o eliminar la línea (necesita cambios backend).
        }
    };

    const handleRemove = async (item) => {
        // Si no hay orden en backend, solo lo removemos del UI
        if (!orderMeta?.idOrden) {
            setCart((prev) => prev.filter((it) => it.idOrdenProducto !== item.idOrdenProducto));
            return;
        }

        // Backend actual no tiene endpoint para eliminar ordenProducto.
        // Opciones:
        // - Implementar endpoint DELETE /ordenes/:idOrden/productos/:idOrdenProducto en backend.
        // - O usar updateOrden para ajustar cantidades (pero no acepta números negativos).
        // Por ahora removemos localmente y avisamos en consola.
        const confirmRemove = window.confirm("¿Eliminar este producto del carrito? (nota: actualmente sólo se elimina localmente hasta que implementes la API)");
        if (!confirmRemove) return;
        setCart((prev) => prev.filter((it) => it.idOrdenProducto !== item.idOrdenProducto));
        console.warn("Producto eliminado en UI. Implementa endpoint para eliminar en backend y sincronizar cambios.");
    };

    return (
        <div className="w-full">
            <Header currentPage="Carrito" />

            <div style={{ backgroundImage: `url(${fondo})` }} className="min-h-screen bg-customBlue2 bg-cover bg-center w-screen from-white to-gray-50 py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold text-customPurple1 mb-8">Mi Carrito</h1>

                    {loading ? (
                        <div className="p-8 text-center">Cargando carrito...</div>
                    ) : cart.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-12 text-center">
                            <div className="text-6xl mb-4">🛒</div>
                            <p className="text-gray-600 text-lg">Tu carrito está vacío</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-4">
                                {cart.map((item) => (
                                    <CarritoItem
                                        key={item.idOrdenProducto ?? item.idProducto}
                                        title={item.title}
                                        price={item.price}
                                        quantity={item.quantity}
                                        image={item.image}
                                        onQuantityChange={(newQ) => handleQuantityChange(item, newQ)}
                                        onRemove={() => handleRemove(item)}
                                    />
                                ))}
                            </div>

                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-lg shadow-md p-6 sticky top-6 space-y-4">
                                    <h2 className="text-xl font-bold text-customPurple1 mb-6">Resumen del Carrito</h2>

                                    <div className="space-y-3 border-b border-gray-200 pb-4">
                                        {cart.map((item) => (
                                            <div
                                                key={item.idOrdenProducto ?? item.idProducto}
                                                className="flex justify-between text-sm text-gray-600"
                                            >
                                                <span>
                                                    {item.title} x{item.quantity}
                                                </span>
                                                <span className="font-semibold">${(item.price * item.quantity).toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-2 py-4">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal</span>
                                            <span>${cartTotal.toLocaleString()}</span>
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
                                                ${cartTotal.toLocaleString()}
                                            </span>
                                        </div>

                                        <button className="w-full bg-customPurple1 hover:bg-purple-600 text-white font-bold py-3 rounded-lg transition mb-3">
                                            Proceder al Pago
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
