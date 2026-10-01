import { useRef, useState } from "react"

export function useAudioRecorder(){
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const [isRecording, setIsRecording] = useState<boolean>(false)
    const chunksRef = useRef<Blob[]>([])
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null)

    async function startRecording(){
        chunksRef.current = []
        //limpa o audioBlob
        setAudioBlob(null)
        if (isRecording === false){
            //espera o usuario liberar a permissão de microfone
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            })
            //crio um novo MediaRecorder
            mediaRecorderRef.current = new MediaRecorder(stream)
            //quando tiver dados disponiveis, ele da push para dentro do array de chunksRef
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0){
                    chunksRef.current.push(event.data)
                }
            }   
            mediaRecorderRef.current.start()      
            setIsRecording(true)
        }
    }
    function stopRecording(){
        //se tiver dados gravados, e se ainda estiver gravando, para de gravar
        if (mediaRecorderRef.current !== null && isRecording === true){
            const recorder = mediaRecorderRef.current
            recorder.onstop = () => {
                setIsRecording(false)
                setAudioBlob(new Blob(chunksRef.current))
                const tracks = recorder.stream.getTracks()
                tracks.forEach((track) => {
                    track.stop()
                })
            }
            recorder.stop()
        }
    }
    return {
        startRecording,
        stopRecording,
        isRecording,
        audioBlob
    }
}