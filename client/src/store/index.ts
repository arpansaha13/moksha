import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { createAuthSlice, type AuthSlice } from './auth.slice'

interface AppStore extends AuthSlice {}

export const useStore = create<AppStore>()(
  immer((...a) => ({
    ...createAuthSlice(...a),
  }))
)
