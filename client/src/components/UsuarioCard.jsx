export default function UsuarioCard({ name, email, isPremium = false, avatarText }) {
    return (
        <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-4 shadow">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center font-bold text-customPurple1 text-lg">
                {avatarText}
            </div>
            <div>
                <h3 className="text-customPurple1 font-bold">{name}</h3>
                <p className="text-gray-600 text-sm">{email}</p>
                {isPremium && (
                    <p className="text-blue-500 text-sm">
                        Eres parte de <span className="font-semibold">Membresía Premium</span> 💎
                    </p>
                )}
            </div>
        </div>
    )
}