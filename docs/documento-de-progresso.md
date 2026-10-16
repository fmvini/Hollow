# Documento de progresso do projeto
tendo em base os documentos de arquitetura de arquivos e escopo do projeto, o intuito desse documento é acompanhar o desenvolvimento do projeto.

# Arvore de arquivos atuais do projeto
```
├── LICENSE
├── .env.example
├── README.md
├── frontend/ (31100 tokens)
    ├── tsconfig.json
    ├── src/ (2900 tokens)
    │   ├── main.tsx
    │   ├── hooks/ (1000 tokens)
    │   │   ├── useAudioPlayer.ts
    │   │   ├── useVoiceSocket.ts (400 tokens)
    │   │   └── useAudioRecorder.ts (500 tokens)
    │   ├── App.tsx (400 tokens)
    │   └── styles/ (1400 tokens)
    │   │   ├── index.css (600 tokens)
    │   │   └── App.css (800 tokens)
    ├── vite.config.ts
    ├── .gitignore
    ├── index.html
    ├── tsconfig.node.json (200 tokens)
    ├── eslint.config.js (200 tokens)
    ├── tsconfig.app.json (200 tokens)
    ├── package.json (200 tokens)
    ├── public/ (3000 tokens)
    │   ├── icons.svg (1100 tokens)
    │   └── favicon.svg (1900 tokens)
    └── package-lock.json (24000 tokens)
├── backend/ (53600 tokens)
    ├── app/ (1900 tokens)
    │   ├── api/ (300 tokens)
    │   │   ├── health.py
    │   │   └── ws.py (200 tokens)
    │   ├── db/ (600 tokens)
    │   │   ├── models.py
    │   │   ├── database.py (200 tokens)
    │   │   └── repository.py (300 tokens)
    │   ├── config.py
    │   ├── pipeline/ (100 tokens)
    │   │   └── orchestrator.py
    │   ├── main.py (200 tokens)
    │   ├── prompts/ (200 tokens)
    │   │   └── system_pt_br.md (200 tokens)
    │   └── providers/ (400 tokens)
    │   │   ├── llm/ (200 tokens)
    │   │       └── gemini.py (200 tokens)
    │   │   └── stt/ (200 tokens)
    │   │       └── faster_whisper.py (200 tokens)
    ├── pyproject.toml
    └── uv.lock (51600 tokens)
├── docs/ (3100 tokens)
    ├── documento-de-progresso.md
    ├── arquitetura-de-arquivos.md (1400 tokens)
    └── escopo-assistente-de-voz.md (1600 tokens)
└── .gitignore (800 tokens)
```


/LICENSE:
--------------------------------------------------------------------------------
1 | 


--------------------------------------------------------------------------------
/.env.example:
--------------------------------------------------------------------------------
1 | 


--------------------------------------------------------------------------------
/README.md:
--------------------------------------------------------------------------------
1 | 


--------------------------------------------------------------------------------
/frontend/tsconfig.json:
--------------------------------------------------------------------------------
1 | {
2 |   "files": [],
3 |   "references": [
4 |     { "path": "./tsconfig.app.json" },
5 |     { "path": "./tsconfig.node.json" }
6 |   ]
7 | }
8 | 


--------------------------------------------------------------------------------
/backend/app/api/health.py:
--------------------------------------------------------------------------------
1 | from fastapi import APIRouter
2 | 
3 | router = APIRouter()
4 | 
5 | @router.get('/')
6 | async def health_check():
7 |     return {"status": "ok"}
8 | 


--------------------------------------------------------------------------------
/backend/app/db/models.py:
--------------------------------------------------------------------------------
1 | from dataclasses import dataclass
2 | 
3 | @dataclass
4 | class Task:
5 |     id: int | None
6 |     title: str
7 |     completed: bool
8 |     created_at: str


--------------------------------------------------------------------------------
/docs/documento-de-progresso.md:
--------------------------------------------------------------------------------
1 | # Documento de progresso do projeto
2 | tendo em base os documentos de arquitetura de arquivos e escopo do projeto, o intuito desse documento é acompanhar o desenvolvimento do projeto.
3 | 
4 | # Arvore de arquivos atuais do projeto
5 | 


--------------------------------------------------------------------------------
/frontend/src/main.tsx:
--------------------------------------------------------------------------------
 1 | import { StrictMode } from 'react'
 2 | import { createRoot } from 'react-dom/client'
 3 | import './styles/index.css'
 4 | import App from './App.tsx'
 5 | 
 6 | createRoot(document.getElementById('root')!).render(
 7 |   <StrictMode>
 8 |     <App />
 9 |   </StrictMode>,
10 | )
11 | 


--------------------------------------------------------------------------------
/frontend/vite.config.ts:
--------------------------------------------------------------------------------
 1 | import react, { reactCompilerPreset } from '@vitejs/plugin-react'
 2 | import babel from '@rolldown/plugin-babel'
 3 | import { defineConfig } from 'vite'
 4 | 
 5 | // https://vite.dev/config/
 6 | export default defineConfig({
 7 |   plugins: [
 8 |     react(),
 9 |     babel({ presets: [reactCompilerPreset()] })
10 |   ],
11 | })
12 | 


--------------------------------------------------------------------------------
/frontend/.gitignore:
--------------------------------------------------------------------------------
 1 | # Logs
 2 | logs
 3 | *.log
 4 | npm-debug.log*
 5 | yarn-debug.log*
 6 | yarn-error.log*
 7 | pnpm-debug.log*
 8 | lerna-debug.log*
 9 | 
10 | node_modules
11 | dist
12 | dist-ssr
13 | *.local
14 | 
15 | # Editor directories and files
16 | .vscode/*
17 | !.vscode/extensions.json
18 | .idea
19 | .DS_Store
20 | *.suo
21 | *.ntvs*
22 | *.njsproj
23 | *.sln
24 | *.sw?
25 | 


--------------------------------------------------------------------------------
/frontend/src/hooks/useAudioPlayer.ts:
--------------------------------------------------------------------------------
 1 | import { useCallback } from "react"
 2 | 
 3 | export function useAudioPlayer() {
 4 |     const speak = useCallback((text: string) => {
 5 |     const utterance = new SpeechSynthesisUtterance(text)
 6 |     utterance.lang = 'pt-BR'
 7 |     window.speechSynthesis.speak(utterance)
 8 | }, [])
 9 | 
10 |     return {
11 |         speak
12 |     }
13 | }


--------------------------------------------------------------------------------
/backend/app/config.py:
--------------------------------------------------------------------------------
 1 | import os
 2 | from dotenv import load_dotenv  
 3 | 
 4 | load_dotenv()
 5 | 
 6 | GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', None)
 7 | 
 8 | APP_NAME = os.getenv('APP_NAME', 'Hollow')
 9 | 
10 | ENVIRONMENT = os.getenv('ENVIRONMENT', 'development')
11 | 
12 | DEMO_MODE = os.getenv('DEMO_MODE', "false").lower() == 'true'
13 | 
14 | FRONTEND_ORIGIN = os.getenv('FRONTEND_ORIGIN', 'http://localhost:5173')


--------------------------------------------------------------------------------
/frontend/index.html:
--------------------------------------------------------------------------------
 1 | <!doctype html>
 2 | <html lang="en">
 3 |   <head>
 4 |     <meta charset="UTF-8" />
 5 |     <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
 6 |     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 7 |     <title>frontend</title>
 8 |   </head>
 9 |   <body>
10 |     <div id="root"></div>
11 |     <script type="module" src="/src/main.tsx"></script>
12 |   </body>
13 | </html>
14 | 


--------------------------------------------------------------------------------
/backend/pyproject.toml:
--------------------------------------------------------------------------------
 1 | [project]
 2 | name = "Hollow"
 3 | version="1.0.0"
 4 | description = "AI voice agent"
 5 | authors = [
 6 |     { name = "Vinícius F. Marrocos", email = "viniciusfmarrocos@gmail.com" }
 7 | ]
 8 | requires-python=">=3.12"
 9 | dependencies = [
10 |     "av==18.1.0",
11 |     "fastapi>=0.142.2",
12 |     "faster-whisper>=1.2.1",
13 |     "google-genai>=2.28.0",
14 |     "python-dotenv>=1.2.3",
15 |     "uvicorn[standard]>=0.54.0",
16 | ]
17 | 


--------------------------------------------------------------------------------
/backend/app/pipeline/orchestrator.py:
--------------------------------------------------------------------------------
 1 | import asyncio
 2 | from app.providers.stt import faster_whisper
 3 | from app.providers.llm.gemini import generate_response
 4 | 
 5 | async def process_audio(audio_bytes: bytes) -> str:
 6 |     transcription = await asyncio.to_thread(
 7 |         faster_whisper.transcribe_audio_bytes,
 8 |         audio_bytes
 9 |     )
10 |     return transcription
11 | async def process_text(chat, text: str) -> str:
12 |     result = await generate_response(chat, text)
13 |     return result


--------------------------------------------------------------------------------
/backend/app/main.py:
--------------------------------------------------------------------------------
 1 | from fastapi import FastAPI
 2 | from app import config
 3 | from app.api.health import router as health_router 
 4 | from app.api.ws import router as ws_router
 5 | from app.db.database import init_db
 6 | from contextlib import asynccontextmanager
 7 | 
 8 | @asynccontextmanager
 9 | async def lifespan(_app: FastAPI):
10 |     init_db()
11 | 
12 |     yield
13 | 
14 | app = FastAPI(
15 |     title = config.APP_NAME,
16 |     lifespan=lifespan
17 | )
18 | 
19 | app.include_router(health_router, prefix='/health')
20 | app.include_router(ws_router, prefix='/ws')
21 | 


--------------------------------------------------------------------------------
/backend/app/prompts/system_pt_br.md:
--------------------------------------------------------------------------------
 1 | You are Hollow, a personal voice assistant.
 2 | 
 3 | Reply exclusively in Brazilian Portuguese, English or Spanish.
 4 | 
 5 | If the user communicates in Brazilian Portuguese, reply in Brazilian Portuguese.
 6 | 
 7 | If the user communicates in English, reply in English.
 8 | 
 9 | If the user communicates in Spanish, replu in Spanish.
10 | 
11 | If the language is unclear, default to English.
12 | 
13 | Never reply in another language.
14 | 
15 | Keep responses concise and natural because they will later be spoken aloud by a text-to-speech system.


--------------------------------------------------------------------------------
/frontend/tsconfig.node.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "compilerOptions": {
 3 |     "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
 4 |     "target": "es2023",
 5 |     "lib": ["ES2023"],
 6 |     "types": ["node"],
 7 |     "skipLibCheck": true,
 8 | 
 9 |     /* Bundler mode */
10 |     "module": "nodenext",
11 |     "allowImportingTsExtensions": true,
12 |     "verbatimModuleSyntax": true,
13 |     "moduleDetection": "force",
14 |     "noEmit": true,
15 | 
16 |     /* Linting */
17 |     "noUnusedLocals": true,
18 |     "noUnusedParameters": true,
19 |     "erasableSyntaxOnly": true,
20 |     "noFallthroughCasesInSwitch": true
21 |   },
22 |   "include": ["vite.config.ts"]
23 | }
24 | 


--------------------------------------------------------------------------------
/frontend/eslint.config.js:
--------------------------------------------------------------------------------
 1 | import js from '@eslint/js'
 2 | import globals from 'globals'
 3 | import reactHooks from 'eslint-plugin-react-hooks'
 4 | import reactRefresh from 'eslint-plugin-react-refresh'
 5 | import tseslint from 'typescript-eslint'
 6 | import { defineConfig, globalIgnores } from 'eslint/config'
 7 | 
 8 | export default defineConfig([
 9 |   globalIgnores(['dist']),
10 |   {
11 |     files: ['**/*.{ts,tsx}'],
12 |     extends: [
13 |       js.configs.recommended,
14 |       tseslint.configs.recommended,
15 |       reactHooks.configs.flat.recommended,
16 |       reactRefresh.configs.vite,
17 |     ],
18 |     languageOptions: {
19 |       globals: globals.browser,
20 |     },
21 |   },
22 | ])
23 | 


--------------------------------------------------------------------------------
/frontend/tsconfig.app.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "compilerOptions": {
 3 |     "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
 4 |     "target": "es2023",
 5 |     "lib": ["ES2023", "DOM"],
 6 |     "module": "esnext",
 7 |     "types": ["vite/client"],
 8 |     "allowArbitraryExtensions": true,
 9 |     "skipLibCheck": true,
10 | 
11 |     /* Bundler mode */
12 |     "moduleResolution": "bundler",
13 |     "allowImportingTsExtensions": true,
14 |     "verbatimModuleSyntax": true,
15 |     "moduleDetection": "force",
16 |     "noEmit": true,
17 |     "jsx": "react-jsx",
18 | 
19 |     /* Linting */
20 |     "noUnusedLocals": true,
21 |     "noUnusedParameters": true,
22 |     "erasableSyntaxOnly": true,
23 |     "noFallthroughCasesInSwitch": true
24 |   },
25 |   "include": ["src"]
26 | }
27 | 


--------------------------------------------------------------------------------
/backend/app/db/database.py:
--------------------------------------------------------------------------------
 1 | import sqlite3
 2 | from pathlib import Path
 3 | 
 4 | BASE_DIR = Path(__file__).resolve().parents[2]
 5 | DATABASE_PATH = BASE_DIR / "data" / "hollow.db"
 6 | 
 7 | DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)
 8 | 
 9 | def get_connection():
10 |     connection = sqlite3.connect(DATABASE_PATH)
11 |     connection.row_factory = sqlite3.Row
12 | 
13 |     return connection
14 | 
15 | def init_db():
16 |     connection = get_connection()
17 | 
18 |     connection.execute("""
19 |         CREATE TABLE IF NOT EXISTS tasks (
20 |             id INTEGER PRIMARY KEY AUTOINCREMENT,
21 |             title TEXT NOT NULL,
22 |             completed INTEGER NOT NULL DEFAULT 0,
23 |             created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
24 |             )        
25 |         """)
26 | 
27 |     connection.commit()
28 |     connection.close()
29 | 


--------------------------------------------------------------------------------
/backend/app/providers/llm/gemini.py:
--------------------------------------------------------------------------------
 1 | from google import genai
 2 | from app import config
 3 | from google.genai import types
 4 | from pathlib import Path
 5 | 
 6 | client = genai.Client(
 7 |     api_key=config.GEMINI_API_KEY
 8 | )
 9 | 
10 | def load_system_prompt() -> str:
11 |     prompt_path = Path(__file__).resolve().parents[2] / "prompts" / "system_pt_br.md"
12 | 
13 |     with open(prompt_path, "r", encoding="utf-8") as file:
14 |         return file.read()
15 | 
16 | SYSTEM_PROMPT = load_system_prompt()
17 | 
18 | async def generate_response(chat, text: str) -> str:
19 |     response = await chat.send_message(text)
20 |     return response.text
21 | 
22 | def create_chat():
23 |     return client.aio.chats.create(
24 |         model='gemini-3.5-flash-lite',
25 |         config=types.GenerateContentConfig(
26 |             system_instruction=SYSTEM_PROMPT
27 |         )
28 |     )


--------------------------------------------------------------------------------
/backend/app/providers/stt/faster_whisper.py:
--------------------------------------------------------------------------------
 1 | from faster_whisper import WhisperModel
 2 | import tempfile
 3 | import os
 4 | 
 5 | model = WhisperModel(model_size_or_path='base', device='cpu', compute_type='int8')
 6 | def transcribe_audio(file_path: str) -> str:
 7 |     segments, info = model.transcribe(file_path)
 8 |     mensagens = []
 9 |     for segment in segments:
10 |         texto = segment.text
11 |         mensagens.append(texto)
12 |     mensagem_final = " ".join(mensagens)
13 |     return mensagem_final
14 | 
15 | def transcribe_audio_bytes(audio_bytes: bytes) -> str:
16 |     temp_file = tempfile.NamedTemporaryFile(
17 |         delete= False,
18 |         suffix= '.webm'
19 |     )
20 |     temp_file.write(audio_bytes)
21 |     file_path = temp_file.name
22 |     temp_file.close()
23 |     try:
24 |         result = transcribe_audio(file_path)
25 |         return result
26 |     finally:
27 |         os.remove(file_path)


--------------------------------------------------------------------------------
/backend/app/api/ws.py:
--------------------------------------------------------------------------------
 1 | from fastapi import APIRouter, WebSocket
 2 | from app.pipeline.orchestrator import process_audio, process_text
 3 | from app.providers.llm.gemini import create_chat
 4 | 
 5 | router = APIRouter()
 6 | 
 7 | @router.websocket('/')
 8 | async def websocket_endpoint(websocket: WebSocket):
 9 |     await websocket.accept()
10 |     chat = create_chat()
11 |     while True:
12 |         data = await websocket.receive()
13 |         if data.get('type') == 'websocket.disconnect':
14 |             break
15 |         
16 |         text = data.get('text')
17 |         audio_bytes = data.get('bytes')
18 | 
19 |         if text is not None:
20 |            response = await process_text(chat, text)
21 |            await websocket.send_text(response)
22 |         elif audio_bytes is not None:
23 |            transcription = await process_audio(audio_bytes)
24 |            response = await process_text(chat, transcription)
25 |            await websocket.send_text(response)


--------------------------------------------------------------------------------
/frontend/package.json:
--------------------------------------------------------------------------------
 1 | {
 2 |   "name": "frontend",
 3 |   "private": true,
 4 |   "version": "0.0.0",
 5 |   "type": "module",
 6 |   "scripts": {
 7 |     "dev": "vite",
 8 |     "build": "tsc -b && vite build",
 9 |     "lint": "eslint .",
10 |     "preview": "vite preview"
11 |   },
12 |   "dependencies": {
13 |     "react": "^19.2.8",
14 |     "react-dom": "^19.2.8"
15 |   },
16 |   "devDependencies": {
17 |     "@babel/core": "^7.29.7",
18 |     "@eslint/js": "^10.0.1",
19 |     "@rolldown/plugin-babel": "^0.2.3",
20 |     "@types/babel__core": "^7.20.5",
21 |     "@types/node": "^24.13.3",
22 |     "@types/react": "^19.2.18",
23 |     "@types/react-dom": "^19.2.7",
24 |     "@vitejs/plugin-react": "^6.1.1",
25 |     "babel-plugin-react-compiler": "^1.0.0",
26 |     "eslint": "^10.10.0",
27 |     "eslint-plugin-react-hooks": "^7.1.1",
28 |     "eslint-plugin-react-refresh": "^0.5.6",
29 |     "globals": "^17.12.0",
30 |     "typescript": "~6.0.2",
31 |     "typescript-eslint": "^8.69.0",
32 |     "vite": "^8.3.1"
33 |   }
34 | }
35 | 


--------------------------------------------------------------------------------
/backend/app/db/repository.py:
--------------------------------------------------------------------------------
 1 | from app.db.database import get_connection
 2 | from app.db.models import Task
 3 | 
 4 | def create_task(title: str) -> Task:
 5 |     connection = get_connection()
 6 | 
 7 |     try: 
 8 |         cursor = connection.execute(
 9 |             "INSERT INTO tasks (title) VALUES (?)",
10 |             (title,)
11 |         )
12 | 
13 |         connection.commit()
14 |         task_id = cursor.lastrowid
15 |         row = connection.execute(
16 |             "SELECT id, title, completed, created_at FROM tasks WHERE id = ?",
17 |             (task_id,)
18 |         ).fetchone()
19 | 
20 |         return Task(
21 |             id=row["id"],
22 |             title=row["title"],
23 |             completed=bool(row["completed"]),
24 |             created_at=row["created_at"]
25 |         )
26 |     finally: 
27 |         connection.close()
28 | 
29 | def list_tasks() -> list[Task]:
30 |     connection = get_connection()
31 | 
32 |     try:
33 |         rows = connection.execute(
34 |             "SELECT id, title, completed, created_at FROM tasks"
35 |         ).fetchall()
36 | 
37 |         return [
38 |             Task(
39 |                 id=row["id"],
40 |                 title=row["title"],
41 |                 completed=bool(row["completed"]),
42 |                 created_at=row["created_at"]
43 |             )
44 |             for row in rows
45 |         ]
46 |     finally:
47 |         connection.close()


--------------------------------------------------------------------------------
/frontend/src/hooks/useVoiceSocket.ts:
--------------------------------------------------------------------------------
 1 | import { useRef, useEffect, useState } from "react";
 2 | 
 3 | export const useVoiceSocket = () => {
 4 |     //Guarda a conexão
 5 |     const wsRef = useRef<WebSocket | null>(null)
 6 |     const [lastMessage, setLastMessage] = useState<string | null>(null);
 7 | 
 8 |     
 9 |     useEffect(() => {
10 |         const socket = new WebSocket('ws://127.0.0.1:8001/ws/')
11 | 
12 |         wsRef.current = socket
13 | 
14 |         socket.onopen = () => {
15 |             console.log('Conexão estabelecida com o WebSocket')
16 |         }
17 | 
18 |         socket.onclose = () => {
19 |             console.log('Conexão fechada com o WebSocket')
20 |         }
21 | 
22 |         socket.onmessage = (event) => {
23 |             setLastMessage(event.data)
24 |         }
25 | 
26 |         return () => {
27 |             socket.close()
28 |         }
29 |     }, [])
30 | 
31 |     const sendMessage = (message: string) => {
32 |         if (wsRef.current !== null){
33 |             if(wsRef.current.readyState === WebSocket.OPEN){
34 |                 wsRef.current.send(message)
35 |             } else{
36 |                 return false
37 |             }
38 |         }
39 |     }
40 | 
41 |     const sendAudio = (audio: Blob) => {
42 |         if (wsRef.current !== null){
43 |             if(wsRef.current.readyState === WebSocket.OPEN){
44 |                 wsRef.current.send(audio)
45 |             } else{
46 |                 return false
47 |             }
48 |         }
49 |     }
50 | 
51 |     return{
52 |         lastMessage,
53 |         sendMessage,
54 |         sendAudio
55 |     }
56 |  }
57 | 


--------------------------------------------------------------------------------
/frontend/src/App.tsx:
--------------------------------------------------------------------------------
 1 | import './styles/App.css'
 2 | import { useVoiceSocket } from './hooks/useVoiceSocket'
 3 | import { useAudioRecorder } from './hooks/useAudioRecorder'
 4 | import { useAudioPlayer } from './hooks/useAudioPlayer'
 5 | import { useEffect } from 'react'
 6 | 
 7 | function App() {
 8 | 
 9 |     //puxa as subfunções do hook useVoiceSocket, useAudioRecorder e o useAudioPlayer  
10 |     const { speak } = useAudioPlayer()   
11 |   const {lastMessage, sendMessage, sendAudio} = useVoiceSocket()
12 |   const {startRecording, stopRecording, isRecording, audioBlob} = useAudioRecorder()
13 | 
14 |     useEffect(() => {
15 |         if (lastMessage !== null ){
16 |             speak(lastMessage)
17 |         }
18 |     }, [lastMessage, speak])
19 | 
20 |   return (
21 |     //teste de websocket e gravação de áudio
22 |     <>
23 |         
24 |         <button onClick={() => sendMessage("Olá Hollow!")}>Testar Websocket</button>
25 |         <p>Ultima mensagem: {lastMessage ?? "Nenhuma mensagem recebida"}</p>
26 | 
27 |         <button onClick={() => startRecording()}>Iniciar Gravação</button>
28 |         <button onClick={() => stopRecording()}>Parar Gravação</button>
29 |         <p>Está gravando? {isRecording ? 'True' : 'False'}</p>
30 |         {audioBlob && (
31 |         <audio controls src={URL.createObjectURL(audioBlob!)} />
32 |         )}
33 |         <p>
34 |         audioBlob.size: {audioBlob?.size ?? 0} bytes
35 |         </p>
36 |         {audioBlob && (
37 |             <button onClick={() => sendAudio(audioBlob)}>Enviar Audio</button>
38 |         )}
39 |     </>
40 |   )
41 | }
42 | 
43 | export default App
44 | 


--------------------------------------------------------------------------------
/frontend/src/hooks/useAudioRecorder.ts:
--------------------------------------------------------------------------------
 1 | import { useRef, useState } from "react"
 2 | 
 3 | export function useAudioRecorder(){
 4 |     const mediaRecorderRef = useRef<MediaRecorder | null>(null)
 5 |     const [isRecording, setIsRecording] = useState<boolean>(false)
 6 |     const chunksRef = useRef<Blob[]>([])
 7 |     const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
 8 | 
 9 |     async function startRecording(){
10 |         chunksRef.current = []
11 |         //limpa o audioBlob
12 |         setAudioBlob(null)
13 |         if (isRecording === false){
14 |             //espera o usuario liberar a permissão de microfone
15 |             const stream = await navigator.mediaDevices.getUserMedia({
16 |                 audio: true
17 |             })
18 |             //crio um novo MediaRecorder
19 |             mediaRecorderRef.current = new MediaRecorder(stream)
20 |             //quando tiver dados disponiveis, ele da push para dentro do array de chunksRef
21 |             mediaRecorderRef.current.ondataavailable = (event) => {
22 |                 if (event.data.size > 0){
23 |                     chunksRef.current.push(event.data)
24 |                 }
25 |             }   
26 |             mediaRecorderRef.current.start()      
27 |             setIsRecording(true)
28 |         }
29 |     }
30 |     function stopRecording(){
31 |         //se tiver dados gravados, e se ainda estiver gravando, para de gravar
32 |         if (mediaRecorderRef.current !== null && isRecording === true){
33 |             const recorder = mediaRecorderRef.current
34 |             recorder.onstop = () => {
35 |                 setIsRecording(false)
36 |                 setAudioBlob(new Blob(chunksRef.current))
37 |                 const tracks = recorder.stream.getTracks()
38 |                 tracks.forEach((track) => {
39 |                     track.stop()
40 |                 })
41 |             }
42 |             recorder.stop()
43 |         }
44 |     }
45 |     return {
46 |         startRecording,
47 |         stopRecording,
48 |         isRecording,
49 |         audioBlob
50 |     }
51 | }


--------------------------------------------------------------------------------
/frontend/src/styles/index.css:
--------------------------------------------------------------------------------
  1 | :root {
  2 |   --text: #6b6375;
  3 |   --text-h: #08060d;
  4 |   --bg: #fff;
  5 |   --border: #e5e4e7;
  6 |   --code-bg: #f4f3ec;
  7 |   --accent: #aa3bff;
  8 |   --accent-bg: rgba(170, 59, 255, 0.1);
  9 |   --accent-border: rgba(170, 59, 255, 0.5);
 10 |   --social-bg: rgba(244, 243, 236, 0.5);
 11 |   --shadow:
 12 |     rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;
 13 | 
 14 |   --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
 15 |   --heading: system-ui, 'Segoe UI', Roboto, sans-serif;
 16 |   --mono: ui-monospace, Consolas, monospace;
 17 | 
 18 |   font: 18px/145% var(--sans);
 19 |   letter-spacing: 0.18px;
 20 |   color-scheme: light dark;
 21 |   color: var(--text);
 22 |   background: var(--bg);
 23 |   font-synthesis: none;
 24 |   text-rendering: optimizeLegibility;
 25 |   -webkit-font-smoothing: antialiased;
 26 |   -moz-osx-font-smoothing: grayscale;
 27 | 
 28 |   @media (max-width: 1024px) {
 29 |     font-size: 16px;
 30 |   }
 31 | }
 32 | 
 33 | @media (prefers-color-scheme: dark) {
 34 |   :root {
 35 |     --text: #9ca3af;
 36 |     --text-h: #f3f4f6;
 37 |     --bg: #16171d;
 38 |     --border: #2e303a;
 39 |     --code-bg: #1f2028;
 40 |     --accent: #c084fc;
 41 |     --accent-bg: rgba(192, 132, 252, 0.15);
 42 |     --accent-border: rgba(192, 132, 252, 0.5);
 43 |     --social-bg: rgba(47, 48, 58, 0.5);
 44 |     --shadow:
 45 |       rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px;
 46 |   }
 47 | 
 48 |   #social .button-icon {
 49 |     filter: invert(1) brightness(2);
 50 |   }
 51 | }
 52 | 
 53 | #root {
 54 |   width: 1126px;
 55 |   max-width: 100%;
 56 |   margin: 0 auto;
 57 |   text-align: center;
 58 |   border-inline: 1px solid var(--border);
 59 |   min-height: 100svh;
 60 |   display: flex;
 61 |   flex-direction: column;
 62 |   box-sizing: border-box;
 63 | }
 64 | 
 65 | body {
 66 |   margin: 0;
 67 | }
 68 | 
 69 | h1,
 70 | h2 {
 71 |   font-family: var(--heading);
 72 |   font-weight: 500;
 73 |   color: var(--text-h);
 74 | }
 75 | 
 76 | h1 {
 77 |   font-size: 56px;
 78 |   letter-spacing: -1.68px;
 79 |   margin: 32px 0;
 80 |   @media (max-width: 1024px) {
 81 |     font-size: 36px;
 82 |     margin: 20px 0;
 83 |   }
 84 | }
 85 | h2 {
 86 |   font-size: 24px;
 87 |   line-height: 118%;
 88 |   letter-spacing: -0.24px;
 89 |   margin: 0 0 8px;
 90 |   @media (max-width: 1024px) {
 91 |     font-size: 20px;
 92 |   }
 93 | }
 94 | p {
 95 |   margin: 0;
 96 | }
 97 | 
 98 | code,
 99 | .counter {
100 |   font-family: var(--mono);
101 |   display: inline-flex;
102 |   border-radius: 4px;
103 |   color: var(--text-h);
104 | }
105 | 
106 | code {
107 |   font-size: 15px;
108 |   line-height: 135%;
109 |   padding: 4px 8px;
110 |   background: var(--code-bg);
111 | }
112 | 


--------------------------------------------------------------------------------
/.gitignore:
--------------------------------------------------------------------------------
  1 | # =============================================================
  2 | # Assistente de voz: .gitignore
  3 | # =============================================================
  4 | 
  5 | # -------------------------------------------------------------
  6 | # Segredos e credenciais (NUNCA versionar)
  7 | # -------------------------------------------------------------
  8 | .env
  9 | .env.*
 10 | !.env.example
 11 | *.pem
 12 | *.key
 13 | credentials.json
 14 | client_secret*.json
 15 | token.json
 16 | token.pickle
 17 | **/secrets/
 18 | 
 19 | # -------------------------------------------------------------
 20 | # Python
 21 | # -------------------------------------------------------------
 22 | __pycache__/
 23 | *.py[cod]
 24 | *$py.class
 25 | *.so
 26 | .Python
 27 | 
 28 | # Ambientes virtuais
 29 | .venv/
 30 | venv/
 31 | env/
 32 | ENV/
 33 | 
 34 | # Empacotamento e build
 35 | build/
 36 | dist/
 37 | *.egg-info/
 38 | *.egg
 39 | .eggs/
 40 | pip-wheel-metadata/
 41 | 
 42 | # Testes e cobertura
 43 | .pytest_cache/
 44 | .coverage
 45 | .coverage.*
 46 | htmlcov/
 47 | coverage.xml
 48 | .tox/
 49 | .hypothesis/
 50 | 
 51 | # Linters e type checkers
 52 | .ruff_cache/
 53 | .mypy_cache/
 54 | .pytype/
 55 | 
 56 | # Jupyter (se usar para experimentos)
 57 | .ipynb_checkpoints/
 58 | 
 59 | # -------------------------------------------------------------
 60 | # Node / Frontend (Vite + React)
 61 | # -------------------------------------------------------------
 62 | node_modules/
 63 | frontend/dist/
 64 | frontend/.vite/
 65 | frontend/coverage/
 66 | *.tsbuildinfo
 67 | npm-debug.log*
 68 | yarn-debug.log*
 69 | yarn-error.log*
 70 | pnpm-debug.log*
 71 | 
 72 | # -------------------------------------------------------------
 73 | # Modelos de IA e arquivos pesados
 74 | # -------------------------------------------------------------
 75 | # Vozes do Piper, pesos do Whisper, modelos do Ollama etc.
 76 | backend/models/*
 77 | !backend/models/.gitkeep
 78 | *.onnx
 79 | *.onnx.json
 80 | *.gguf
 81 | *.bin
 82 | *.safetensors
 83 | *.pt
 84 | *.pth
 85 | .cache/
 86 | huggingface/
 87 | 
 88 | # -------------------------------------------------------------
 89 | # Dados locais e áudio (privacidade / LGPD)
 90 | # -------------------------------------------------------------
 91 | *.db
 92 | *.sqlite
 93 | *.sqlite3
 94 | *.db-journal
 95 | *.db-wal
 96 | *.db-shm
 97 | data/
 98 | 
 99 | # Áudios gravados durante testes (não versionar voz de ninguém)
100 | *.wav
101 | *.mp3
102 | *.webm
103 | *.ogg
104 | *.m4a
105 | !docs/**/*.wav
106 | !docs/**/*.mp3
107 | 
108 | # -------------------------------------------------------------
109 | # Resultados gerados da avaliação
110 | # -------------------------------------------------------------
111 | # Mantém a pasta, ignora os relatórios. Se quiser exibir um
112 | # resultado no README, copie-o para docs/ e versione de lá.
113 | eval/results/*
114 | !eval/results/.gitkeep
115 | 
116 | # -------------------------------------------------------------
117 | # Logs e temporários
118 | # -------------------------------------------------------------
119 | *.log
120 | logs/
121 | tmp/
122 | temp/
123 | *.tmp
124 | 
125 | # -------------------------------------------------------------
126 | # Docker
127 | # -------------------------------------------------------------
128 | docker-compose.override.yml
129 | 
130 | # -------------------------------------------------------------
131 | # Editores e sistema operacional
132 | # -------------------------------------------------------------
133 | .vscode/*
134 | !.vscode/settings.json
135 | !.vscode/extensions.json
136 | .idea/
137 | *.swp
138 | *.swo
139 | *~
140 | .DS_Store
141 | Thumbs.db
142 | desktop.ini


--------------------------------------------------------------------------------
/frontend/src/styles/App.css:
--------------------------------------------------------------------------------
  1 | .counter {
  2 |   font-size: 16px;
  3 |   padding: 5px 10px;
  4 |   border-radius: 5px;
  5 |   color: var(--accent);
  6 |   background: var(--accent-bg);
  7 |   border: 2px solid transparent;
  8 |   transition: border-color 0.3s;
  9 |   margin-bottom: 24px;
 10 | 
 11 |   &:hover {
 12 |     border-color: var(--accent-border);
 13 |   }
 14 |   &:focus-visible {
 15 |     outline: 2px solid var(--accent);
 16 |     outline-offset: 2px;
 17 |   }
 18 | }
 19 | 
 20 | .hero {
 21 |   position: relative;
 22 | 
 23 |   .base,
 24 |   .framework,
 25 |   .vite {
 26 |     inset-inline: 0;
 27 |     margin: 0 auto;
 28 |   }
 29 | 
 30 |   .base {
 31 |     width: 170px;
 32 |     position: relative;
 33 |     z-index: 0;
 34 |   }
 35 | 
 36 |   .framework,
 37 |   .vite {
 38 |     position: absolute;
 39 |   }
 40 | 
 41 |   .framework {
 42 |     z-index: 1;
 43 |     top: 34px;
 44 |     height: 28px;
 45 |     transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
 46 |       scale(1.4);
 47 |   }
 48 | 
 49 |   .vite {
 50 |     z-index: 0;
 51 |     top: 107px;
 52 |     height: 26px;
 53 |     width: auto;
 54 |     transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
 55 |       scale(0.8);
 56 |   }
 57 | }
 58 | 
 59 | #center {
 60 |   display: flex;
 61 |   flex-direction: column;
 62 |   gap: 25px;
 63 |   place-content: center;
 64 |   place-items: center;
 65 |   flex-grow: 1;
 66 | 
 67 |   @media (max-width: 1024px) {
 68 |     padding: 32px 20px 24px;
 69 |     gap: 18px;
 70 |   }
 71 | }
 72 | 
 73 | #next-steps {
 74 |   display: flex;
 75 |   border-top: 1px solid var(--border);
 76 |   text-align: left;
 77 | 
 78 |   & > div {
 79 |     flex: 1 1 0;
 80 |     padding: 32px;
 81 |     @media (max-width: 1024px) {
 82 |       padding: 24px 20px;
 83 |     }
 84 |   }
 85 | 
 86 |   .icon {
 87 |     margin-bottom: 16px;
 88 |     width: 22px;
 89 |     height: 22px;
 90 |   }
 91 | 
 92 |   @media (max-width: 1024px) {
 93 |     flex-direction: column;
 94 |     text-align: center;
 95 |   }
 96 | }
 97 | 
 98 | #docs {
 99 |   border-right: 1px solid var(--border);
100 | 
101 |   @media (max-width: 1024px) {
102 |     border-right: none;
103 |     border-bottom: 1px solid var(--border);
104 |   }
105 | }
106 | 
107 | #next-steps ul {
108 |   list-style: none;
109 |   padding: 0;
110 |   display: flex;
111 |   gap: 8px;
112 |   margin: 32px 0 0;
113 | 
114 |   .logo {
115 |     height: 18px;
116 |   }
117 | 
118 |   a {
119 |     color: var(--text-h);
120 |     font-size: 16px;
121 |     border-radius: 6px;
122 |     background: var(--social-bg);
123 |     display: flex;
124 |     padding: 6px 12px;
125 |     align-items: center;
126 |     gap: 8px;
127 |     text-decoration: none;
128 |     transition: box-shadow 0.3s;
129 | 
130 |     &:hover {
131 |       box-shadow: var(--shadow);
132 |     }
133 |     .button-icon {
134 |       height: 18px;
135 |       width: 18px;
136 |     }
137 |   }
138 | 
139 |   @media (max-width: 1024px) {
140 |     margin-top: 20px;
141 |     flex-wrap: wrap;
142 |     justify-content: center;
143 | 
144 |     li {
145 |       flex: 1 1 calc(50% - 8px);
146 |     }
147 | 
148 |     a {
149 |       width: 100%;
150 |       justify-content: center;
151 |       box-sizing: border-box;
152 |     }
153 |   }
154 | }
155 | 
156 | #spacer {
157 |   height: 88px;
158 |   border-top: 1px solid var(--border);
159 |   @media (max-width: 1024px) {
160 |     height: 48px;
161 |   }
162 | }
163 | 
164 | .ticks {
165 |   position: relative;
166 |   width: 100%;
167 | 
168 |   &::before,
169 |   &::after {
170 |     content: '';
171 |     position: absolute;
172 |     top: -4.5px;
173 |     border: 5px solid transparent;
174 |   }
175 | 
176 |   &::before {
177 |     left: 0;
178 |     border-left-color: var(--border);
179 |   }
180 |   &::after {
181 |     right: 0;
182 |     border-right-color: var(--border);
183 |   }
184 | }
185 | 

--------------------------------------------------------------------------------
/docs/arquitetura-de-arquivos.md:
--------------------------------------------------------------------------------
  1 | # Arquitetura de arquivos: assistente de voz pessoal
  2 | 
  3 | > Estrutura de pastas e arquivos do projeto, alinhada ao [escopo](./escopo-assistente-de-voz.md) e ao cronograma de 3 semanas.
  4 | 
  5 | ---
  6 | 
  7 | ## Estrutura
  8 | 
  9 | ```
 10 | voice-assistant/
 11 | ├── README.md
 12 | ├── LICENSE
 13 | ├── .gitignore
 14 | ├── .env.example                  # todas as variáveis, sem valores reais
 15 | ├── Makefile                      # make dev, make test, make eval, make lint
 16 | │
 17 | ├── .github/
 18 | │   └── workflows/
 19 | │       └── ci.yml                # ruff + pytest + build do frontend
 20 | │
 21 | ├── docs/
 22 | │   ├── architecture.md           # diagrama e fluxo de dados
 23 | │   ├── decisions.md              # por que esse STT/LLM/TTS (mini-ADRs)
 24 | │   ├── privacy.md                # LGPD, o que é processado e por quem
 25 | │   └── images/                   # diagrama, GIF da demo
 26 | │
 27 | ├── backend/
 28 | │   ├── pyproject.toml            # dependências, ruff e pytest configurados
 29 | │   ├── Dockerfile
 30 | │   ├── models/                   # vozes do Piper etc. (no .gitignore)
 31 | │   │
 32 | │   ├── app/
 33 | │   │   ├── main.py               # cria o app FastAPI
 34 | │   │   ├── config.py             # settings via variáveis de ambiente
 35 | │   │   │
 36 | │   │   ├── api/
 37 | │   │   │   ├── ws.py             # WebSocket de voz
 38 | │   │   │   ├── auth.py           # rotas do OAuth do Google
 39 | │   │   │   └── health.py         # healthcheck (útil em host gratuito)
 40 | │   │   │
 41 | │   │   ├── pipeline/
 42 | │   │   │   ├── orchestrator.py   # STT → LLM → tools → TTS
 43 | │   │   │   ├── session.py        # histórico e estado da conversa
 44 | │   │   │   └── metrics.py        # latência por etapa
 45 | │   │   │
 46 | │   │   ├── providers/            # tudo trocável por configuração
 47 | │   │   │   ├── base.py           # interfaces: STTProvider, LLMProvider, TTSProvider
 48 | │   │   │   ├── stt/
 49 | │   │   │   │   └── faster_whisper.py
 50 | │   │   │   ├── llm/
 51 | │   │   │   │   ├── gemini.py
 52 | │   │   │   │   ├── groq.py
 53 | │   │   │   │   └── ollama.py     # (claude.py entra como stretch goal)
 54 | │   │   │   └── tts/
 55 | │   │   │       └── piper.py
 56 | │   │   │
 57 | │   │   ├── tools/                # o que o agente consegue fazer
 58 | │   │   │   ├── base.py           # classe Tool: nome, schema, execute()
 59 | │   │   │   ├── registry.py       # registra e despacha as tools
 60 | │   │   │   ├── confirmation.py   # fluxo de confirmação antes de escrever
 61 | │   │   │   ├── tasks.py
 62 | │   │   │   ├── calendar.py
 63 | │   │   │   └── email.py
 64 | │   │   │
 65 | │   │   ├── integrations/
 66 | │   │   │   └── google/
 67 | │   │   │       ├── oauth.py
 68 | │   │   │       ├── calendar_client.py
 69 | │   │   │       └── gmail_client.py
 70 | │   │   │
 71 | │   │   ├── demo/                 # modo demo isolado do código real
 72 | │   │   │   ├── fixtures.py       # eventos, e-mails e tarefas fictícios
 73 | │   │   │   ├── fake_calendar.py
 74 | │   │   │   └── fake_email.py
 75 | │   │   │
 76 | │   │   ├── db/
 77 | │   │   │   ├── database.py       # conexão SQLite
 78 | │   │   │   ├── models.py
 79 | │   │   │   └── repository.py
 80 | │   │   │
 81 | │   │   └── prompts/
 82 | │   │       └── system_pt_br.md   # prompt do sistema versionado
 83 | │   │
 84 | │   └── tests/
 85 | │       ├── conftest.py
 86 | │       ├── unit/
 87 | │       │   ├── test_tasks_tool.py
 88 | │       │   ├── test_calendar_tool.py
 89 | │       │   ├── test_email_tool.py
 90 | │       │   └── test_confirmation.py
 91 | │       └── integration/
 92 | │           └── test_pipeline.py  # pipeline com providers falsos
 93 | │
 94 | ├── eval/
 95 | │   ├── commands.yaml             # ~20 comandos em pt-BR + tool esperada
 96 | │   ├── run_eval.py               # roda tudo e imprime a acurácia
 97 | │   └── results/                  # relatórios gerados
 98 | │
 99 | └── frontend/
100 |     ├── package.json
101 |     ├── vite.config.ts
102 |     ├── tsconfig.json
103 |     ├── index.html
104 |     └── src/
105 |         ├── main.tsx
106 |         ├── App.tsx
107 |         ├── components/
108 |         │   ├── PushToTalkButton.tsx
109 |         │   ├── Transcript.tsx
110 |         │   ├── StatusIndicator.tsx   # ouvindo / pensando / falando
111 |         │   ├── ConfirmationDialog.tsx
112 |         │   ├── LatencyPanel.tsx
113 |         │   └── DemoBanner.tsx
114 |         ├── hooks/
115 |         │   ├── useAudioRecorder.ts
116 |         │   ├── useAudioPlayer.ts
117 |         │   └── useVoiceSocket.ts
118 |         ├── lib/
119 |         │   ├── types.ts              # formato das mensagens do WebSocket
120 |         │   └── api.ts
121 |         └── styles/
122 | ```
123 | 
124 | ---
125 | 
126 | ## Decisões de organização
127 | 
128 | - **`providers/` separado de `pipeline/`:** o orquestrador só conhece as interfaces de `base.py`. Trocar Gemini por Groq vira uma mudança de configuração, e isso rende uma boa resposta em entrevista.
129 | - **`tools/` separado de `integrations/`:** a tool cuida da lógica do agente (schema, validação, confirmação), enquanto o cliente do Google cuida só de falar com a API. Assim você testa as tools com clientes falsos.
130 | - **`demo/` isolado:** o modo demo implementa a mesma interface das integrações reais, então o resto do código não precisa saber qual está ativo.
131 | - **`eval/` na raiz:** fica visível para o recrutador e mostra que você mede a qualidade do agente.
132 | - **`prompts/` em arquivos `.md`:** o prompt versionado no Git e fora do código Python facilita iterar e mostrar a evolução.
133 | 
134 | ---
135 | 
136 | ## Ordem de criação
137 | 
138 | ### Semana 1: núcleo de voz
139 | 
140 | - [ ] `backend/app/main.py`, `config.py`
141 | - [ ] `api/ws.py`
142 | - [ ] `providers/` (um de cada: STT, LLM, TTS)
143 | - [ ] `pipeline/` (orchestrator, session, metrics)
144 | - [ ] `tools/tasks.py` e `db/`
145 | - [ ] Frontend básico: `PushToTalkButton`, `useVoiceSocket`, `useAudioRecorder`
146 | 
147 | ### Semana 2: ferramentas e segurança
148 | 
149 | - [ ] `integrations/google/` (OAuth, calendar, gmail)
150 | - [ ] `tools/calendar.py`
151 | - [ ] `tools/email.py`
152 | - [ ] `tools/confirmation.py`
153 | - [ ] `demo/`
154 | - [ ] `ConfirmationDialog.tsx`
155 | 
156 | ### Semana 3: acabamento e entrega
157 | 
158 | - [ ] `tests/` (unit e integration)
159 | - [ ] `eval/` (commands.yaml e run_eval.py)
160 | - [ ] `LatencyPanel.tsx`
161 | - [ ] `.github/workflows/ci.yml`
162 | - [ ] `Dockerfile`
163 | - [ ] Toda a pasta `docs/` e o `README.md` final
164 | 


--------------------------------------------------------------------------------
/docs/escopo-assistente-de-voz.md:
--------------------------------------------------------------------------------
  1 | # Escopo do projeto: assistente de voz pessoal com ferramentas
  2 | 
  3 | > **Perfil:** vaga full-stack / engenheiro de IA · nível júnior · 2 a 3 semanas · Python · custo zero (somente planos gratuitos)
  4 | 
  5 | ---
  6 | 
  7 | ## 1. Visão geral
  8 | 
  9 | **O que é:** um assistente que você controla por voz no navegador. Você fala "o que tenho amanhã?", "cria uma tarefa para pagar o aluguel" ou "resume meus últimos e-mails", e ele executa a ação e responde falando.
 10 | 
 11 | **Por que funciona no portfólio:** mostra pipeline de áudio em tempo real, uso de LLM com function calling, integração com APIs reais (OAuth), backend em Python, frontend e deploy. É o que vagas de full-stack/IA pedem hoje.
 12 | 
 13 | **Objetivo mensurável:** um usuário consegue completar 3 fluxos (agenda, tarefas, e-mail) só por voz, com resposta em menos de ~2-3 s.
 14 | 
 15 | ---
 16 | 
 17 | ## 2. Escopo
 18 | 
 19 | ### Dentro do MVP
 20 | 
 21 | - Interface web com botão "segurar para falar" (push-to-talk), com transcrição e respostas visíveis na tela e faladas.
 22 | - **Agenda** (Google Calendar): listar eventos de hoje/amanhã/semana e criar evento.
 23 | - **Tarefas** (SQLite próprio): criar, listar e concluir.
 24 | - **E-mail** (Gmail, somente leitura + rascunho): resumir não lidos e criar rascunho de resposta. O agente **nunca envia** sozinho.
 25 | - Confirmação por voz antes de qualquer ação que altere dados ("Crio o evento às 15h, confirma?").
 26 | - Memória da conversa na sessão (contexto dos últimos turnos).
 27 | - **Modo demo** com dados fictícios, para recrutadores testarem sem login.
 28 | - Log de latência por etapa (STT, LLM, TTS), exibido na UI.
 29 | 
 30 | ### Fora do escopo (para não estourar o prazo)
 31 | 
 32 | - Ligações telefônicas, app mobile e multiusuário com contas próprias.
 33 | - Interrupção em tempo real (barge-in) e detecção automática de fim de fala (ficam como stretch goal).
 34 | - Envio automático de e-mails e exclusão de eventos.
 35 | 
 36 | ---
 37 | 
 38 | ## 3. Arquitetura
 39 | 
 40 | ```
 41 | Navegador (React)
 42 |   ├─ captura áudio (MediaRecorder / Web Audio)
 43 |   └─ WebSocket ──────────────┐
 44 |                              ▼
 45 |                    Backend (FastAPI, Python)
 46 |    áudio → STT → texto → LLM (+ tools) → texto → TTS → áudio
 47 |                              │
 48 |             ┌────────────────┼─────────────────┐
 49 |             ▼                ▼                 ▼
 50 |      Google Calendar     Gmail API      SQLite (tarefas,
 51 |                                         sessões, métricas)
 52 | ```
 53 | 
 54 | Um módulo de **tools** (funções Python com schema) fica separado do pipeline. O LLM decide qual função chamar, o backend executa, e o resultado volta ao LLM para formular a resposta falada.
 55 | 
 56 | ---
 57 | 
 58 | ## 4. Stack sugerida (100% gratuita)
 59 | 
 60 | | Camada | Escolha | Observação |
 61 | |---|---|---|
 62 | | Frontend | React + TypeScript (Vite) | Deploy gratuito em Vercel/Netlify. Mostra o lado full-stack. |
 63 | | Backend | FastAPI + WebSocket | Deploy em Render/Fly/Hugging Face Spaces. Planos free "dormem", então avise isso na demo. |
 64 | | STT | faster-whisper local (modelo base/small) ou Whisper via API com plano gratuito | Web Speech API do navegador como fallback. |
 65 | | LLM | Gemini ou Groq (Llama) com plano gratuito e function calling; Ollama local para desenvolver | O Claude via API é pago. Se quiser usá-lo, deixe como provider opcional na arquitetura. |
 66 | | TTS | Piper (open source, tem voz pt-BR) ou `speechSynthesis` do navegador | Piper soa melhor e é mais "portfólio". |
 67 | | Integrações | Google Calendar API e Gmail API | Gratuitas. Com o app OAuth em modo de teste, o token pode expirar em poucos dias. |
 68 | | Dados | SQLite | Simples e suficiente. |
 69 | | Qualidade | pytest, ruff, GitHub Actions | CI básico impressiona em júnior. |
 70 | 
 71 | > ⚠️ Limites e regras de planos gratuitos mudam com frequência. Confirme os limites atuais de cada serviço antes de fixar a escolha, e deixe o LLM/STT/TTS atrás de interfaces (`class LLMProvider`) para trocar sem reescrever o projeto. Isso também é ótimo argumento em entrevista.
 72 | 
 73 | ---
 74 | 
 75 | ## 5. Cronograma (3 semanas)
 76 | 
 77 | ### Semana 1: núcleo de voz
 78 | 
 79 | - [ ] Dias 1-2: backend FastAPI + WebSocket, frontend com gravação e envio de áudio.
 80 | - [ ] Dias 3-4: STT → LLM → TTS funcionando ponta a ponta, conversa simples.
 81 | - [ ] Dia 5: primeira tool (tarefas em SQLite) com function calling. Medição de latência.
 82 | 
 83 | ### Semana 2: ferramentas e segurança
 84 | 
 85 | - [ ] Dias 1-2: OAuth do Google + tool de agenda (listar e criar).
 86 | - [ ] Dias 3-4: tool de e-mail (resumo e rascunho) + fluxo de confirmação.
 87 | - [ ] Dia 5: modo demo com dados fictícios e tratamento de erros (API fora, áudio vazio, STT com baixa confiança).
 88 | 
 89 | ### Semana 3: acabamento e entrega
 90 | 
 91 | - [ ] Dias 1-2: polimento da UI (estados "ouvindo / pensando / falando", histórico, painel de latência) e testes.
 92 | - [ ] Dia 3: conjunto de avaliação com ~20 comandos e taxa de acerto das tools.
 93 | - [ ] Dia 4: deploy, CI e revisão de segurança.
 94 | - [ ] Dia 5: README, vídeo demo e post de divulgação.
 95 | 
 96 | **Regra de corte:** se atrasar, sacrifique o e-mail primeiro. Agenda + tarefas + voz bem feitos valem mais que três integrações pela metade.
 97 | 
 98 | ---
 99 | 
100 | ## 6. Requisitos não funcionais
101 | 
102 | - **Latência:** alvo de 2-3 s do fim da fala ao início da resposta (realista com planos gratuitos). Use streaming de texto do LLM para começar o TTS cedo.
103 | - **Segurança:** escopos OAuth mínimos, segredos em variáveis de ambiente, nada de credenciais no repositório, confirmação obrigatória para escritas.
104 | - **Privacidade (LGPD):** não gravar áudio em disco por padrão, aviso claro na tela de que a voz é processada por serviços externos, e logs sem conteúdo de e-mails.
105 | - **Robustez:** limite de tamanho de áudio, timeout por etapa e mensagens de erro faladas ("não consegui acessar sua agenda agora").
106 | 
107 | ---
108 | 
109 | ## 7. Testes e avaliação
110 | 
111 | - Testes unitários das tools (com APIs mockadas).
112 | - Um arquivo `eval/commands.yaml` com ~20 frases em pt-BR ("marca dentista sexta às 10", "o que eu tenho amanhã?") e a tool esperada. Um script roda tudo e imprime a acurácia.
113 | - Tabela de latência média por etapa no README.
114 | 
115 | Essa parte de avaliação é o que separa um projeto "de tutorial" de um projeto de engenheiro de IA.
116 | 
117 | ---
118 | 
119 | ## 8. Entregáveis do portfólio
120 | 
121 | 1. **Repositório** com README contendo: GIF ou vídeo de 60-90 s, diagrama de arquitetura, decisões técnicas (por que esse STT/LLM/TTS), métricas, limitações conhecidas e como rodar localmente.
122 | 2. **Demo online** em modo demo (sem login), mais um vídeo caso o servidor gratuito esteja dormindo.
123 | 3. **Post** no LinkedIn/GitHub contando o que você aprendeu e uma decisão difícil que tomou.
124 | 
125 | ---
126 | 
127 | ## 9. Riscos e mitigação
128 | 
129 | | Risco | Mitigação |
130 | |---|---|
131 | | Limite do plano gratuito estourar na demo | Modo demo com respostas em cache e fallback local (Ollama/Web Speech). |
132 | | STT errar em pt-BR com nomes e datas | Mostrar a transcrição na tela, permitir corrigir e incluir o caso na avaliação. |
133 | | OAuth do Google travar o cronograma | Fazer agenda e tarefas primeiro, com dados fake. Plugar o Google depois. |
134 | | Latência alta | Streaming, modelos menores, medir cada etapa antes de otimizar. |
135 | 
136 | ---
137 | 
138 | ## 10. Stretch goals (só se sobrar tempo)
139 | 
140 | - [ ] Detecção automática de fim de fala (Silero VAD) em vez de push-to-talk.
141 | - [ ] Interrupção do agente pelo usuário.
142 | - [ ] Provider alternativo (Claude) selecionável por configuração.
143 | - [ ] Busca na web como nova tool.
144 | 