import { useRef, useEffect } from "react";

export const useVoiceSocket = () => {
    //Guarda a conexão
    const wsRef = useRef<WebSocket | null>(null)

    useEffect(() => {
        //Cria a conexão com o websocket
        wsRef.current = new WebSocket('ws://localhost:8001/ws/')

        wsRef.current.onopen = () => {
            console.log('Conexão estabelecida com o WebSocket');
        }

        wsRef.current.onclose = () => {
            console.log('Conexão fechada com o WebSocket');
        }
        return () => {
             if (wsRef.current) wsRef.current.close();
            }
    }
, [])
}