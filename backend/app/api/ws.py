from fastapi import APIRouter, WebSocket
from app.pipeline.orchestrator import process_audio, process_text
from app.providers.llm.gemini import create_chat

router = APIRouter()

@router.websocket('/')
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    chat = create_chat()
    while True:
        data = await websocket.receive()
        if data.get('type') == 'websocket.disconnect':
            break
        
        text = data.get('text')
        audio_bytes = data.get('bytes')

        if text is not None:
           response = await process_text(chat, text)
           await websocket.send_text(response)
        elif audio_bytes is not None:
           transcription = await process_audio(audio_bytes)
           response = await process_text(chat, transcription)
           await websocket.send_text(f'Recebi "{transcription}"!')
           await websocket.send_text(response)