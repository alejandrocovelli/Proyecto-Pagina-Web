//import { useParams } from "react-router-dom"
import Header from "../components/header";
import BarraLateral from "../components/BarraLateral";
import ProductoCard from "../components/ProductoCard";
import { useState } from "react";
import ModalCrear from "../components/ModalCrear";
import { useNavigate,  } from "react-router-dom";

export default function Carrito() {
    const [quantity, setQuantity] = useState(1)
    const [cart, setCart] = useState([])

    const navigate = useNavigate()

    
    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

    return (
        <div className="w-full">
            <Header currentPage="Carrito" />

            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold text-purple-600 mb-8">Mi Carrito</h1>

                    {cart.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-12 text-center">
                            <div className="text-6xl mb-4">🛒</div>
                            <p className="text-gray-600 text-lg">Tu carrito está vacío</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-4">
                                {cart.map((item) => (
                                    <CartItem
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        price={item.price}
                                        quantity={item.quantity}
                                        image={item.image}
                                        onQuantityChange={(newQuantity) => {
                                            setCart((prevCart) =>
                                                prevCart.map((cartItem) =>
                                                    cartItem.id === item.id
                                                        ? { ...cartItem, quantity: newQuantity }
                                                        : cartItem
                                                )
                                            )
                                        }}
                                        onRemove={() => {
                                            setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== item.id))
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-lg shadow-md p-6 sticky top-6 space-y-4">
                                    <h2 className="text-xl font-bold text-purple-600 mb-6">Resumen del Carrito</h2>

                                    <div className="space-y-3 border-b border-gray-200 pb-4">
                                        {cart.map((item) => (
                                            <div
                                                key={item.id}
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
                                            <span className="text-3xl font-bold text-purple-600">
                                                ${cartTotal.toLocaleString()}
                                            </span>
                                        </div>

                                        <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-lg transition mb-3">
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
    )
}
