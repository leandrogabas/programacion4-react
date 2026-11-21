import { useState } from 'react'

export default function Ej2() {
  const [contador, setContador] = useState(0)

  const decrementar = () => {
    setContador((prev) => Math.max(0, prev - 1))
  }

  const incrementar = () => {
    setContador((prev) => Math.min(10, prev + 1))
  }

  const reiniciar = () => {
    setContador(0)
  }

  return (
    <div>
      <p>
        Valor actual: <strong>{contador}</strong>
      </p>
      <div className="controls">
        <button onClick={decrementar} disabled={contador === 0}>
          -
        </button>
        <button onClick={incrementar} disabled={contador === 10}>
          +
        </button>
        <button className="secondary" onClick={reiniciar}>
          Reiniciar
        </button>
      </div>
      {contador === 10 && <p className="alert-warning">Llegaste al máximo</p>}
    </div>
  )
}
