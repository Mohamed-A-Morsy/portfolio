import { create } from "zustand"

export interface RecruiterMessage {
  id: string
  name: string
  email: string
  company: string
  position: string
  message: string
  createdAt: Date
  status: "new" | "read" | "replied"
}

interface AdminStore {
  messages: RecruiterMessage[]
  filteredMessages: RecruiterMessage[]
  searchTerm: string
  statusFilter: string
  setSearchTerm: (term: string) => void
  setStatusFilter: (status: string) => void
  markAsRead: (id: string) => void
  markAsReplied: (id: string) => void
  deleteMessage: (id: string) => void
  addMessage: (message: Omit<RecruiterMessage, "id" | "createdAt" | "status">) => void
}

// Mock data for demonstration
const mockMessages: RecruiterMessage[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    company: "TechCorp Solutions",
    position: "Senior Full Stack Developer",
    message:
      "We are looking for a talented full-stack developer to join our growing team. The role involves working with React, Node.js, and AWS. Competitive salary and great benefits package.",
    createdAt: new Date("2024-01-15T10:30:00"),
    status: "new",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@startupxyz.com",
    company: "StartupXYZ",
    position: "Lead Frontend Developer",
    message:
      "Exciting opportunity at a fast-growing fintech startup. We need someone with strong React and TypeScript skills. Equity package included.",
    createdAt: new Date("2024-01-14T14:20:00"),
    status: "read",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@bigtech.com",
    company: "BigTech Inc",
    position: "Software Engineer III",
    message:
      "We have an opening for a software engineer on our platform team. Remote-first company with excellent work-life balance. Looking for someone with 5+ years experience.",
    createdAt: new Date("2024-01-13T09:15:00"),
    status: "replied",
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@consultingfirm.com",
    company: "Elite Consulting",
    position: "Technical Consultant",
    message:
      "Contract opportunity for 6 months with potential for extension. Need someone who can work with multiple clients on various tech stacks.",
    createdAt: new Date("2024-01-12T16:45:00"),
    status: "new",
  },
]

export const useAdminStore = create<AdminStore>((set, get) => ({
  messages: mockMessages,
  filteredMessages: mockMessages,
  searchTerm: "",
  statusFilter: "all",

  setSearchTerm: (term: string) => {
    set({ searchTerm: term })
    get().filterMessages()
  },

  setStatusFilter: (status: string) => {
    set({ statusFilter: status })
    get().filterMessages()
  },

  filterMessages: () => {
    const { messages, searchTerm, statusFilter } = get()
    let filtered = messages

    if (searchTerm) {
      filtered = filtered.filter(
        (message) =>
          message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.position.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((message) => message.status === statusFilter)
    }

    set({ filteredMessages: filtered })
  },

  markAsRead: (id: string) => {
    set((state) => ({
      messages: state.messages.map((msg) => (msg.id === id ? { ...msg, status: "read" as const } : msg)),
    }))
    get().filterMessages()
  },

  markAsReplied: (id: string) => {
    set((state) => ({
      messages: state.messages.map((msg) => (msg.id === id ? { ...msg, status: "replied" as const } : msg)),
    }))
    get().filterMessages()
  },

  deleteMessage: (id: string) => {
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== id),
    }))
    get().filterMessages()
  },

  addMessage: (messageData) => {
    const newMessage: RecruiterMessage = {
      ...messageData,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: "new",
    }
    set((state) => ({
      messages: [newMessage, ...state.messages],
    }))
    get().filterMessages()
  },
}))
