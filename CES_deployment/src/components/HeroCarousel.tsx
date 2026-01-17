"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

interface Slide {
  id: number
  title: string
  description: string
  type: "image" | "video"
  src: string
}

const slides: Slide[] = [
  {
    id: 0,
    title: "Welcome to CastleElevator",
    description: "Your trusted partner for professional elevator solutions",
    type: "video",
    src: "/images/home/home_video.mp4",
  },
  {
    id: 1,
    title: "Professional Elevator Installation",
    description: "Safe, reliable, and modern elevator systems for every building",
    type: "image",
    src: "/images/home/Home-page-01.png",
  },
  {
    id: 2,
    title: "Expert Maintenance Service",
    description: "Regular maintenance to ensure optimal elevator performance",
    type: "image",
    src: "/images/home/Home-page-02.png",
  },
  {
    id: 3,
    title: "Modern Elevator Modernization",
    description: "Upgrade your elevators with latest technology and safety features",
    type: "image",
    src: "/images/home/Home-page-03.png",
  },
  {
    id: 4,
    title: "24/7 Emergency Support",
    description: "Always available for emergencies and urgent support",
    type: "image",
    src: "/images/home/Home-page-04.png",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Auto-advance slides
  useEffect(() => {
    const currentSlideData = slides[currentSlide]
    
    // For video slides, wait for video to end before advancing
    if (currentSlideData.type === "video" && videoRef.current) {
      const video = videoRef.current
      video.currentTime = 0
      video.muted = isMuted
      video.play().catch((err) => {
        console.log("Video autoplay failed:", err)
        // If video can't autoplay, advance after 10 seconds
        const timer = setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 10000)
        return () => clearTimeout(timer)
      })
      
      const handleVideoEnd = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }
      
      video.addEventListener("ended", handleVideoEnd)
      return () => video.removeEventListener("ended", handleVideoEnd)
    } else {
      // For image slides, advance after 5 seconds
      const timer = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [currentSlide, isMuted])

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-2xl">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background - Video or Image */}
          {slide.type === "video" ? (
            <video
              ref={index === currentSlide ? videoRef : null}
              src={slide.src}
              className="absolute inset-0 w-full h-full object-cover"
              muted={isMuted}
              playsInline
              autoPlay
              preload="auto"
            />
          ) : (
            <Image
              src={slide.src}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0 || index === 1}
            />
          )}

          {/* Overlay - lighter for video */}
          <div className={`absolute inset-0 ${slide.type === "video" ? "bg-black/20" : "bg-black/40"}`}></div>

          {/* Content - Only show for images, not video */}
          {slide.type === "image" && (
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-lg md:text-2xl text-gray-100 mb-8 drop-shadow-md max-w-2xl">
                {slide.description}
              </p>
              <a
                href="/contact"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:scale-105"
              >
                Request Service Now
              </a>
            </div>
          )}
        </div>
      ))}

      {/* Mute/Unmute Button - Only show when video is playing */}
      {slides[currentSlide].type === "video" && (
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            // Muted icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            // Unmuted icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>
      )}

      {/* Video Playing Indicator */}
      {slides[currentSlide].type === "video" && (
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-red-500/80 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            Playing Video
          </span>
        </div>
      )}

      {/* Slide Counter - Only for images */}
      {slides[currentSlide].type === "image" && (
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-white/30 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
            {currentSlide} / {slides.length - 1}
          </span>
        </div>
      )}

      {/* Dots Navigation - Bottom Center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full flex items-center justify-center ${
              index === currentSlide
                ? "bg-blue-500 w-10 h-3"
                : "bg-white/60 hover:bg-white/90 w-3 h-3"
            }`}
            aria-label={`Go to ${slide.type === "video" ? "video" : `slide ${index}`}`}
          >
            {/* Show play icon for video dot when not active */}
            {slide.type === "video" && index !== currentSlide && (
              <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div 
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ 
            width: `${((currentSlide + 1) / slides.length) * 100}%` 
          }}
        />
      </div>
    </div>
  )
}
