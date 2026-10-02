from fastapi import APIRouter, WebSocket
from app.providers.stt import faster_whisper
import asyncio

router = APIRouter()

@router.websocket('/')
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive()
        text = data.get('text')
        audio_bytes = data.get('bytes')

        if text is not None:
           await websocket.send_text(f'Recebi {text}!')
        elif audio_bytes is not None:
           transcription = await asyncio.to_thread(
               faster_whisper.transcribe_audio_bytes,
               audio_bytes
           )
           await websocket.send_text(f'Recebi {len(audio_bytes)} bytes de audio!')
           await websocket.send_text(f'{transcription}')