import { MessageTable } from "@/components/admin/message-table"

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage recruiter messages and opportunities</p>
        </div>

        <MessageTable />
      </div>
    </main>
  )
}
