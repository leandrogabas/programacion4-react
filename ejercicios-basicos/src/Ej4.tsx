import { useState } from 'react'

export default function Ej4() {
  const [celsius, setCelsius] = useState('')

  const celsiusNumero = celsius.trim() === '' ? null : Number(celsius)
  const esValido = celsiusNumero !== null && !Number.isNaN(celsiusNumero)
  const fahrenheit = esValido ? ((celsiusNumero * 9) / 5 + 32).toFixed(1) : null

  return (
    <div>
      <label>
        Temperatura en °C:{' '}
        <input
          type="number"
          value={celsius}
          onChange={(e) => setCelsius(e.target.value)}
          placeholder="Ej: 35"
        />
      </label>
      {fahrenheit !== null && <p>Equivalente: {fahrenheit} °F</p>}
      {esValido && celsiusNumero > 30 && <p className="alert-warning">Hace calor</p>}
    </div>
  )
}
