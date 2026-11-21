import { useState, type FormEvent } from 'react'

const API_URL = import.meta.env.VITE_API_URL

interface CreateUserFormProps {
  token: string
  onCreated: () => void
  onUnauthorized: () => void
}

export default function CreateUserForm({
  token,
  onCreated,
  onUnauthorized,
}: CreateUserFormProps) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [countryId, setCountryId] = useState('1')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      const response = await fetch(`${API_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          age: Number(age),
          email,
          password,
          country_id: Number(countryId),
        }),
      })

      if (response.status === 401) {
        onUnauthorized()
        return
      }

      const data = await response.json()
      if (!response.ok) {
        setError(data.detail ?? 'Error al crear el usuario')
        return
      }

      setName('')
      setAge('')
      setEmail('')
      setPassword('')
      setCountryId('1')
      onCreated()
    } catch {
      setError('No se pudo conectar con el servidor')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="create-card">
      <h3>Alta de usuario</h3>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="create-name">Nombre</label>
            <input
              id="create-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="create-age">Edad</label>
            <input
              id="create-age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="create-email">Email</label>
            <input
              id="create-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="create-password">Contraseña</label>
            <input
              id="create-password"
              type="password"
              minLength={4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="create-country">País</label>
            <select
              id="create-country"
              value={countryId}
              onChange={(e) => setCountryId(e.target.value)}
            >
              <option value="1">Argentina</option>
              <option value="2">Brasil</option>
            </select>
          </div>
        </div>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Creando...' : 'Crear usuario'}
        </button>
      </form>
    </div>
  )
}
