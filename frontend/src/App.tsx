import './styles/App.css'
import { useVoiceSocket } from './hooks/useVoiceSocket'

function App() {

  const {lastMessage, sendMessage} = useVoiceSocket()
  return (
    <>
        <button onClick={() => sendMessage("Olá Hollow!")}>Testar Websocket</button>
        <p>Ultima mensagem: {lastMessage ?? "Nenhuma mensagem recebida"}</p>
    </>
  )
}

export default App
