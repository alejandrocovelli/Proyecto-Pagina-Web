export default function TabNavegacion({ tabs, activeTab, onChange }) {
    return (
        <div className="flex gap-4 mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onChange(tab)}
                    className={`w-full px-6 py-3 rounded-full font-semibold transition ${activeTab === tab ? "bg-blue-400 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    )
}
