import React, { useEffect, useRef, useState, useCallback } from 'react'
import { MusicContext, PLAYLIST } from './useMusic'

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isPlayingRef = useRef(true)

  isPlayingRef.current = isPlaying

  const playTrackAtIndex = useCallback((index: number, shouldPlay = true) => {
    if (!audioRef.current) return

    const track = PLAYLIST[index]
    if (!track) return

    audioRef.current.pause()
    audioRef.current.src = track.url
    audioRef.current.load()

    if (shouldPlay) {
      audioRef.current.muted = false
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((err) => {
          console.warn('Audio autoplay deferred until first user interaction:', err)
          setIsPlaying(false)
        })
    }
  }, [])

  useEffect(() => {
    const audio = new Audio()
    audio.volume = 0.35 // Soft background music volume
    audio.muted = false // Ensure not muted by default
    audioRef.current = audio

    // Attach initial track
    audio.src = PLAYLIST[0].url

    // Attempt instant unmuted playback
    audio
      .play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch(() => {
        // Autoplay policy deferred playback; listen for first interaction
        setIsPlaying(false)

        const startPlaybackOnInteraction = () => {
          if (audioRef.current && !isPlayingRef.current) {
            audioRef.current.muted = false
            audioRef.current
              .play()
              .then(() => {
                setIsPlaying(true)
              })
              .catch((e) => console.warn('Playback error after interaction:', e))
          }
          // Remove event listeners after first trigger
          window.removeEventListener('click', startPlaybackOnInteraction)
          window.removeEventListener('keydown', startPlaybackOnInteraction)
          window.removeEventListener('pointerdown', startPlaybackOnInteraction)
          window.removeEventListener('touchstart', startPlaybackOnInteraction)
          window.removeEventListener('scroll', startPlaybackOnInteraction)
        }

        window.addEventListener('click', startPlaybackOnInteraction, { once: true })
        window.addEventListener('keydown', startPlaybackOnInteraction, { once: true })
        window.addEventListener('pointerdown', startPlaybackOnInteraction, { once: true })
        window.addEventListener('touchstart', startPlaybackOnInteraction, { once: true })
        window.addEventListener('scroll', startPlaybackOnInteraction, { once: true })
      })

    const handleEnded = () => {
      // Auto advance to next track when finished
      setCurrentTrackIndex((prev) => {
        const next = (prev + 1) % PLAYLIST.length
        playTrackAtIndex(next, true)
        return next
      })
    }

    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [playTrackAtIndex])

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.muted = false
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((err) => {
          console.warn('Audio playback prevented by browser policy:', err)
          setIsPlaying(false)
        })
    }
  }

  const nextTrack = () => {
    const next = (currentTrackIndex + 1) % PLAYLIST.length
    setCurrentTrackIndex(next)
    playTrackAtIndex(next, true)
  }

  const prevTrack = () => {
    const prev = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length
    setCurrentTrackIndex(prev)
    playTrackAtIndex(prev, true)
  }

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index)
    playTrackAtIndex(index, true)
  }

  const currentTrack = PLAYLIST[currentTrackIndex]

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        toggleMusic,
        playlist: PLAYLIST,
        currentTrackIndex,
        currentTrack,
        nextTrack,
        prevTrack,
        selectTrack,
      }}
    >
      {children}
    </MusicContext.Provider>
  )
}
