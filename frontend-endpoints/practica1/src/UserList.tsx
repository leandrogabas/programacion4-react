import { useEffect, useState } from 'react'
import type { User, UserDetail } from './types'

const API_URL = import.meta.env.VITE_API_URL

interface UserListProps {
  token: string
}

export default function UserList({ token }: UserListProps) {
  const [users, setUsers] = useState<User[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = (await response.json()) as User[]
        setUsers(data)
      }
    }

    fetchUsers()
  }, [token])

  useEffect(() => {
    if (selectedId === null) {
      setSelectedUser(null)
      return
    }

    const fetchUserDetail = async () => {
      const response = await fetch(`${API_URL}/user/${selectedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        const data = (await response.json()) as UserDetail
        setSelectedUser(data)
      }
    }

    fetchUserDetail()
  }, [selectedId, token])

  return (
    <section>
      <h2>Lista de usuarios</h2>
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
