import { useCallback, useEffect, useState, type FormEvent } from 'react'
import CreateUserForm from './CreateUserForm'
import type { User, UserDetail } from './types'

const API_URL = import.meta.env.VITE_API_URL

interface UserListProps {
  token: string
}

export default function UserList({ token }: UserListProps) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [soloMayores, setSoloMayores] = useState(false)

  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)
  const [detailError, setDetailError] = useState<string | null>(null)

  const fetchUsers = useCallback(
    async (endpoint: string) => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${API_URL}${endpoint}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        if (!response.ok) {
          setError(data.detail ?? 'Error al cargar los usuarios')
          return
        }
        setUsers(data as User[])
      } catch {
        setError('No se pudo conectar con el servidor')
      } finally {
        setLoading(false)
      }
    },
    [token],
  )

  useEffect(() => {
    fetchUsers('/user')
  }, [fetchUsers])

  useEffect(() => {
    if (selectedId === null) {
      setSelectedUser(null)
      setDetailError(null)
      return
    }

    const fetchUserDetail = async () => {
      setDetailError(null)
      try {
        const response = await fetch(`${API_URL}/user/${selectedId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        if (!response.ok) {
          setDetailError(data.detail ?? 'Error al cargar el detalle del usuario')
          setSelectedUser(null)
          return
        }
        setSelectedUser(data as UserDetail)
      } catch {
        setDetailError('No se pudo conectar con el servidor')
      }
    }

    fetchUserDetail()
  }, [selectedId, token])

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = searchTerm.trim()
    setSoloMayores(false)
    if (!trimmed) {
      fetchUsers('/user')
      return
    }
    fetchUsers(`/user/search/${encodeURIComponent(trimmed)}`)
  }

  const handleClear = () => {
    setSearchTerm('')
    setSoloMayores(false)
    fetchUsers('/user')
  }

  const handleToggleMayores = () => {
    const next = !soloMayores
    setSoloMayores(next)
    setSearchTerm('')
    fetchUsers(next ? '/user_mayores' : '/user')
  }

  return (
    <section>
      <CreateUserForm
        token={token}
        onCreated={() => fetchUsers(soloMayores ? '/user_mayores' : '/user')}
      />

      <h2>Lista de usuarios</h2>

      <form className="toolbar" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nombre..."
        />
        <button type="submit">Buscar</button>
        <button type="button" className="secondary" onClick={handleClear}>
          Limpiar
        </button>
        <button type="button" className="secondary" onClick={handleToggleMayores}>
          {soloMayores ? 'Todos' : 'Solo mayores'}
        </button>
      </form>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="error-msg">{error}</p>
      ) : (
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <button
                type="button"
                className="link-btn"
                onClick={() => setSelectedId(user.id)}
              >
                {user.name}
              </button>
            </li>
          ))}
        </ul>
      )}

      {detailError && <p className="error-msg">{detailError}</p>}

      {selectedUser && (
        <div className="detail-card">
          <h3>Detalle de {selectedUser.name}</h3>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>Edad:</strong> {selectedUser.age}
          </p>
          <p>
            <strong>País:</strong> {selectedUser.country ? selectedUser.country.name : 'Sin país'}
          </p>
          <p>
            <strong>Roles:</strong>{' '}
            {selectedUser.roles.length > 0
              ? selectedUser.roles.map((role) => role.name).join(', ')
              : 'Sin roles'}
          </p>
        </div>
      )}
    </section>
  )
}
