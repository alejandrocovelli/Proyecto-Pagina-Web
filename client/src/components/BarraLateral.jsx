export default function BarraLateral({ sections, onClick }) {
    return (
        <aside className="w-80 bg-white p-6 border-r border-gray-200 h-screen overflow-y-auto">
            <h1 className="text-customPurple1 text-xl font-bold uppercase mb-4">
                Categoría/Productos
            </h1>
            <div className="space-y-1">
                {sections.map((section, idx) => (
                    <div key={idx} className="mb-8">
                        <h3 onClick={() => onClick(section.id)} className=" w-full px-4 py-3 rounded-lg transition font-medium uppercase cursor-pointer">
                            {section.nombre}
                        </h3>
                        {/* <ul className="space-y-2">
                        {section.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                                <button
                                    onClick={item.onClick}
                                    className="text-gray-700 text-sm hover:text-customPurple1 hover:font-semibold transition block w-full text-left"
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul> */}
                    </div>
                ))}
            </div>
        </aside>
    );
}
