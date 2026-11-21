import { useState, type FormEvent } from 'react'

const API_URL = import.meta.env.VITE_API_URL

interface LoginProps {
  onLogin: (token: string) => void
  sessionMessage?: string | null
}

export default function Login({ onLogin, sessionMessage }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      if (!response.ok) {
        setError(data.detail ?? 'Error al iniciar sesión')
        return
      }

      localStorage.setItem('token', data.token)
      onLogin(data.token)
    } catch {
      setError('No se pudo conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-box">
      <h1>Iniciar sesión</h1>
      {sessionMessage && <p className="info-msg">{sessionMessage}</p>}
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}
