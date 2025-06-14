"use client"

import React, { useState, useEffect } from "react"
import { ArrowLeft, PhoneOff, SkipForward, Globe, MessageCircle, Users, User, Info, ChevronLeft, ChevronRight, Heart, Plus } from "lucide-react"

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
  const [timeLeft, setTimeLeft] = useState(45) // 45 seconds countdown
  const [isConnected, setIsConnected] = useState(true) // Start connected immediately
  const [userLocked, setUserLocked] = useState(true) // Start locked immediately
  const [isCallActive, setIsCallActive] = useState(true)
  const [showDrinkOptions, setShowDrinkOptions] = useState(false)
  const [showPartnerProfile, setShowPartnerProfile] = useState(false)
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [showDecisionButtons, setShowDecisionButtons] = useState(false)
  const [isHeartAnimating, setIsHeartAnimating] = useState(false)
  const [floatingMessage, setFloatingMessage] = useState("")
  const [showFloatingMessage, setShowFloatingMessage] = useState(false)
  const [userMatched, setUserMatched] = useState(false)
  const [partnerMatched, setPartnerMatched] = useState(false)
  const [isMutualMatch, setIsMutualMatch] = useState(false)
  const [showMiniProfile, setShowMiniProfile] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showConfettiHeader, setShowConfettiHeader] = useState(false)
  const [selectedReaction, setSelectedReaction] = useState("")

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % femaleProfiles[currentPartnerIndex].photos.length)
  }

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + femaleProfiles[currentPartnerIndex].photos.length) % femaleProfiles[currentPartnerIndex].photos.length)
  }

  // Current partner based on index
  const partner = femaleProfiles[currentPartnerIndex]

  useEffect(() => {
    if (timeLeft > 0 && isConnected && !isMutualMatch) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && isConnected && !isMutualMatch) {
      setShowDecisionButtons(true)
    }
  }, [timeLeft, isConnected, isMutualMatch])

  // Simulate partner matching after a random delay (3-8 seconds) when user matches
  useEffect(() => {
    if (userMatched && !partnerMatched && !isMutualMatch) {
      const delay = Math.random() * 5000 + 3000 // 3-8 seconds
      const timer = setTimeout(() => {
        setPartnerMatched(true)
        setIsMutualMatch(true)
        setFloatingMessage("Mutual match! 💕 Call freely now!")
        setShowFloatingMessage(true)
        
        setTimeout(() => {
          setShowFloatingMessage(false)
        }, 3000)
      }, delay)
      
      return () => clearTimeout(timer)
    }
  }, [userMatched, partnerMatched, isMutualMatch])



  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleLock = () => {
    setUserLocked(true)
    setIsConnected(true)
  }

  const handleBuyDrink = (type: "cocktail" | "champagne" | "confetti") => {
    let extension = 0
    let message = ""
    
    switch (type) {
      case "cocktail":
        extension = 120
        message = "+2 minutes added!"
        break
      case "champagne":
        extension = 300
        message = "+5 minutes added!"
        break
      case "confetti":
        extension = 120
        message = "+2 minutes added!"
        // Trigger confetti animation and header message
        setShowConfetti(true)
        setShowConfettiHeader(true)
        setSelectedReaction("")
        
        setTimeout(() => {
          setShowConfetti(false)
        }, 4000) // Show confetti for 4 seconds
        
        setTimeout(() => {
          setShowConfettiHeader(false)
          setSelectedReaction("")
        }, 10000) // Show header message for 10 seconds
        break
    }
    
    setTimeLeft((prev) => prev + extension)
    
    // Show floating message (except for confetti which shows in header)
    if (type !== "confetti") {
      setFloatingMessage(message)
      setShowFloatingMessage(true)
      
      // Hide floating message after 2 seconds
      setTimeout(() => {
        setShowFloatingMessage(false)
      }, 2000)
    }
    
    // Keep drink options visible after first use
  }

  const handleExitCall = () => {
    setIsCallActive(false)
    window.location.href = "/"
  }



  const handlePartnerProfileClick = () => {
    setShowPartnerProfile(true)
  }

  const closePartnerProfile = () => {
    setShowPartnerProfile(false)
  }

  const handleMiniProfileClick = () => {
    setShowMiniProfile(true)
  }

  const closeMiniProfile = () => {
    setShowMiniProfile(false)
  }

  const handleReaction = (emoji: string) => {
    setSelectedReaction(emoji)
  }

  const handleTabClick = (tab: string) => {
    switch (tab) {
      case "discovery":
        window.location.href = "/"
        break
      case "chat":
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
    
    if (decision === "match" && !userMatched) {
      // User matches - keep heart red and wait for partner
      setUserMatched(true)
      setIsHeartAnimating(true)
      setFloatingMessage("Waiting for their response... 💭")
      setShowFloatingMessage(true)
      
      // Keep heart animation active (don't reset it)
      // Hide floating message after 2 seconds
      setTimeout(() => {
        setShowFloatingMessage(false)
      }, 2000)
      
      return // Don't proceed to next person
    }
    
    if (decision === "pass") {
      // Reset for the next call
      const nextPartnerIndex = (currentPartnerIndex + 1) % femaleProfiles.length
      setCurrentPartnerIndex(nextPartnerIndex)
      setCurrentPhotoIndex(0)
      setTimeLeft(45)
      setIsConnected(true)
      setUserLocked(true)
      setShowDecisionButtons(false)
      setShowPartnerProfile(false)
      setIsCallActive(true)
      
      // Reset match states
      setUserMatched(false)
      setPartnerMatched(false)
      setIsMutualMatch(false)
      setIsHeartAnimating(false)
    }
  }

  return (
    <div className="h-screen flex flex-col font-sans bg-gradient-to-b from-white via-titanium-light to-titanium-mid overflow-hidden">
      {/* iOS-style status bar spacer with glass effect */}
      <div className="pt-safe glass-surface flex-shrink-0"></div>
      
      {/* Header with Liquid Glass Effect */}
      <div className="glass-nav flex items-center justify-between p-4 border-b border-glass-border animate-liquid-rise flex-shrink-0">
        <button onClick={handleExitCall} className="p-2 rounded-xl haptic-premium">
          <ChevronLeft className="w-5 h-5 text-text-primary" />
        </button>
        <div className="text-center flex items-center space-x-3">
          <div className="text-center">
            {showConfettiHeader ? (
              <div className="animate-liquid-rise">
                <h1 className="text-lg font-bold text-text-primary">🎉 Lovefish bought everyone a round!</h1>
                <div className="flex justify-center items-center space-x-2 mt-1">
                  <button
                    onClick={() => handleReaction("👍")}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm haptic-premium transition-all duration-200 ${
                      selectedReaction === "👍" ? "bg-blue-500 scale-110" : "bg-glass-card hover:bg-glass-heavy"
                    }`}
                  >
                    👍
                  </button>
                  <button
                    onClick={() => handleReaction("👏")}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm haptic-premium transition-all duration-200 ${
                      selectedReaction === "👏" ? "bg-green-500 scale-110" : "bg-glass-card hover:bg-glass-heavy"
                    }`}
                  >
                    👏
                  </button>
                  <button
                    onClick={() => handleReaction("❤️")}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm haptic-premium transition-all duration-200 ${
                      selectedReaction === "❤️" ? "bg-red-500 scale-110" : "bg-glass-card hover:bg-glass-heavy"
                    }`}
                  >
                    ❤️
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-lg font-bold text-text-primary">Voice Call</h1>
                {!isMutualMatch && (
                  <p className="text-xs text-text-secondary font-medium">{formatTime(timeLeft)}</p>
                )}
                {isMutualMatch && (
                  <p className="text-xs text-green-500 font-medium">Unlimited Time ∞</p>
                )}
              </>
            )}
          </div>

        </div>
        <div className="w-9"></div>
      </div>

      {/* Main Content - Flex grow to fill remaining space */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-4 text-center animate-liquid-rise min-h-0" style={{ animationDelay: "100ms" }}>
        {!showDecisionButtons ? (
          <>
            {/* Profile Image */}
            <div className="relative mb-4 flex-shrink-0">
              <div className="w-48 h-48 rounded-5xl overflow-hidden glass-card-heavy shadow-premium">
                <img
                  src={partner.photos[currentPhotoIndex] || "/placeholder.svg"}
                  alt={`${partner.name} photo ${currentPhotoIndex + 1}`}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={handleMiniProfileClick}
                />
                
                {/* Audio wave animation overlay */}
                {isConnected && (
                  <div className="absolute inset-0 border-4 border-glass-border animate-pulse-glass opacity-60 rounded-5xl"></div>
                )}
                
                {/* Photo navigation */}
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 glass-card rounded-full flex items-center justify-center haptic-premium"
                >
                  <ChevronLeft className="w-4 h-4 text-text-primary" />
                </button>
                
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 glass-card rounded-full flex items-center justify-center haptic-premium"
                >
                  <ChevronRight className="w-4 h-4 text-text-primary" />
                </button>
                
                {/* Photo indicators */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {partner.photos.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentPhotoIndex ? "bg-white shadow-sm" : "bg-glass-border"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Profile info button */}
              <button
                onClick={handlePartnerProfileClick}
                className="absolute -bottom-1 -right-1 w-10 h-10 glass-card rounded-full flex items-center justify-center haptic-premium"
              >
                <Info className="w-4 h-4 text-text-primary" />
              </button>
            </div>

            {/* Partner Info */}
            <div className="text-center mb-4 flex-shrink-0">
              <h2 className="text-xl font-bold mb-1 text-text-primary">{partner.name}</h2>
              <p className="text-text-secondary text-sm mb-2">{partner.age} • {partner.company}</p>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-text-secondary font-medium">{partner.compatibility}% match</span>
              </div>
              <p className="text-text-tertiary text-xs max-w-xs mx-auto leading-relaxed mb-4">{partner.bio}</p>
              
              {/* CTA Buttons directly below bio */}
              {!showDecisionButtons && (
                <div className="flex justify-center items-center space-x-4 mb-4">
                  {/* Next button */}
                  <button
                    onClick={() => handleDecision("pass")}
                    className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center haptic-premium"
                    title="Skip to next person"
                  >
                    <SkipForward className="w-5 h-5 text-text-primary" />
                  </button>

                  {/* Match button - most prominent */}
                  <button
                    onClick={() => handleDecision("match")}
                    className={`w-16 h-16 liquid-button text-text-inverse rounded-full flex items-center justify-center haptic-premium relative ${
                      userMatched && !isMutualMatch ? 'animate-pulse-glass' : ''
                    }`}
                    title={userMatched ? "Waiting for their response..." : "Match with this person"}
                    disabled={userMatched && !isMutualMatch}
                  >
                    <Heart 
                      className={`w-6 h-6 transition-colors duration-300 ${
                        userMatched ? 'text-red-500' : ''
                      } ${
                        isHeartAnimating && !userMatched ? 'animate-heart-pop' : ''
                      }`} 
                      fill={userMatched ? '#ef4444' : 'none'}
                    />
                    {userMatched && !isMutualMatch && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    )}
                  </button>
                  
                  {/* Extend button */}
                  <button
                    onClick={() => setShowDrinkOptions(!showDrinkOptions)}
                    className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center haptic-premium"
                    title="Buy a drink to extend time"
                  >
                    <span className="text-lg">🍸</span>
                  </button>
                </div>
              )}

              {/* Drink Options - Show when Extend is clicked */}
              {showDrinkOptions && !showDecisionButtons && (
                <div className="flex justify-center space-x-2 animate-liquid-rise mb-4">
                  <button
                    onClick={() => handleBuyDrink("cocktail")}
                    className="px-3 py-2 glass-card rounded-2xl text-xs font-medium haptic-premium"
                  >
                    🍸 +2min
                  </button>
                  <button
                    onClick={() => handleBuyDrink("champagne")}
                    className="px-3 py-2 glass-card rounded-2xl text-xs font-medium haptic-premium"
                  >
                    🥂 +5min
                  </button>
                  <button
                    onClick={() => handleBuyDrink("confetti")}
                    className="px-3 py-2 liquid-button text-text-inverse rounded-2xl text-xs font-medium haptic-premium"
                  >
                    🎉 +2min all
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Decision UI */
          <div className="w-full max-w-sm flex flex-col items-center animate-liquid-rise">
            <img
              src={partner.avatar}
              alt={partner.name}
              className="w-24 h-24 rounded-4xl object-cover mb-4 avatar-premium"
            />
            <h2 className="text-xl font-bold mb-2 text-text-primary">Time's Up!</h2>
            <p className="text-text-secondary mb-6 text-sm">
              Did you feel a spark with {partner.name}?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleDecision("pass")}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center haptic-premium shadow-lg border border-gray-200"
                title="Pass"
              >
                <span className="text-2xl">❌</span>
              </button>
              <button
                onClick={() => handleDecision("match")}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center haptic-premium shadow-lg border border-gray-200"
                title="Match"
              >
                <span className="text-2xl">❤️</span>
              </button>
            </div>
          </div>
        )}
      </div>



      {/* Bottom Navigation with Glass Effect */}
      <div className="glass-nav px-6 py-2 pb-safe animate-liquid-rise flex-shrink-0" style={{ animationDelay: "300ms" }}>
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
            className="nav-item active flex flex-col items-center py-2 px-3 rounded-xl haptic-premium"
          >
            <MessageCircle className="w-4 h-4 mb-1 text-text-primary" />
            <span className="text-xs font-semibold text-text-primary">Chat</span>
          </button>
          
          <button
            onClick={handleExitCall}
            className="nav-item flex flex-col items-center py-2 px-3 rounded-xl haptic-premium"
          >
            <PhoneOff className="w-4 h-4 text-red-500 mb-1" />
            <span className="text-xs text-red-500 font-medium">End Call</span>
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

      {/* Mini Profile Popup */}
      {showMiniProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="glass-card-heavy rounded-3xl w-full max-w-sm p-6 animate-liquid-rise shadow-premium border border-glass-border relative">
            {/* Close button */}
            <button
              onClick={closeMiniProfile}
              className="absolute top-4 right-4 w-8 h-8 glass-card rounded-full flex items-center justify-center haptic-premium"
            >
              <span className="text-text-primary text-lg">×</span>
            </button>
            
            {/* Profile content */}
            <div className="text-center">
              <img
                src={partner.photos[currentPhotoIndex] || "/placeholder.svg"}
                alt={partner.name}
                className="w-20 h-20 rounded-3xl mx-auto mb-4 object-cover avatar-premium"
              />
              <h3 className="text-xl font-bold mb-1 text-text-primary">{partner.name}, {partner.age}</h3>
              <p className="text-text-secondary text-sm mb-3">{partner.company}</p>
              
              {/* Match percentage with animated dot */}
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-text-secondary font-medium">{partner.compatibility}% match</span>
              </div>
              
              {/* Bio */}
              <p className="text-text-tertiary text-sm leading-relaxed mb-4 max-w-xs mx-auto">
                {partner.bio}
              </p>
              
              {/* Quick stats */}
              <div className="flex justify-center space-x-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-text-primary">{partner.photos.length}</div>
                  <div className="text-xs text-text-secondary">Photos</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-text-primary">{partner.compatibility}%</div>
                  <div className="text-xs text-text-secondary">Match</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-text-primary">${partner.tokens.toFixed(0)}</div>
                  <div className="text-xs text-text-secondary">Tokens</div>
                </div>
              </div>
              
              {/* Action button */}
              <button
                onClick={() => {
                  closeMiniProfile()
                  handlePartnerProfileClick()
                }}
                className="w-full liquid-button-secondary text-text-primary font-semibold py-3 px-6 rounded-2xl haptic-premium text-sm"
              >
                View Full Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Partner Profile Modal */}
      {showPartnerProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-end justify-center z-50">
          <div className="bg-black border border-white border-opacity-20 rounded-t-3xl w-full max-w-md p-6 animate-slide-up">
            <div className="w-12 h-1 bg-white bg-opacity-40 rounded-full mx-auto mb-6"></div>
            
            <div className="text-center mb-6">
              <img
                src={partner.photos[currentPhotoIndex] || "/placeholder.svg"}
                alt={partner.name}
                className="w-24 h-24 rounded-3xl mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold mb-1">{partner.name}, {partner.age}</h3>
              <p className="text-white text-opacity-60 mb-2">{partner.company}</p>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm text-white text-opacity-80 font-medium">{partner.compatibility}% match</span>
              </div>
              <p className="text-white text-opacity-60 text-sm">{partner.bio}</p>
            </div>

            <button
              onClick={closePartnerProfile}
              className="w-full text-white text-opacity-60 font-medium py-3 haptic-base haptic-hover haptic-active"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {/* Generate multiple confetti pieces */}
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-3 h-3 animate-confetti-sway"
                style={{
                  backgroundColor: [
                    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', 
                    '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'
                  ][Math.floor(Math.random() * 8)],
                  borderRadius: Math.random() > 0.5 ? '50%' : '0',
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            </div>
          ))}
          
          {/* Emoji confetti */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`emoji-${i}`}
              className="absolute animate-confetti-fall text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              {['🎉', '🎊', '✨', '💫', '🌟'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Floating Message */}
      {showFloatingMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="glass-card px-6 py-3 rounded-2xl animate-floating-message">
            <p className="text-text-primary font-semibold text-sm whitespace-nowrap">
              {floatingMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
