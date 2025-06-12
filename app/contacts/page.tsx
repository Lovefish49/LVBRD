"use client"

import { useState } from "react"
import { MessageCircle, Home, Users, User, Heart } from "lucide-react"

interface LockedContact {
  id: string
  name: string
  age: number
  avatar: string
  company: string
  compatibility: number
  lastMessage: string
  lastMessageTime: string
  isOnline: boolean
  unreadCount: number
}

// Mock data for locked contacts
const lockedContacts: LockedContact[] = [
  {
    id: "1",
    name: "Emma",
    age: 26,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=120&auto=format&fit=crop",
    company: "Tech Startup",
    compatibility: 87,
    lastMessage: "That was such a fun conversation! 😊",
    lastMessageTime: "2m ago",
    isOnline: true,
    unreadCount: 2,
  },
  {
    id: "2",
    name: "Isabella",
    age: 24,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
    company: "Design Studio",
    compatibility: 92,
    lastMessage: "I'd love to continue our chat later!",
    lastMessageTime: "1h ago",
    isOnline: true,
    unreadCount: 0,
  },
  {
    id: "3",
    name: "Charlotte",
    age: 26,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=120&auto=format&fit=crop",
    company: "Finance Corp",
    compatibility: 89,
    lastMessage: "Thanks for the great conversation!",
    lastMessageTime: "3h ago",
    isOnline: false,
    unreadCount: 1,
  },
  {
    id: "4",
    name: "Mia",
    age: 28,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
    company: "Marketing Agency",
    compatibility: 85,
    lastMessage: "Looking forward to our next chat!",
    lastMessageTime: "1d ago",
    isOnline: false,
    unreadCount: 0,
  },
  {
    id: "5",
    name: "Amelia",
    age: 25,
    avatar: "https://images.unsplash.com/photo-1488716820095-cbe80883c496?q=80&w=120&auto=format&fit=crop",
    company: "Tech Startup",
    compatibility: 94,
    lastMessage: "You're so interesting to talk to!",
    lastMessageTime: "2d ago",
    isOnline: true,
    unreadCount: 3,
  },
]

export default function ContactsPage() {
  const [contacts] = useState<LockedContact[]>(lockedContacts)

  const handleContactClick = (contactId: string) => {
    // Navigate to chat with specific contact
    window.location.href = `/chat?contact=${contactId}`
  }

  const handleTabClick = (tab: string) => {
    switch (tab) {
      case "discovery":
        window.location.href = "/"
        break
      case "chat":
        window.location.href = "/chat"
        break
      case "contacts":
        // Already on contacts page
        break
      case "profile":
        // Profile page would go here
        break
    }
  }

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="backdrop-blur-md bg-white/10 border-b border-white/20 p-4">
        <div className="flex items-center justify-center">
          <h1 className="text-xl font-bold text-white">Locked Contacts</h1>
        </div>
        <p className="text-center text-white/70 text-sm mt-1">{contacts.length} mutual connections</p>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto p-4">
        {contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
              <Heart className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No Locked Contacts Yet</h3>
              <p className="text-white/70 text-sm mb-4">
                Start conversations and lock them to build your contact list!
              </p>
              <button
                onClick={() => handleTabClick("discovery")}
                className="backdrop-blur-md bg-white/15 border border-white/25 rounded-2xl py-2 px-4 text-white font-semibold text-sm hover:bg-white/20 transition-all duration-200"
              >
                Start Discovering
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => handleContactClick(contact.id)}
                className="w-full backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 shadow-lg hover:bg-white/15 transition-all duration-200 active:scale-98"
              >
                <div className="flex items-center space-x-3">
                  {/* Profile Picture with Online Status */}
                  <div className="relative">
                    <img
                      src={contact.avatar || "/placeholder.svg"}
                      alt={contact.name}
                      className="w-14 h-14 rounded-xl object-cover border-2 border-white/20"
                    />
                    {contact.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
                    )}
                    {contact.unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{contact.unreadCount}</span>
                      </div>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-white">
                        {contact.name}, {contact.age}
                      </h3>
                      <span className="text-xs text-white/60">{contact.lastMessageTime}</span>
                    </div>

                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white/70">{contact.company}</span>
                      <div className="flex items-center">
                        <span className="text-xs text-green-400 font-semibold">{contact.compatibility}% match</span>
                      </div>
                    </div>

                    <p className="text-sm text-white/80 truncate">{contact.lastMessage}</p>
                  </div>

                  {/* Chat Icon */}
                  <div className="flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-white/60" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="backdrop-blur-md bg-white/10 border-t border-white/20 p-4">
        <div className="flex justify-around items-center">
          <button
            onClick={() => handleTabClick("discovery")}
            className="flex flex-col items-center p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Home className="w-4 h-4 text-white/60 mb-1" />
            <span className="text-xs text-white/60 font-medium">Discovery</span>
          </button>
          <button
            onClick={() => handleTabClick("chat")}
            className="flex flex-col items-center p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-white/60 mb-1" />
            <span className="text-xs text-white/60 font-medium">Chat</span>
          </button>
          <button
            onClick={() => handleTabClick("contacts")}
            className="flex flex-col items-center p-2 rounded-lg bg-white/15 border border-white/25"
          >
            <Users className="w-4 h-4 text-white mb-1" />
            <span className="text-xs text-white font-medium">Contacts</span>
          </button>
          <button
            onClick={() => handleTabClick("profile")}
            className="flex flex-col items-center p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <User className="w-4 h-4 text-white/60 mb-1" />
            <span className="text-xs text-white/60 font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}
