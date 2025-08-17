import type React from "react"
import { AdminNav } from "@/components/admin/admin-nav"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <AdminNav />
        {children}
      </div>
    </ProtectedRoute>
  )
}
