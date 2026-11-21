import { useEffect, useState } from 'react'
import Login from './Login'
import UserList from './UserList'
import type { User } from './types'

const API_URL = import.meta.env.VITE_API_URL

export default function App() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
  const [me, setMe] = useState<User | null>(null)

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
        if (!resId.ok) return
        const { id } = (await resId.json()) as { id: number }

        const resUser = await fetch(`${API_URL}/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!resUser.ok) return
        const userData = (await resUser.json()) as User
        setMe(userData)
      } catch {
        // Ignorar errores de red al cargar el perfil
      }
    }

    fetchMe()
  }, [token])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setMe(null)
  }

  if (!token) {
    return <Login onLogin={setToken} />
  }

  return (
    <main className="container">
      <header className="header">
        <h1>{me ? `Hola, ${me.name}` : 'Usuarios'}</h1>
        <button className="secondary" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <UserList token={token} />
    </main>
  )
}
