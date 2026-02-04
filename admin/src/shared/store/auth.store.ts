import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    adminToken: string | null;
    setAdminToken: (token: string | null) => void;
    logout: () => void;
}

export const useAdminAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            adminToken: null,
            setAdminToken: (token: string | null) => set({ adminToken: token }),
            logout: () => set({ adminToken: null }),
        }),
        {
            name: 'admin-auth-storage',
        }
    )
);
