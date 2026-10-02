import { useRef, useEffect, useState } from "react";

export const useVoiceSocket = () => {
    //Guarda a conexão
    const wsRef = useRef<WebSocket | null>(null)
    const [lastMessage, setLastMessage] = useState<string | null>(null);

    
    useEffect(() => {
        //Cria a conexão com o websocket
        wsRef.current = new WebSocket('ws://localhost:8001/ws/')

        wsRef.current.onopen = () => {
            console.log('Conexão estabelecida com o WebSocket');
        }

        wsRef.current.onclose = () => {
            console.log('Conexão fechada com o WebSocket');
        }

        wsRef.current.onmessage = (event) => {
            setLastMessage(event.data)
        }
        return () => {
             if (wsRef.current) wsRef.current.close();
            }
    }

, [])

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
