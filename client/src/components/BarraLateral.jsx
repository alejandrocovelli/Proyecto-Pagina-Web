export default function BarraLateral({ sections }) {
    return (
        <aside className="w-80 bg-white p-6 border-r border-gray-200">
            <h1 className="text-customPurple1 text-xl font-bold uppercase mb-3">Categoria/Productos</h1>
            {sections.map((section, idx) => (
                <div key={idx} className="mb-8">
                    <h3 className="text-customPurple1 font-bold text-sm mb-3 uppercase">{section.title}</h3>
                    <ul className="space-y-2">
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
                    </ul>
                </div>
            ))}
        </aside>
    )
}
