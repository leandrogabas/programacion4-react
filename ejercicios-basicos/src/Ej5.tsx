import { useState, type FormEvent } from 'react'

interface ItemCompra {
  id: number
  texto: string
}

export default function Ej5() {
  const [items, setItems] = useState<ItemCompra[]>([])
  const [nuevoItem, setNuevoItem] = useState('')

  const handleAgregar = (e: FormEvent) => {
    e.preventDefault()
    const textoLimpio = nuevoItem.trim()
    if (!textoLimpio) return

    setItems((prev) => [...prev, { id: Date.now(), texto: textoLimpio }])
    setNuevoItem('')
  }

  const handleEliminar = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div>
      <form className="controls" onSubmit={handleAgregar}>
        <input
          type="text"
          value={nuevoItem}
          onChange={(e) => setNuevoItem(e.target.value)}
          placeholder="Nuevo ítem..."
        />
        <button type="submit">Agregar</button>
      </form>

      {items.length === 0 ? (
        <p>No hay nada para comprar</p>
      ) : (
        <ul className="list-items">
          {items.map((item) => (
            <li key={item.id} className="list-item">
              <span>{item.texto}</span>
              <button
                type="button"
                className="danger"
                onClick={() => handleEliminar(item.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
