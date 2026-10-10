import { useRef, useEffect, useState } from "react";

export const useVoiceSocket = () => {
    //Guarda a conexão
    const wsRef = useRef<WebSocket | null>(null)
    const [lastMessage, setLastMessage] = useState<string | null>(null);

    
    useEffect(() => {
        const socket = new WebSocket('ws://127.0.0.1:8001/ws/')

        wsRef.current = socket

        socket.onopen = () => {
            console.log('Conexão estabelecida com o WebSocket')
        }

        socket.onclose = () => {
            console.log('Conexão fechada com o WebSocket')
        }

        socket.onmessage = (event) => {
            setLastMessage(event.data)
        }

        return () => {
            socket.close()
        }
    }, [])

    const sendMessage = (message: string) => {
        if (wsRef.current !== null){
            if(wsRef.current.readyState === WebSocket.OPEN){
                wsRef.current.send(message)
            } else{
                return false
            }
        }
    }

    const sendAudio = (audio: Blob) => {
        if (wsRef.current !== null){
            if(wsRef.current.readyState === WebSocket.OPEN){
                wsRef.current.send(audio)
            } else{
                return false
            }
        }
    }

    return{
        lastMessage,
        sendMessage,
        sendAudio
    }
 }
