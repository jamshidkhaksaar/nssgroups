import { createContext, useContext } from 'react'

export interface MusicContextType {
  isPlaying: boolean
  toggleMusic: () => void
}

export const MusicContext = createContext<MusicContextType | null>(null)

export function useMusic() {
  const ctx = useContext(MusicContext)
  if (!ctx) throw new Error('useMusic must be used within MusicProvider')
  return ctx
}
