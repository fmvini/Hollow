export function useAudioPlayer() {
    function speak(text: string) {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'pt-BR'
        window.speechSynthesis.speak(utterance)
    }

    return {
        speak
    }
}