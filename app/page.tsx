"use client"

import { useState, useEffect } from "react"
import { Heart, MessageCircle, Sparkles, Home, Users, User } from "lucide-react"

interface Match {
  id: string
  user1: {
    name: string
    avatar: string
  }
  user2: {
    name: string
    avatar: string
  }
  timestamp: Date
}

// Pool of diverse female profiles
const femaleProfiles = [
  {
    name: "Isabella",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
  },
  {
    name: "Mia",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
  },
  {
    name: "Charlotte",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=120&auto=format&fit=crop",
  },
  {
    name: "Amelia",
    avatar: "https://images.unsplash.com/photo-1488716820095-cbe80883c496?q=80&w=120&auto=format&fit=crop",
  },
  {
    name: "Harper",
    avatar: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?q=80&w=120&auto=format&fit=crop",
  },
  {
    name: "Evelyn",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=120&auto=format&fit=crop",
  },
  {
    name: "Abigail",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=120&auto=format&fit=crop",
  },
  {
    name: "Emily",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=120&auto=format&fit=crop",
  },
  {
    name: "Elizabeth",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
  },
  {
    name: "Sofia",
    avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=120&auto=format&fit=crop",
  },
]

// Pool of diverse male profiles
const maleProfiles = [
  {
    name: "Michael",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
  },
  {
    name: "James",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
  },
  {
    name: "David",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=120&auto=format&fit=crop",
  },
  {
    name: "Ryan",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=120&auto=format&fit=crop",
  },
  {
    name: "Taylor",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=120&auto=format&fit=crop",
  },
  {
    name: "Alexander",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=120&auto=format&fit=crop",
  },
  {
    name: "Benjamin",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=120&auto=format&fit=crop",
  },
  {
    name: "Christopher",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&auto=format&fit=crop",
  },
  {
    name: "Daniel",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=120&auto=format&fit=crop",
  },
  {
    name: "Ethan",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?q=80&w=120&auto=format&fit=crop",
  },
]

export default function DatingAppLanding() {
  const [matches, setMatches] = useState<Match[]>([])
  const [onlineUsers, setOnlineUsers] = useState(10247)
  const [activeChats, setActiveChats] = useState(24588)
  const [usedProfiles, setUsedProfiles] = useState<Set<string>>(new Set())
  const [usedMaleProfiles, setUsedMaleProfiles] = useState<Set<string>>(new Set())
  const [matchTimers, setMatchTimers] = useState<{ [key: string]: number }>({})
  const [interactionIndicators, setInteractionIndicators] = useState<{ [key: string]: string }>({})
  const [selectedProfile, setSelectedProfile] = useState<{ name: string; avatar: string } | null>(null)
  const [isJoining, setIsJoining] = useState(false)

  const getRandomFemaleProfile = () => {
    const availableProfiles = femaleProfiles.filter((profile) => !usedProfiles.has(profile.avatar))

    if (availableProfiles.length === 0) {
      // Reset used profiles if all have been used
      setUsedProfiles(new Set())
      return femaleProfiles[Math.floor(Math.random() * femaleProfiles.length)]
    }

    const randomProfile = availableProfiles[Math.floor(Math.random() * availableProfiles.length)]
    setUsedProfiles((prev) => new Set([...prev, randomProfile.avatar]))
    return randomProfile
  }

  const getRandomMaleProfile = () => {
    const availableProfiles = maleProfiles.filter((profile) => !usedMaleProfiles.has(profile.avatar))

    if (availableProfiles.length === 0) {
      // Reset used profiles if all have been used
      setUsedMaleProfiles(new Set())
      return maleProfiles[Math.floor(Math.random() * maleProfiles.length)]
    }

    const randomProfile = availableProfiles[Math.floor(Math.random() * availableProfiles.length)]
    setUsedMaleProfiles((prev) => new Set([...prev, randomProfile.avatar]))
    return randomProfile
  }

  const getRandomInteractionIndicator = () => {
    const indicators = ["🥂", "🍸", "✅", "heart"]
    return indicators[Math.floor(Math.random() * indicators.length)]
  }

  // Sample match data with diverse female profiles
  const sampleMatches: Match[] = [
    {
      id: "1",
      user1: {
        name: "Susan",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
      },
      user2: {
        name: "Michael",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
      },
      timestamp: new Date(),
    },
    {
      id: "2",
      user1: {
        name: "Emma",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=120&auto=format&fit=crop",
      },
      user2: {
        name: "James",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
      },
      timestamp: new Date(),
    },
    {
      id: "3",
      user1: {
        name: "Olivia",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop",
      },
      user2: {
        name: "David",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=120&auto=format&fit=crop",
      },
      timestamp: new Date(),
    },
  ]

  useEffect(() => {
    // Initialize with sample matches
    setMatches(sampleMatches)

    const initialTimers: { [key: string]: number } = {}
    sampleMatches.forEach((match) => {
      initialTimers[match.id] = Math.floor(Math.random() * 360) + 60 // Random time between 1-6 minutes
    })
    setMatchTimers(initialTimers)

    const initialIndicators: { [key: string]: string } = {}
    sampleMatches.forEach((match) => {
      initialIndicators[match.id] = getRandomInteractionIndicator()
    })
    setInteractionIndicators(initialIndicators)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setOnlineUsers((prev) => prev + Math.floor(Math.random() * 10) - 5)
      setActiveChats((prev) => prev + Math.floor(Math.random() * 20) - 10)

      // Occasionally add a new match
      if (Math.random() > 0.7) {
        const randomFemale = getRandomFemaleProfile()
        const randomMale = getRandomMaleProfile()
        const newMatch: Match = {
          id: Date.now().toString(),
          user1: {
            name: randomFemale.name,
            avatar: randomFemale.avatar,
          },
          user2: {
            name: randomMale.name,
            avatar: randomMale.avatar,
          },
          timestamp: new Date(),
        }
        setMatches((prev) => [newMatch, ...prev.slice(0, 2)])

        setMatchTimers((prev) => ({
          ...prev,
          [newMatch.id]: 360, // 6 minutes = 360 seconds
        }))

        setInteractionIndicators((prev) => ({
          ...prev,
          [newMatch.id]: getRandomInteractionIndicator(),
        }))
      }

      // Update match timers
      setMatchTimers((prev) => {
        const updated = { ...prev }
        Object.keys(updated).forEach((matchId) => {
          if (updated[matchId] > 0) {
            updated[matchId] -= 1
          }
        })
        return updated
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleProfileClick = (profile: { name: string; avatar: string }) => {
    setSelectedProfile(profile)
  }

  const handleJoinChat = () => {
    setIsJoining(true)
    // Simulate joining process
    setTimeout(() => {
      setIsJoining(false)
      // Redirect to chat page
      window.location.href = "/chat"
    }, 4000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const closeProfileModal = () => {
    setSelectedProfile(null)
  }

  const handleSendFriendRequest = (name: string) => {
    console.log(`Sending friend request to ${name}`)
    setSelectedProfile(null)
  }

  const handleTabClick = (tab: string) => {
    switch (tab) {
      case "discovery":
        // Already on discovery page
        break
      case "chat":
        window.location.href = "/chat"
        break
      case "contacts":
        window.location.href = "/contacts"
        break
      case "profile":
        // Profile page would go here
        break
    }
  }

  return (
    <div className="h-screen bg-black text-white flex items-center justify-center p-4">
      {/* Single Section Container */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-5 shadow-2xl w-full max-w-xs">
        {/* App Header */}
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-xl font-bold text-white">Lovebird</h1>
        </div>

        {/* Matches */}
        <div className="mb-4">
          <div className="flex items-center mb-3">
            <Sparkles className="w-4 h-4 text-white/80 mr-2" />
            <h2 className="text-sm font-bold text-white/90">Activities</h2>
          </div>

          <div className="space-y-3">
            {matches.slice(0, 3).map((match) => (
              <div key={match.id} className="flex items-center animate-fade-in justify-end">
                <div className="flex items-center">
                  <button
                    onClick={() => handleProfileClick({ name: match.user1.name, avatar: match.user1.avatar })}
                    className="relative group active:scale-95 transition-transform duration-150"
                  >
                    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-0.5 shadow-md">
                      <img
                        src={match.user1.avatar || "/placeholder.svg"}
                        alt={match.user1.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    </div>
                  </button>

                  <div className="mx-3 flex items-center">
                    <div className="w-5 h-0.5 bg-gradient-to-r from-white/40 to-white/20 rounded-full"></div>
                    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-full p-1 mx-2 shadow-md">
                      {interactionIndicators[match.id] === "heart" ? (
                        <Heart className="w-2.5 h-2.5 text-white/80 animate-pulse" />
                      ) : (
                        <span className="text-sm animate-pulse">{interactionIndicators[match.id]}</span>
                      )}
                    </div>
                    <div className="w-5 h-0.5 bg-gradient-to-r from-white/20 to-white/40 rounded-full"></div>
                  </div>

                  <button
                    onClick={() => handleProfileClick({ name: match.user2.name, avatar: match.user2.avatar })}
                    className="relative group active:scale-95 transition-transform duration-150"
                  >
                    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-0.5 shadow-md">
                      <img
                        src={match.user2.avatar || "/placeholder.svg"}
                        alt={match.user2.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    </div>
                  </button>
                </div>

                {/* Timer */}
                <div className="py-1 px-2">
                  <span
                    className={`text-xs font-mono font-bold px-0.5 ${
                      (matchTimers[match.id] || 0) < 60 ? "text-red-400" : "text-white/90"
                    }`}
                  >
                    {formatTime(matchTimers[match.id] || 0)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2 shadow-md animate-pulse"></div>
              <span className="text-sm font-bold text-white">{onlineUsers.toLocaleString()}</span>
            </div>
            <p className="text-white/70 text-xs font-medium">Online </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-1 mr-2 shadow-md">
                <MessageCircle className="w-3 h-3 text-white/80" />
              </div>
              <span className="text-sm font-bold text-white">{activeChats.toLocaleString()}</span>
            </div>
            <p className="text-white/70 text-xs font-medium"> Chats</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleJoinChat}
          disabled={isJoining}
          className="w-full backdrop-blur-md bg-white/15 border border-white/25 active:bg-white/20 rounded-2xl py-3 px-4 text-white font-bold text-sm transition-all duration-200 active:scale-98 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <div className="flex items-center justify-center">
            {isJoining ? (
              <>
                <div className="mr-2 relative">
                  {/* Egg */}
                  <div className="w-8 h-10 bg-gradient-to-b from-white/90 to-white/70 rounded-full relative overflow-hidden border border-white/30">
                    {/* Crack animation */}
                    <div className={`absolute inset-0 ${isJoining ? "animate-pulse" : ""}`}>
                      <div className="absolute top-3 left-3 w-0.5 h-4 bg-gray-600 transform rotate-12"></div>
                      <div className="absolute top-4 right-2 w-0.5 h-3 bg-gray-600 transform -rotate-45"></div>
                      <div className="absolute top-2 left-1 w-0.5 h-2 bg-gray-600 transform rotate-45"></div>
                    </div>

                    {/* Baby bird emerging */}
                    <div
                      className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 transition-all duration-2000 ease-out ${
                        isJoining ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                      }`}
                    >
                      <div className="w-4 h-4 bg-yellow-400 rounded-full relative animate-bounce">
                        {/* Bird beak */}
                        <div className="absolute top-1.5 left-4 w-1.5 h-1 bg-orange-500 rounded-full"></div>
                        {/* Bird eye */}
                        <div className="absolute top-1 left-1.5 w-1 h-1 bg-black rounded-full"></div>
                        {/* Bird wing */}
                        <div className="absolute top-2 right-0.5 w-1 h-1.5 bg-yellow-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <span>Joining...</span>
              </>
            ) : (
              "Join"
            )}
          </div>
        </button>

        {/* Bottom Navigation */}
        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="flex justify-around items-center">
            <button
              onClick={() => handleTabClick("discovery")}
              className="flex flex-col items-center p-2 rounded-lg bg-white/15 border border-white/25"
            >
              <Home className="w-4 h-4 text-white mb-1" />
              <span className="text-xs text-white font-medium">Discovery</span>
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
              className="flex flex-col items-center p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Users className="w-4 h-4 text-white/60 mb-1" />
              <span className="text-xs text-white/60 font-medium">Contacts</span>
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
      {/* Profile Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl w-full max-w-sm mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">{selectedProfile.name}</h3>
              <button onClick={closeProfileModal} className="text-white/60 hover:text-white text-xl">
                ×
              </button>
            </div>

            <div className="text-center mb-4">
              <img
                src={selectedProfile.avatar || "/placeholder.svg"}
                alt={selectedProfile.name}
                className="w-24 h-24 rounded-2xl object-cover mx-auto mb-3 shadow-lg"
              />
              <p className="text-white/80 text-sm mb-4">
                {"Loves adventure, coffee, and meaningful conversations. Looking for genuine connections."}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <img
                src={selectedProfile.avatar || "/placeholder.svg"}
                alt="Photo 1"
                className="w-full h-16 rounded-lg object-cover"
              />
              <img
                src={selectedProfile.avatar || "/placeholder.svg"}
                alt="Photo 2"
                className="w-full h-16 rounded-lg object-cover opacity-80"
              />
              <img
                src={selectedProfile.avatar || "/placeholder.svg"}
                alt="Photo 3"
                className="w-full h-16 rounded-lg object-cover opacity-60"
              />
            </div>

            <button
              onClick={() => handleSendFriendRequest(selectedProfile.name)}
              className="w-full backdrop-blur-md bg-white/15 border border-white/25 active:bg-white/20 rounded-2xl py-3 px-4 text-white font-bold text-sm transition-all duration-200 active:scale-98 shadow-lg"
            >
              Send Friend Request
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
