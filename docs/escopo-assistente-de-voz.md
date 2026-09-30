# Escopo do projeto: assistente de voz pessoal com ferramentas

> **Perfil:** vaga full-stack / engenheiro de IA · nível júnior · 2 a 3 semanas · Python · custo zero (somente planos gratuitos)

---

## 1. Visão geral

**O que é:** um assistente que você controla por voz no navegador. Você fala "o que tenho amanhã?", "cria uma tarefa para pagar o aluguel" ou "resume meus últimos e-mails", e ele executa a ação e responde falando.

**Por que funciona no portfólio:** mostra pipeline de áudio em tempo real, uso de LLM com function calling, integração com APIs reais (OAuth), backend em Python, frontend e deploy. É o que vagas de full-stack/IA pedem hoje.

**Objetivo mensurável:** um usuário consegue completar 3 fluxos (agenda, tarefas, e-mail) só por voz, com resposta em menos de ~2-3 s.

---

## 2. Escopo

### Dentro do MVP

- Interface web com botão "segurar para falar" (push-to-talk), com transcrição e respostas visíveis na tela e faladas.
- **Agenda** (Google Calendar): listar eventos de hoje/amanhã/semana e criar evento.
- **Tarefas** (SQLite próprio): criar, listar e concluir.
- **E-mail** (Gmail, somente leitura + rascunho): resumir não lidos e criar rascunho de resposta. O agente **nunca envia** sozinho.
- Confirmação por voz antes de qualquer ação que altere dados ("Crio o evento às 15h, confirma?").
- Memória da conversa na sessão (contexto dos últimos turnos).
- **Modo demo** com dados fictícios, para recrutadores testarem sem login.
- Log de latência por etapa (STT, LLM, TTS), exibido na UI.

### Fora do escopo (para não estourar o prazo)

- Ligações telefônicas, app mobile e multiusuário com contas próprias.
- Interrupção em tempo real (barge-in) e detecção automática de fim de fala (ficam como stretch goal).
- Envio automático de e-mails e exclusão de eventos.

---

## 3. Arquitetura

```
Navegador (React)
  ├─ captura áudio (MediaRecorder / Web Audio)
  └─ WebSocket ──────────────┐
                             ▼
                   Backend (FastAPI, Python)
   áudio → STT → texto → LLM (+ tools) → texto → TTS → áudio
                             │
            ┌────────────────┼─────────────────┐
            ▼                ▼                 ▼
     Google Calendar     Gmail API      SQLite (tarefas,
                                        sessões, métricas)
```

Um módulo de **tools** (funções Python com schema) fica separado do pipeline. O LLM decide qual função chamar, o backend executa, e o resultado volta ao LLM para formular a resposta falada.

---

## 4. Stack sugerida (100% gratuita)

| Camada | Escolha | Observação |
|---|---|---|
| Frontend | React + TypeScript (Vite) | Deploy gratuito em Vercel/Netlify. Mostra o lado full-stack. |
| Backend | FastAPI + WebSocket | Deploy em Render/Fly/Hugging Face Spaces. Planos free "dormem", então avise isso na demo. |
| STT | faster-whisper local (modelo base/small) ou Whisper via API com plano gratuito | Web Speech API do navegador como fallback. |
| LLM | Gemini ou Groq (Llama) com plano gratuito e function calling; Ollama local para desenvolver | O Claude via API é pago. Se quiser usá-lo, deixe como provider opcional na arquitetura. |
| TTS | Piper (open source, tem voz pt-BR) ou `speechSynthesis` do navegador | Piper soa melhor e é mais "portfólio". |
| Integrações | Google Calendar API e Gmail API | Gratuitas. Com o app OAuth em modo de teste, o token pode expirar em poucos dias. |
| Dados | SQLite | Simples e suficiente. |
| Qualidade | pytest, ruff, GitHub Actions | CI básico impressiona em júnior. |

> ⚠️ Limites e regras de planos gratuitos mudam com frequência. Confirme os limites atuais de cada serviço antes de fixar a escolha, e deixe o LLM/STT/TTS atrás de interfaces (`class LLMProvider`) para trocar sem reescrever o projeto. Isso também é ótimo argumento em entrevista.

---

## 5. Cronograma (3 semanas)

### Semana 1: núcleo de voz

- [ ] Dias 1-2: backend FastAPI + WebSocket, frontend com gravação e envio de áudio.
- [ ] Dias 3-4: STT → LLM → TTS funcionando ponta a ponta, conversa simples.
- [ ] Dia 5: primeira tool (tarefas em SQLite) com function calling. Medição de latência.

### Semana 2: ferramentas e segurança

- [ ] Dias 1-2: OAuth do Google + tool de agenda (listar e criar).
- [ ] Dias 3-4: tool de e-mail (resumo e rascunho) + fluxo de confirmação.
- [ ] Dia 5: modo demo com dados fictícios e tratamento de erros (API fora, áudio vazio, STT com baixa confiança).

### Semana 3: acabamento e entrega

- [ ] Dias 1-2: polimento da UI (estados "ouvindo / pensando / falando", histórico, painel de latência) e testes.
- [ ] Dia 3: conjunto de avaliação com ~20 comandos e taxa de acerto das tools.
- [ ] Dia 4: deploy, CI e revisão de segurança.
- [ ] Dia 5: README, vídeo demo e post de divulgação.

**Regra de corte:** se atrasar, sacrifique o e-mail primeiro. Agenda + tarefas + voz bem feitos valem mais que três integrações pela metade.

---

## 6. Requisitos não funcionais

- **Latência:** alvo de 2-3 s do fim da fala ao início da resposta (realista com planos gratuitos). Use streaming de texto do LLM para começar o TTS cedo.
- **Segurança:** escopos OAuth mínimos, segredos em variáveis de ambiente, nada de credenciais no repositório, confirmação obrigatória para escritas.
- **Privacidade (LGPD):** não gravar áudio em disco por padrão, aviso claro na tela de que a voz é processada por serviços externos, e logs sem conteúdo de e-mails.
- **Robustez:** limite de tamanho de áudio, timeout por etapa e mensagens de erro faladas ("não consegui acessar sua agenda agora").

---

## 7. Testes e avaliação

- Testes unitários das tools (com APIs mockadas).
- Um arquivo `eval/commands.yaml` com ~20 frases em pt-BR ("marca dentista sexta às 10", "o que eu tenho amanhã?") e a tool esperada. Um script roda tudo e imprime a acurácia.
- Tabela de latência média por etapa no README.

Essa parte de avaliação é o que separa um projeto "de tutorial" de um projeto de engenheiro de IA.

---

## 8. Entregáveis do portfólio

1. **Repositório** com README contendo: GIF ou vídeo de 60-90 s, diagrama de arquitetura, decisões técnicas (por que esse STT/LLM/TTS), métricas, limitações conhecidas e como rodar localmente.
2. **Demo online** em modo demo (sem login), mais um vídeo caso o servidor gratuito esteja dormindo.
3. **Post** no LinkedIn/GitHub contando o que você aprendeu e uma decisão difícil que tomou.

---

## 9. Riscos e mitigação

| Risco | Mitigação |
|---|---|
| Limite do plano gratuito estourar na demo | Modo demo com respostas em cache e fallback local (Ollama/Web Speech). |
| STT errar em pt-BR com nomes e datas | Mostrar a transcrição na tela, permitir corrigir e incluir o caso na avaliação. |
| OAuth do Google travar o cronograma | Fazer agenda e tarefas primeiro, com dados fake. Plugar o Google depois. |
| Latência alta | Streaming, modelos menores, medir cada etapa antes de otimizar. |

---

## 10. Stretch goals (só se sobrar tempo)

- [ ] Detecção automática de fim de fala (Silero VAD) em vez de push-to-talk.
- [ ] Interrupção do agente pelo usuário.
- [ ] Provider alternativo (Claude) selecionável por configuração.
- [ ] Busca na web como nova tool.
