import { useState } from 'react'

const LENGUAJES = ['JavaScript', 'Java', 'Python', 'TypeScript', 'C#', 'Go', 'Rust']

export default function Ej6() {
  const [busqueda, setBusqueda] = useState('')

  const filtrados = LENGUAJES.filter((lenguaje) =>
    lenguaje.toLowerCase().includes(busqueda.toLowerCase()),
  )

  return (
    <div>
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar lenguaje..."
      />
      <p>
        {filtrados.length} {filtrados.length === 1 ? 'resultado' : 'resultados'}
      </p>
      <ul className="list-items">
        {filtrados.map((lenguaje) => (
          <li key={lenguaje} className="list-item">
            {lenguaje}
          </li>
        ))}
      </ul>
    </div>
  )
}
