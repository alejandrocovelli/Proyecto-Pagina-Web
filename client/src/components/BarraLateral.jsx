export default function BarraLateral({ sections, onClick, isOpen, onClose }) {
    return (
        <>
            {/* Fondo oscuro en móvil cuando el sidebar está abierto */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed md:static top-0 left-0 bg-white border-r border-gray-200
                    w-64 p-6 overflow-y-auto z-50 transform transition-transform
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0 md:w-80 break-words whitespace-normal h-screen
                `}
            >
                <h1 className="text-customPurple1 text-xl font-bold uppercase mb-4">
                    Categoría/Productos
                </h1>

                <div className="space-y-1">
                    {sections.map((section, idx) => (
                        <div key={idx} className="mb-8">
                            <h3
                                onClick={() => onClick(section.id)}
                                className="w-full px-4 py-3 rounded-lg transition font-medium uppercase cursor-pointer hover:bg-gray-100"
                            >
                                {section.nombre}
                            </h3>
                        </div>
                    ))}
                </div>
            </aside>
        </>
    );
}