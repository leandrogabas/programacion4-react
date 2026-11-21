import { useEffect, useState } from 'react'
import type { User, UserDetail } from './types'

const API_URL = import.meta.env.VITE_API_URL

interface UserListProps {
  token: string
}

export default function UserList({ token }: UserListProps) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)
  const [detailError, setDetailError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`${API_URL}/user`, {
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
    }

    fetchUsers()
  }, [token])

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

  return (
    <section>
      <h2>Lista de usuarios</h2>

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
