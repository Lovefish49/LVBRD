"use client"

import React, { useState, useEffect } from "react"
import { ArrowLeft, PhoneOff, Mic, MicOff, SkipForward, Home, MessageCircle, Users, User } from "lucide-react"

// Pool of diverse female profiles for generating new matches
const femaleProfiles = [
  {
    name: "Isabella",
    age: 24,
    company: "Design Studio",
    compatibility: 92,
    tokens: 2150.75,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
    ],
    bio: "Creative designer who loves art galleries and weekend hiking adventures.",
  },
  {
    name: "Mia",
    age: 28,
    company: "Marketing Agency",
    compatibility: 85,
    tokens: 1890.25,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
    ],
    bio: "Marketing professional with a passion for travel and trying new cuisines.",
  },
  {
    name: "Charlotte",
    age: 26,
    company: "Finance Corp",
    compatibility: 89,
    tokens: 3200.5,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    ],
    bio: "Finance analyst who enjoys yoga, reading, and exploring local coffee shops.",
  },
  {
    name: "Amelia",
    age: 25,
    company: "Tech Startup",
    compatibility: 94,
    tokens: 1750.8,
    avatar: "https://images.unsplash.com/photo-1488716820095-cbe80883c496?q=80&w=200&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1488716820095-cbe80883c496?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
    ],
    bio: "Software engineer who loves gaming, anime, and building cool projects.",
  },
  {
    name: "Harper",
    age: 27,
    company: "Healthcare",
    compatibility: 88,
    tokens: 2450.3,
    avatar: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?q=80&w=200&auto=format&fit=crop",
    photos: [
      "https://images.unsplash.com/photo-1506863530036-1efeddceb993?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
    ],
    bio: "Nurse practitioner dedicated to helping others and staying active outdoors.",
  },
]

export default function VoiceCallPage() {
  const [timeLeft, setTimeLeft] = useState(30) // 30 seconds initial
  const [callDuration, setCallDuration] = useState(0)
  const [isConnected, setIsConnected] = useState(false)
  const [userLocked, setUserLocked] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isCallActive, setIsCallActive] = useState(true)
  const [showDrinkOptions, setShowDrinkOptions] = useState(false)
  const [showPartnerProfile, setShowPartnerProfile] = useState(false)
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [showDecisionButtons, setShowDecisionButtons] = useState(false)

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % partner.photos.length)
  }

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + partner.photos.length) % partner.photos.length)
  }

  // Current partner based on index
  const partner = femaleProfiles[currentPartnerIndex]

  useEffect(() => {
    if (timeLeft > 0 && !isConnected) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isConnected) {
      setShowDecisionButtons(true)
    }
  }, [timeLeft, isConnected])

  useEffect(() => {
    if (isConnected && isCallActive) {
      const timer = setInterval(() => setCallDuration((prev) => prev + 1), 1000)
      return () => clearInterval(timer)
    }
  }, [isConnected, isCallActive])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleLock = () => {
    setUserLocked(true)
    setIsConnected(true)
  }

  const handleBuyDrink = (type: "cocktail" | "champagne") => {
    const extension = type === "cocktail" ? 120 : 300
    setTimeLeft((prev) => prev + extension)
    setShowDrinkOptions(false)
  }

  const handleExitCall = () => {
    setIsCallActive(false)
    setTimeout(() => {
      window.location.href = "/"
    }, 1000)
    setTimeLeft(30)
    setCallDuration(0)
    setIsConnected(false)
    setUserLocked(false)
    setIsMuted(false)
    setIsCallActive(true)
    setShowDrinkOptions(false)
    setShowPartnerProfile(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handlePartnerProfileClick = () => {
    setShowPartnerProfile(true)
  }

  const closePartnerProfile = () => {
    setShowPartnerProfile(false)
  }

  const handleTabClick = (tab: string) => {
    switch (tab) {
      case "discovery":
        window.location.href = "/"
        break
      case "chat":
        // Already on chat page
        break
      case "contacts":
        window.location.href = "/contacts"
        break
      case "profile":
        // Profile page would go here
        break
    }
    console.log("Switched to", tab)
  }

  const handleDecision = (decision: "match" | "pass") => {
    console.log(`User decided: ${decision}`)
    // Reset for the next call
    const nextPartnerIndex = (currentPartnerIndex + 1) % femaleProfiles.length
    setCurrentPartnerIndex(nextPartnerIndex)
    setCurrentPhotoIndex(0)
    setTimeLeft(30)
    setCallDuration(0)
    setIsConnected(false)
    setUserLocked(false)
    setShowDecisionButtons(false)
    setShowPartnerProfile(false)
    setIsCallActive(true)
  }

  return (
    <div className="flex flex-col h-screen w-full bg-black text-white font-sans">
      {/* Main Content */}
      <div className="flex flex-col flex-1 justify-center items-center overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-700 w-full">
          <button onClick={() => (window.location.href = "/")} className="p-2 rounded-full hover:bg-gray-800">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="text-sm font-semibold">Voice Call</div>
            <div className="text-xs text-gray-400">
              {isCallActive ? `Call duration: ${formatTime(callDuration)}` : "Call Ended"}
            </div>
            <div className="text-xs text-gray-400">
              {timeLeft}s
            </div>
          </div>
          <div className="w-10 h-10"></div> {/* Spacer */}
        </header>

        {/* Call Interface */}
        {showDecisionButtons ? (
          <div className="flex flex-col items-center justify-center flex-1">
            <h2 className="text-2xl font-bold mb-4">Time's up!</h2>
            <p className="text-lg mb-8">What's your decision?</p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleDecision("match")}
                className="px-8 py-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors"
              >
                Match
              </button>
              <button
                onClick={() => handleDecision("pass")}
                className="px-8 py-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors"
              >
                Pass
              </button>
            </div>
          </div>
        ) : (
        <div className="flex-1 flex flex-col justify-center items-center bg-gray-900 p-8 w-full">
          <div className="relative w-48 h-48 mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 animate-pulse"></div>
            <div className="relative w-full h-full overflow-hidden rounded-lg border-4 border-white/20 shadow-2xl">
              <img
                src={partner.photos[currentPhotoIndex] || "/placeholder.svg"}
                alt={`${partner.name} photo ${currentPhotoIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-300"
              />

              {/* Audio wave animation overlay */}
              <div className="absolute inset-0 border-4 border-green-400 animate-pulse opacity-60 rounded-lg"></div>
              <div className="absolute inset-2 border-2 border-green-300 animate-ping opacity-40 rounded-lg"></div>

              {/* Left swipe area */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-0 top-0 w-1/2 h-full bg-transparent hover:bg-black/10 transition-colors"
                aria-label="Previous photo"
              />

              {/* Right swipe area */}
              <button
                onClick={handleNextPhoto}
                className="absolute right-0 top-0 w-1/2 h-full bg-transparent hover:bg-black/10 transition-colors"
                aria-label="Next photo"
              />

              {/* Photo indicators */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {partner.photos.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      index === currentPhotoIndex ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Profile info button */}
            <button
              onClick={handlePartnerProfileClick}
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center border-2 border-white shadow-lg transition-colors"
            >
              <span className="text-white text-xs">ℹ️</span>
            </button>
          </div>

          <div className="text-center mb-3">
            <h2 className="text-xl font-bold mb-1">
              {partner.name}, {partner.age}
            </h2>
            <p className="text-gray-400 text-sm mb-2">{partner.company}</p>
          </div>

          {/* Partner Info */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-2 mb-3 w-full max-w-sm">
            <div className="flex justify-center gap-1 text-xs">
              <div className="text-center">
                <div className="text-gray-400">Compatibility</div>
                <div className="font-bold text-green-400">{partner.compatibility}%</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Staked</div>
                <div className="font-bold text-yellow-400">{partner.tokens.toLocaleString()} USDT</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400">Time Left</div>
                <div className={`font-mono font-bold ${timeLeft < 10 ? "text-red-400" : "text-white"}`}>
                  {isConnected ? "∞" : formatTime(timeLeft)}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-3 mb-3">
            <button
              onClick={() => setShowDrinkOptions(!showDrinkOptions)}
              className="text-xs bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20 flex items-center border border-white/20"
            >
              <span className="mr-1">🍸</span>
              Buy Drink
            </button>

            {!userLocked && (
              <button
                onClick={handleLock}
                className="text-xs bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20 flex items-center border border-white/20"
              >
                <span className="mr-1">🔒</span>
                Lock
              </button>
            )}

            <button
              onClick={handleExitCall}
              className="text-xs bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20 flex items-center border border-white/20"
            >
              <SkipForward className="w-3 h-3 mr-1" />
              End Call
            </button>
          </div>

          {/* Drink Options */}
          {showDrinkOptions && (
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-2 mb-2 flex justify-center space-x-4">
              <button
                onClick={() => handleBuyDrink("cocktail")}
                className="flex items-center bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20"
              >
                <span className="mr-2">🍸</span>
                <div className="text-left">
                  <div className="text-xs font-semibold">Cocktail</div>
                  <div className="text-xs text-gray-400">+2 min</div>
                </div>
              </button>
              <button
                onClick={() => handleBuyDrink("champagne")}
                className="flex items-center bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20"
              >
                <span className="mr-2">🥂</span>
                <div className="text-left">
                  <div className="text-xs font-semibold">Champagne</div>
                  <div className="text-xs text-gray-400">+5 min</div>
                </div>
              </button>
            </div>
          )}
        </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="mt-4 pt-3 border-t border-white/10">
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
            className="flex flex-col items-center p-2 rounded-lg bg-white/15 border border-white/25"
          >
            <MessageCircle className="w-4 h-4 text-white mb-1" />
            <span className="text-xs text-white font-medium">Chat</span>
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

      {showPartnerProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl w-full max-w-sm mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">
                {partner.name}, {partner.age}
              </h3>
              <button onClick={closePartnerProfile} className="text-white/60 hover:text-white text-xl">
                ×
              </button>
            </div>

            <div className="text-center mb-4">
              <img
                src={partner.avatar || "/placeholder.svg"}
                alt={partner.name}
                className="w-24 h-24 rounded-2xl object-cover mx-auto mb-3 shadow-lg"
              />

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="text-center">
                  <div className="text-white/70">Company</div>
                  <div className="font-semibold">{partner.company}</div>
                </div>
                <div className="text-center">
                  <div className="text-white/70">Compatibility</div>
                  <div className="font-semibold text-green-400">{partner.compatibility}%</div>
                </div>
                <div className="text-center">
                  <div className="text-white/70">Staked</div>
                  <div className="font-semibold text-yellow-400">{partner.tokens.toLocaleString()} USDT</div>
                </div>
                <div className="text-center">
                  <div className="text-white/70">Age</div>
                  <div className="font-semibold">{partner.age}</div>
                </div>
              </div>

              <p className="text-white/80 text-sm mb-4">{partner.bio}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {partner.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo || "/placeholder.svg"}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-20 rounded-lg object-cover"
                />
              ))}
            </div>

            <button
              onClick={closePartnerProfile}
              className="w-full backdrop-blur-md bg-white/15 border border-white/25 active:bg-white/20 rounded-2xl py-3 px-4 text-white font-bold text-sm transition-all duration-200 active:scale-98 shadow-lg"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
