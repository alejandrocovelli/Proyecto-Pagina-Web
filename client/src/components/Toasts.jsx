import React from 'react'

const variants = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  warning: 'bg-yellow-500',
}

export default function Toasts({ toasts = [], onRemove = () => {} }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`max-w-sm w-full text-white px-4 py-3 rounded shadow-lg flex items-start gap-3 ${variants[t.type] || variants.info}`}
        >
          <div className="flex-1">
            <div className="font-medium">{t.type === 'success' ? 'Éxito' : t.type === 'error' ? 'Error' : ''}</div>
            <div className="text-sm mt-1">{t.message}</div>
          </div>
          <button onClick={() => onRemove(t.id)} className="text-white opacity-80 hover:opacity-100">✕</button>
        </div>
      ))}
    </div>
  )
}
