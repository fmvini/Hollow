import asyncio
from app.providers.stt import faster_whisper

async def process_audio(audio_bytes: bytes) -> str:
    transcription = await asyncio.to_thread(
        faster_whisper.transcribe_audio_bytes,
        audio_bytes
    )
    return transcription