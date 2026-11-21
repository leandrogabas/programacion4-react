export interface Country {
  id: number
  name: string
}

export interface Role {
  id: number
  name: string
}

export interface User {
  id: number
  name: string
}

export interface UserDetail extends User {
  age: number
  email: string
  country: Country | null
  roles: Role[]
}
