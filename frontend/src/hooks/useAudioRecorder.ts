import { useRef, useState } from "react"

export function useAudioRecorder(){
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const [isRecording, setIsRecording] = useState<boolean>(false)

    async function startRecording(){
        if (isRecording === false){
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            })
        mediaRecorderRef.current = new MediaRecorder(stream)   
        mediaRecorderRef.start()      
        setIsRecording(true)
        }
    return
    }
}