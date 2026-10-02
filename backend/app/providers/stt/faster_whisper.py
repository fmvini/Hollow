from faster_whisper import WhisperModel
import tempfile
import os

model = WhisperModel(model_size_or_path='base', device='cpu', compute_type='int8')
def transcribe_audio(file_path: str) -> str:
    segments, info = model.transcribe(file_path)
    mensagens = []
    for segment in segments:
        texto = segment.text
        mensagens.append(texto)
    mensagem_final = " ".join(mensagens)
    return mensagem_final

def transcribe_audio_bytes(audio_bytes: bytes) -> str:
    temp_file = tempfile.NamedTemporaryFile(
        delete= False,
        suffix= '.webm'
    )
    temp_file.write(audio_bytes)
    file_path = temp_file.name
    temp_file.close()
    try:
        result = transcribe_audio(file_path)
        return result
    finally:
        os.remove(file_path)