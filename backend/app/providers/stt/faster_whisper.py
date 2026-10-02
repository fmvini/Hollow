from faster_whisper import WhisperModel

model = WhisperModel(model_size_or_path='base', device='cpu', compute_type='int8')
def transcribe_audio(file_path: str) -> str:
    segments, info = model.transcribe(file_path)
    mensagens = []
    for segment in segments:
        texto = segment.text
        mensagens.append(texto)
    mensagem_final = " ".join(mensagens)
    return mensagem_final