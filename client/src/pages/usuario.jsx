import Header from "../components/header"
import UsuarioCard from "../components/UsuarioCard"
import { User, Gem, CreditCard, DoorClosed, Search, MapPin } from "lucide-react"


export default function Usuario() {
    const actions = [
        { icon: User, label: "Informacion Personal" },
        { icon: MapPin, label: "Direcciones" },
        { icon: Search, label: "Ordenes" },
        { icon: Gem, label: "Membresía" },
        { icon: CreditCard, label: "Facturacion" },
        { icon: DoorClosed, label: "Cerrar Sesion" },
    ]

    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header currentPage="Usuario" />

            <div className="relative flex-1 pt-6 px-4 overflow-hidden flex flex-col items-center h-full">
                    <div className="max-w-5xl relative h-full z-10 bg-customBlue3 px-24 py-10 rounded-t-3xl w-[80vw] mt-auto">
                        {/* User Card */}
                        <div className="mb-8">
                            <UsuarioCard name="Alejandro Covelli" email="alejandro_covelli07@gmail.com" avatarText="AC" isPremium />
                        </div>

                        {/* Actions Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                            {actions.map((action, i) => (
                                <button
                                key={i}
                                    className="bg-white rounded-lg p-6 flex flex-col items-center justify-center gap-4 shadow-md hover:shadow-lg transition hover:scale-105 cursor-pointer"
                                >
                                    {/* renderizar componente con clases */}
                                    <div className="text-5xl text-customPurple1">
                                        <action.icon className="w-20 h-20" />
                                    </div>
                                    <span className="text-customPurple1 font-bold">{action.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Footer Message */}
                        <p className="text-white text-center text-sm">
                            Puedes <span className="underline cursor-pointer hover:font-semibold">cancelar tu cuenta</span> siempre que
                            lo desees.
                        </p>
                    </div>
            </div>
        </div>
    )
}