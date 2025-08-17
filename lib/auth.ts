"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  isAuthenticated: boolean
  user: { email: string } | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

// Simple authentication - in production, use proper auth service
const ADMIN_CREDENTIALS = {
  email: "admin@portfolio.com",
  password: "admin123",
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,

      login: async (email: string, password: string) => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
          set({
            isAuthenticated: true,
            user: { email },
          })
          return true
        }
        return false
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        })
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
