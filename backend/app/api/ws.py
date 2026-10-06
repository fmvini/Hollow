from fastapi import APIRouter, WebSocket
from app.pipeline.orchestrator import process_audio

router = APIRouter()

@router.websocket('/')
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive()
        if data.get('type') == 'websocket.disconnect':
            break
        
        text = data.get('text')
        audio_bytes = data.get('bytes')

        if text is not None:
           await websocket.send_text(f'Recebi {text}!')
        elif audio_bytes is not None:
           transcription = await process_audio(audio_bytes)
           await websocket.send_text(f'Recebi {len(audio_bytes)} bytes de audio!')
           await websocket.send_text(f'{transcription}')