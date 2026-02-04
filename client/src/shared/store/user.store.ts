import { create } from 'zustand'
import {
    persist,
    createJSONStorage
} from 'zustand/middleware'

type BearStore = {
    token: string | null
    setToken: (token: string) => void
}

export const useUserStore = create<BearStore>()(
    persist(
        (set, get) => ({
            token: null,
            setToken: (token: string) => set({ token }),
        }),
        {
            name: 'user-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)
