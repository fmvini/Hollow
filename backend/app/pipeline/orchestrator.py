import asyncio
from app.providers.stt import faster_whisper
from app.providers.llm.gemini import generate_response

async def process_audio(audio_bytes: bytes) -> str:
    transcription = await asyncio.to_thread(
        faster_whisper.transcribe_audio_bytes,
        audio_bytes
    )
    return transcription
async def process_text(text: str) -> str:
    result = await generate_response(text)
    return result