import { useCallback, useEffect, useState } from 'react'
import Login from './Login'
import UserList from './UserList'
import type { User } from './types'

const API_URL = import.meta.env.VITE_API_URL

export default function App() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
  const [me, setMe] = useState<User | null>(null)
  const [sessionMessage, setSessionMessage] = useState<string | null>(null)

  const handleUnauthorized = useCallback(() => {
    localStorage.removeItem('token')
    setToken(null)
    setMe(null)
    setSessionMessage('Tu sesión venció')
  }, [])

  const handleLogin = (newToken: string) => {
    setSessionMessage(null)
    setToken(newToken)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setMe(null)
    setSessionMessage(null)
  }

  useEffect(() => {
    if (!token) {
      setMe(null)
      return
    }

    const fetchMe = async () => {
      try {
        const resId = await fetch(`${API_URL}/user/me/id`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (resId.status === 401) {
          handleUnauthorized()
          return
        }
        if (!resId.ok) return
        const { id } = (await resId.json()) as { id: number }

        const resUser = await fetch(`${API_URL}/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (resUser.status === 401) {
          handleUnauthorized()
          return
        }
        if (!resUser.ok) return
        const userData = (await resUser.json()) as User
        setMe(userData)
      } catch {
        // Ignorar errores de red al cargar el perfil
      }
    }

    fetchMe()
  }, [token, handleUnauthorized])

  if (!token) {
    return <Login onLogin={handleLogin} sessionMessage={sessionMessage} />
  }

  const rolesTexto =
    me?.roles && me.roles.length > 0
      ? me.roles.map((role) => role.name).join(', ')
      : 'Sin roles'

  return (
    <main className="container">
      <header className="header">
        <h1>{me ? `Hola, ${me.name} (${rolesTexto})` : 'Usuarios'}</h1>
        <button className="secondary" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <UserList token={token} onUnauthorized={handleUnauthorized} />
    </main>
  )
}
