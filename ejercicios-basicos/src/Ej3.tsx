import { useState } from 'react'

export default function Ej3() {
  const [mostrar, setMostrar] = useState(false)

  return (
    <div className="card">
      <h3>¿Qué es JSX?</h3>
      <button onClick={() => setMostrar((prev) => !prev)}>
        {mostrar ? 'Ocultar respuesta' : 'Mostrar respuesta'}
      </button>
      {mostrar && (
        <p>
          JSX es una extensión de sintaxis para JavaScript y TypeScript que permite escribir
          estructuras similares a HTML dentro del código de React para describir la interfaz de
          usuario.
        </p>
      )}
    </div>
  )
}
