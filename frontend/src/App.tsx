import './styles/App.css'
import { useVoiceSocket } from './hooks/useVoiceSocket'
import { useAudioRecorder } from './hooks/useAudioRecorder'

function App() {

  const {lastMessage, sendMessage} = useVoiceSocket()
  const {startRecording, stopRecording, isRecording, audioBlob} = useAudioRecorder()
  return (
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
    </>
  )
}

export default App
