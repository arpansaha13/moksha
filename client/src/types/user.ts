export interface User {
  id: number
  tag: string
  avatar_idx: number
  first_name: string
  last_name: string
  username: string
}

export interface AuthUser extends User {
  email: string
  institution: string
  phone_no: string
}
