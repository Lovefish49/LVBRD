"use client"

import React, { useState } from "react"
import { MessageCircle, Globe, Users, User, Heart, Phone } from "lucide-react"

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
  {
    id: "6",
    name: "Harper",
    age: 27,
    avatar: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?q=80&w=120&auto=format&fit=crop",
    company: "Healthcare",
    compatibility: 88,
    lastMessage: "Great talking with you!",
    lastMessageTime: "3d ago",
    isOnline: false,
    unreadCount: 0,
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
    <div className="h-screen flex flex-col font-sans bg-gradient-to-b from-white via-titanium-light to-titanium-mid overflow-hidden">
      {/* iOS-style status bar spacer with glass effect */}
      <div className="pt-safe glass-surface flex-shrink-0"></div>
      
      {/* Header with Liquid Glass Effect */}
      <div className="glass-nav text-center p-4 border-b border-glass-border animate-liquid-rise flex-shrink-0">
        <div className="max-w-sm mx-auto">
          <h1 className="text-xl font-bold tracking-tight text-text-primary mb-1">Contacts</h1>
          <p className="text-xs text-text-secondary font-medium">{contacts.length} connections</p>
        </div>
      </div>

      {/* Main Content with Glass Container - Flex grow to fill remaining space */}
      <div className="flex-1 flex flex-col px-6 py-4 animate-liquid-rise min-h-0" style={{ animationDelay: "100ms" }}>
        <div className="max-w-md mx-auto flex flex-col h-full">
          {contacts.length > 0 ? (
            <div className="flex-1 min-h-0">
              <div className="h-full overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-glass-border scrollbar-track-transparent">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => handleContactClick(contact.id)}
                    className="activity-card p-4 haptic-premium cursor-pointer flex-shrink-0"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative flex-shrink-0">
                        <img
                          src={contact.avatar}
                          alt={contact.name}
                          className="w-12 h-12 rounded-2xl object-cover avatar-premium"
                        />
                        {contact.isOnline && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h2 className="font-semibold text-text-primary text-sm truncate">{contact.name}</h2>
                          <span className="text-text-tertiary text-xs font-medium flex-shrink-0 ml-2">
                            {contact.lastMessageTime}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-text-secondary text-xs truncate flex-1">
                            {contact.lastMessage}
                          </p>
                          {contact.unreadCount > 0 && (
                            <div className="w-5 h-5 bg-surface-primary text-text-inverse text-xs font-bold rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                              {contact.unreadCount}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-text-tertiary text-xs font-medium">{contact.company}</span>
                          <span className="text-text-tertiary text-xs">•</span>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-3 h-3 text-red-500 fill-current" />
                            <span className="text-text-tertiary text-xs font-medium">{contact.compatibility}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="glass-card w-20 h-20 rounded-5xl flex items-center justify-center mb-6">
                <Users className="w-10 h-10 text-text-tertiary" />
              </div>
              <h2 className="text-xl font-bold mb-2 text-text-primary">No Contacts Yet</h2>
              <p className="text-text-secondary text-sm max-w-xs">
                When you match with someone, they'll appear here for future conversations.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom Navigation with Glass Effect */}
      <div className="glass-nav px-6 py-2 pb-safe animate-liquid-rise flex-shrink-0" style={{ animationDelay: "200ms" }}>
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button
            onClick={() => handleTabClick("discovery")}
            className="nav-item flex flex-col items-center py-2 px-3 rounded-xl haptic-premium"
          >
            <Globe className="w-4 h-4 text-text-secondary mb-1" />
            <span className="text-xs text-text-secondary font-medium">Discover</span>
          </button>
          
          <button
            onClick={() => handleTabClick("chat")}
            className="nav-item flex flex-col items-center py-2 px-3 rounded-xl haptic-premium"
          >
            <MessageCircle className="w-4 h-4 text-text-secondary mb-1" />
            <span className="text-xs text-text-secondary font-medium">Chat</span>
          </button>
          
          <button
            onClick={() => handleTabClick("contacts")}
            className="nav-item active flex flex-col items-center py-2 px-3 rounded-xl haptic-premium"
          >
            <Users className="w-4 h-4 mb-1 text-text-primary" />
            <span className="text-xs font-semibold text-text-primary">Contacts</span>
          </button>
          
          <button
            onClick={() => handleTabClick("profile")}
            className="nav-item flex flex-col items-center py-2 px-3 rounded-xl haptic-premium"
          >
            <User className="w-4 h-4 text-text-secondary mb-1" />
            <span className="text-xs text-text-secondary font-medium">Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}
