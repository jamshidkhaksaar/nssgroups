import React, { createContext, useContext, useEffect, useRef, useState } from 'react'

interface MusicContextType {
  isPlaying: boolean
  toggleMusic: () => void
}

const MusicContext = createContext<MusicContextType | null>(null)

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // We create the audio element once and attach it to the ref
    const audio = new Audio('./background musics/Welcome to NSS Group.mp3')
    audio.loop = true
    audio.volume = 0.3 // Soft background music
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      // Play returns a promise which might be rejected if user hasn't interacted
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((err) => {
        console.warn('Audio playback prevented by browser policy:', err)
        setIsPlaying(false)
      })
    }
  }

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic }}>
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error('useMusic must be used within MusicProvider')
  return ctx
}
