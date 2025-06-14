"use client"

import React, { useState, useEffect } from "react"
import { Heart, MessageCircle, Sparkles, Globe, Users, User, Phone } from "lucide-react"

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
  const [activeChats, setActiveChats] = useState(Math.floor(10247 * 0.65)) // 65% of online users (less than 75%)
  const [totalSpent, setTotalSpent] = useState(12847.50) // Total USDT spent on drinks
  const [usedProfiles, setUsedProfiles] = useState<Set<string>>(new Set())
  const [usedMaleProfiles, setUsedMaleProfiles] = useState<Set<string>>(new Set())
  const [matchTimers, setMatchTimers] = useState<{ [key: string]: number }>({})
  const [interactionIndicators, setInteractionIndicators] = useState<{ [key: string]: string }>({})
  const [selectedProfile, setSelectedProfile] = useState<{ name: string; avatar: string } | null>(null)
  const [isJoining, setIsJoining] = useState(false)
  const [liveActivities, setLiveActivities] = useState<Array<{
    id: string
    type: 'match' | 'drink' | 'call' | 'join'
    user: { name: string; avatar: string }
    user2?: { name: string; avatar: string }
    action: string
    timestamp: Date
    drinkType?: string
  }>>([])

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
    const indicators = ["🥂", "🍸", "✅", "❤️"]
    return indicators[Math.floor(Math.random() * indicators.length)]
  }

  // Generate sample match data with diverse profiles
  const generateSampleMatches = (): Match[] => {
    const matches: Match[] = []
    const matchCount = 127 // Over 100 matches
    
    // Create temporary sets to avoid state updates during generation
    const tempUsedFemaleProfiles = new Set<string>()
    const tempUsedMaleProfiles = new Set<string>()
    
    for (let i = 0; i < matchCount; i++) {
      // Get random female profile without state updates
      const availableFemaleProfiles = femaleProfiles.filter(profile => !tempUsedFemaleProfiles.has(profile.avatar))
      const femaleProfile = availableFemaleProfiles.length > 0 
        ? availableFemaleProfiles[Math.floor(Math.random() * availableFemaleProfiles.length)]
        : femaleProfiles[Math.floor(Math.random() * femaleProfiles.length)]
      tempUsedFemaleProfiles.add(femaleProfile.avatar)
      
      // Get random male profile without state updates
      const availableMaleProfiles = maleProfiles.filter(profile => !tempUsedMaleProfiles.has(profile.avatar))
      const maleProfile = availableMaleProfiles.length > 0
        ? availableMaleProfiles[Math.floor(Math.random() * availableMaleProfiles.length)]
        : maleProfiles[Math.floor(Math.random() * maleProfiles.length)]
      tempUsedMaleProfiles.add(maleProfile.avatar)
      
      matches.push({
        id: `match-${i + 1}`,
        user1: femaleProfile,
        user2: maleProfile,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time within last week
      })
    }
    
    return matches
  }

  const generateLiveActivity = (): {
    id: string
    type: 'match' | 'drink' | 'call' | 'join'
    user: { name: string; avatar: string }
    user2?: { name: string; avatar: string }
    action: string
    timestamp: Date
    drinkType?: string
  } => {
    const activityTypes = ['match', 'drink', 'call', 'join']
    const randomType = activityTypes[Math.floor(Math.random() * activityTypes.length)] as 'match' | 'drink' | 'call' | 'join'
    
    const user = getRandomFemaleProfile()
    let action = ''
    let user2
    let drinkType

    switch (randomType) {
      case 'match':
        user2 = getRandomMaleProfile()
        action = `just matched with`
        break
      case 'drink':
        const drinks = ['Cocktail', 'Champagne', 'Wine', 'Martini']
        drinkType = drinks[Math.floor(Math.random() * drinks.length)]
        action = `bought a`
        break
      case 'call':
        action = `started a call`
        break
      case 'join':
        action = `went online`
        break
    }

    return {
      id: `activity-${Date.now()}-${Math.random()}`,
      type: randomType,
      user,
      user2,
      action,
      timestamp: new Date(),
      drinkType,
    }
  }

  useEffect(() => {
    // Generate initial matches
    const generatedMatches = generateSampleMatches()
    setMatches(generatedMatches)
    
    const initialTimers: { [key: string]: number } = {}
    const initialIndicators: { [key: string]: string } = {}
    generatedMatches.forEach((match: Match) => {
      initialTimers[match.id] = Math.floor(Math.random() * 300)
      initialIndicators[match.id] = getRandomInteractionIndicator()
    })
    setMatchTimers(initialTimers)
    setInteractionIndicators(initialIndicators)

    // Set up timers to update every second
    const timerInterval = setInterval(() => {
      setMatchTimers((prev) => {
        const newTimers = { ...prev }
        for (const key in newTimers) {
          newTimers[key] += 1
        }
        return newTimers
      })
    }, 1000)

    // Live activity generator
    const activityInterval = setInterval(() => {
      setLiveActivities(prev => [generateLiveActivity(), ...prev.slice(0, 7)]);
    }, 2000);

    return () => {
      clearInterval(timerInterval)
      clearInterval(activityInterval)
    }
  }, [])

  const handleProfileClick = (profile: { name: string; avatar: string }) => {
    setSelectedProfile(profile)
  }

  const handleJoinChat = () => {
    setIsJoining(true)
    // Simulate joining a chat room
    setTimeout(() => {
      window.location.href = '/chat';
    }, 1500)
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
    alert(`Friend request sent to ${name}!`)
    closeProfileModal()
  }

  const handleTabClick = (tab: string) => {
    if (tab !== "discovery") {
      window.location.href = `/${tab}`;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'match': return '💕';
      case 'drink': return '🍸';
      case 'call': return '📞';
      case 'join': return '✨';
      default: return '🎉';
    }
  }

  const getTimeAgo = (timestamp: Date): string => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="h-screen flex flex-col font-sans bg-gradient-to-b from-white via-titanium-light to-titanium-mid overflow-hidden">
      {/* iOS-style status bar spacer with glass effect */}
      <div className="pt-safe glass-surface flex-shrink-0"></div>
      
      {/* Header with Liquid Glass Effect */}
      <div className="glass-nav text-center p-4 border-b border-glass-border animate-liquid-rise flex-shrink-0">
        <div className="max-w-sm mx-auto">
          <h1 className="text-xl font-bold tracking-tight text-text-primary animate-float-gentle">
            Lovebird
          </h1>
        </div>
      </div>

      {/* Stats Bar with Titanium Gradient */}
      <div className="titanium-surface px-6 py-3 animate-liquid-rise flex-shrink-0" style={{ animationDelay: "100ms" }}>
        <div className="flex justify-around max-w-md mx-auto">
          <div className="text-center">
            <p className="text-base font-bold text-text-primary">{onlineUsers.toLocaleString()}</p>
            <div className="flex items-center justify-center space-x-1">
              <svg className="w-2 h-2 fill-green-500" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="4"/>
              </svg>
              <p className="text-xs text-text-tertiary font-medium tracking-wide">ONLINE</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-base font-bold text-text-primary">{activeChats.toLocaleString()}</p>
            <div className="flex items-center justify-center space-x-1">
              <svg className="w-3 h-3 fill-blue-500" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
              </svg>
              <p className="text-xs text-text-tertiary font-medium tracking-wide">CHATTING</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-base font-bold text-text-primary">{matches.length.toLocaleString()}</p>
            <div className="flex items-center justify-center space-x-1">
              <svg className="w-3 h-3 fill-pink-500" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <p className="text-xs text-text-tertiary font-medium tracking-wide">MATCHES</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-base font-bold text-text-primary">{totalSpent.toLocaleString()}</p>
            <div className="flex items-center justify-center space-x-1">
              <svg className="w-3 h-3" viewBox="0 0 339 295" fill="none">
                <path d="M169.5 0L339 147.5L169.5 295L0 147.5L169.5 0Z" fill="#26A17B"/>
                <path d="M169.5 40.5L299 147.5L169.5 254.5L40 147.5L169.5 40.5Z" fill="white"/>
                <path d="M169.5 81L258.5 147.5L169.5 214L80.5 147.5L169.5 81Z" fill="#26A17B"/>
                <path d="M169.5 121.5L218 147.5L169.5 173.5L121 147.5L169.5 121.5Z" fill="white"/>
                <rect x="159" y="95" width="21" height="105" fill="#26A17B"/>
                <rect x="144" y="110" width="51" height="21" fill="#26A17B"/>
                <rect x="144" y="164" width="51" height="21" fill="#26A17B"/>
              </svg>
              <p className="text-xs text-text-tertiary font-medium tracking-wide">SPENT</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Glass Container - Flex grow to fill remaining space */}
      <div className="flex-1 flex flex-col px-6 py-4 animate-liquid-rise min-h-0" style={{ animationDelay: "200ms" }}>
        <div className="max-w-md mx-auto flex flex-col h-full">
          <div className="text-center mb-4 flex-shrink-0">
            <h2 className="text-lg font-bold mb-1 text-text-primary">Live Activity</h2>
            <p className="text-text-secondary text-xs font-medium">See what's happening right now</p>
          </div>

          {/* Live Activity Feed with Glass Cards - Limited height with scroll */}
          <div className="flex-1 min-h-0 mb-4">
            <div className="h-full overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-glass-border scrollbar-track-transparent">
              {liveActivities.slice(0, 6).map((activity) => (
                <div
                  key={activity.id}
                  className="activity-card p-3 haptic-premium cursor-pointer flex-shrink-0"
                >
                  <div className="flex items-center space-x-3">
                    {/* Activity Icon with Glass Effect */}
                    <div className="w-10 h-10 glass-card flex items-center justify-center rounded-xl flex-shrink-0">
                      <span className="text-sm">{getActivityIcon(activity.type)}</span>
                    </div>

                    {/* User Avatar(s) with Premium Styling */}
                    {activity.user2 && activity.type === 'match' ? (
                      /* Overlapping avatars for matches */
                      <div className="flex flex-shrink-0">
                        <img
                          src={activity.user.avatar}
                          alt={activity.user.name}
                          className="w-10 h-10 rounded-xl object-cover avatar-premium z-10"
                        />
                        <img
                          src={activity.user2.avatar}
                          alt={activity.user2.name}
                          className="w-10 h-10 rounded-xl object-cover avatar-premium -ml-3 border-2 border-white"
                        />
                      </div>
                    ) : (
                      /* Single avatar for non-match activities */
                      <img
                        src={activity.user.avatar}
                        alt={activity.user.name}
                        className="w-10 h-10 rounded-xl object-cover avatar-premium flex-shrink-0"
                      />
                    )}

                    {/* Activity Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1.5 mb-0.5">
                        <span className="font-semibold text-text-primary text-xs truncate">
                          {activity.user.name}
                        </span>
                        {activity.user2 && (
                          <>
                            <span className="text-text-tertiary text-xs font-medium">
                              {activity.type === 'match' ? '&' : '+'}
                            </span>
                            <span className="font-semibold text-text-primary text-xs truncate">
                              {activity.user2.name}
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-text-secondary text-xs font-medium">
                          {activity.action}
                          {activity.drinkType && (
                            <>
                              <span className="font-semibold"> {activity.drinkType}</span>
                              <span> {activity.type === 'drink' ? '🍸' : ''}</span>
                            </>
                          )}
                        </span>
                        <span className="text-text-tertiary text-xs">•</span>
                        <span className="text-text-tertiary text-xs font-medium">
                          {getTimeAgo(activity.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* JOIN Button with Liquid Design */}
          <button
            onClick={handleJoinChat}
            disabled={isJoining}
            className="w-full liquid-button text-text-inverse font-semibold py-4 px-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 haptic-premium flex-shrink-0"
          >
            {isJoining ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="font-semibold">Connecting...</span>
              </>
            ) : (
              <>
                <Phone className="w-4 h-4" />
                <span className="font-semibold">JOIN</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Navigation with Glass Effect */}
      <div className="glass-nav px-6 py-2 pb-safe animate-liquid-rise flex-shrink-0" style={{ animationDelay: "300ms" }}>
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button
            onClick={() => handleTabClick("discovery")}
            className="nav-item active flex flex-col items-center py-2 px-3 rounded-xl haptic-premium"
          >
            <Globe className="w-4 h-4 mb-1 text-text-primary" />
            <span className="text-xs font-semibold text-text-primary">Discover</span>
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
            className="nav-item flex flex-col items-center py-2 px-3 rounded-xl haptic-premium"
          >
            <Users className="w-4 h-4 text-text-secondary mb-1" />
            <span className="text-xs text-text-secondary font-medium">Contacts</span>
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

      {/* Profile Modal with Premium Glass Effect */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-50 backdrop-blur-heavy">
          <div className="modal-glass rounded-t-5xl w-full max-w-md p-6 animate-slide-up-glass">
            <div className="w-10 h-1 bg-glass-border rounded-full mx-auto mb-4"></div>
            
            <div className="text-center mb-6">
              <img
                src={selectedProfile.avatar}
                alt={selectedProfile.name}
                className="w-24 h-24 rounded-4xl mx-auto mb-4 object-cover avatar-premium animate-pulse-glass"
              />
              <h3 className="text-xl font-bold mb-2 text-text-primary">{selectedProfile.name}</h3>
              <div className="inline-flex items-center space-x-2 glass-card px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-text-secondary text-sm font-medium">Online now</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleJoinChat}
                className="w-full liquid-button text-text-inverse font-semibold py-4 px-6 flex items-center justify-center space-x-2 haptic-premium"
              >
                <Phone className="w-4 h-4" />
                <span className="font-semibold">Start Voice Call</span>
              </button>
              
              <button
                onClick={() => handleSendFriendRequest(selectedProfile.name)}
                className="w-full liquid-button-secondary text-text-primary font-semibold py-4 px-6 rounded-3xl haptic-premium"
              >
                Send Friend Request
              </button>
              
              <button
                onClick={closeProfileModal}
                className="w-full text-text-secondary font-medium py-3 haptic-premium rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
