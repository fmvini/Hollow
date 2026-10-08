import { useCallback } from "react"

export function useAudioPlayer() {
    const speak = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'pt-BR'
    window.speechSynthesis.speak(utterance)
}, [])

    return {
        speak
    }
}