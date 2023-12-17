import type { Slice } from './types.store'

interface AuthState {
  authenticated: boolean
  user_id: number
  avatar_idx: number
}

export interface AuthSlice {
  authState: AuthState
  setAuthState: <T extends keyof AuthState>(key: T, value: AuthState[T]) => void
  resetAuthState: () => void
}

export const createAuthSlice: Slice<AuthSlice> = set => ({
  authState: {
    authenticated: false,
    user_id: 0,
    avatar_idx: 0,
  },

  setAuthState: (key, value) => {
    set(state => {
      state.authState[key] = value
    })
  },

  resetAuthState: () => {
    set({
      authState: {
        authenticated: false,
        user_id: 0,
        avatar_idx: 0,
      },
    })
  },
})
