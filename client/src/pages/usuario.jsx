import Header from "../components/Header"
import UsuarioCard from "../components/UsuarioCard"
import { User, Gem, CreditCard, DoorClosed, Search, MapPin } from "lucide-react"
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import fondo from "../../public/Group 69.png"

export default function Usuario() {
    const { user, logoutHandler } = useAuth();
    const actions = [
        { icon: User, label: "Informacion Personal" },
        { icon: MapPin, label: "Direcciones" },
        { icon: Search, label: "Ordenes" },
        { icon: Gem, label: "Membresía" },
        { icon: CreditCard, label: "Facturacion" },
        { icon: DoorClosed, label: "Cerrar Sesion" },
    ]

    /*useEffect(() => {
        setAvatarText(user?.nombre.slice(0, 2).toUpperCase());
    }, []);*/

    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header currentPage="Usuario" />

            <div style={{ backgroundImage: `url(${fondo})` }} className="relative bg-customBlue2 bg-cover bg-center w-full flex-1 pt-6 px-4 flex flex-col items-center overflow-y-auto">
                    <div className="relative z-10 bg-customBlue3 w-full rounded-t-3xl px-6 py-10 max-w-5xl md:px-16 lg:px-24 mt-auto">
                        {/* User Card */}
                        <div className="mb-8 w-full">
                            <UsuarioCard name={user.nombre} email={user.correo} avatarText={user.nombre.slice(0, 2).toUpperCase()} isPremium />
                        </div>

                        {/* Actions Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
                            {actions.map((action, i) => (
                                <button
                                onClick={action.label == "Cerrar Sesion" ? () => logoutHandler() : null}
                                key={i}
                                    className="bg-white rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center gap-3 shadow-md hover:shadow-xl hover:scale-[1.03] active:scale-95 transition cursor-pointer "
                                >
                                    {/* renderizar componente con clases */}
                                    <div className="text-5xl text-customPurple1">
                                        <action.icon className="w-10 h-10 sm:w-16 sm:h-16 text-customPurple1" />
                                    </div>
                                    <span className="text-customPurple1 font-semibold text-xs sm:text-sm text-center">{action.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Footer Message */}
                        <p className="text-white text-center text-sm pb-6">
                            Puedes <span className="underline cursor-pointer hover:font-semibold">cancelar tu cuenta</span> siempre que
                            lo desees.
                        </p>
                    </div>
            </div>
        </div>
    )
}