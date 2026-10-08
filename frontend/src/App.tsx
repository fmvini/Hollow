import './styles/App.css'
import { useVoiceSocket } from './hooks/useVoiceSocket'
import { useAudioRecorder } from './hooks/useAudioRecorder'
import { useAudioPlayer } from './hooks/useAudioPlayer'

function App() {

    //puxa as subfunções do hook useVoiceSocket, useAudioRecorder e o useAudioPlayer  
    const { speak } = useAudioPlayer()   
  const {lastMessage, sendMessage, sendAudio} = useVoiceSocket()
  const {startRecording, stopRecording, isRecording, audioBlob} = useAudioRecorder()
  return (
    //teste de websocket e gravação de áudio
    <>
        
        <button onClick={() => sendMessage("Olá Hollow!")}>Testar Websocket</button>
        <p>Ultima mensagem: {lastMessage ?? "Nenhuma mensagem recebida"}</p>

        <button onClick={() => startRecording()}>Iniciar Gravação</button>
        <button onClick={() => stopRecording()}>Parar Gravação</button>
        <p>Está gravando? {isRecording ? 'True' : 'False'}</p>
        {audioBlob && (
        <audio controls src={URL.createObjectURL(audioBlob!)} />
        )}
        <p>
        audioBlob.size: {audioBlob?.size ?? 0} bytes
        </p>
        {audioBlob && (
            <button onClick={() => sendAudio(audioBlob)}>Enviar Audio</button>
        )}
    </>
  )
}

export default App
