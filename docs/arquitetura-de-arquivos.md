# Arquitetura de arquivos: assistente de voz pessoal

> Estrutura de pastas e arquivos do projeto, alinhada ao [escopo](./escopo-assistente-de-voz.md) e ao cronograma de 3 semanas.

---

## Estrutura

```
voice-assistant/
├── README.md
├── LICENSE
├── .gitignore
├── .env.example                  # todas as variáveis, sem valores reais
├── Makefile                      # make dev, make test, make eval, make lint
│
├── .github/
│   └── workflows/
│       └── ci.yml                # ruff + pytest + build do frontend
│
├── docs/
│   ├── architecture.md           # diagrama e fluxo de dados
│   ├── decisions.md              # por que esse STT/LLM/TTS (mini-ADRs)
│   ├── privacy.md                # LGPD, o que é processado e por quem
│   └── images/                   # diagrama, GIF da demo
│
├── backend/
│   ├── pyproject.toml            # dependências, ruff e pytest configurados
│   ├── Dockerfile
│   ├── models/                   # vozes do Piper etc. (no .gitignore)
│   │
│   ├── app/
│   │   ├── main.py               # cria o app FastAPI
│   │   ├── config.py             # settings via variáveis de ambiente
│   │   │
│   │   ├── api/
│   │   │   ├── ws.py             # WebSocket de voz
│   │   │   ├── auth.py           # rotas do OAuth do Google
│   │   │   └── health.py         # healthcheck (útil em host gratuito)
│   │   │
│   │   ├── pipeline/
│   │   │   ├── orchestrator.py   # STT → LLM → tools → TTS
│   │   │   ├── session.py        # histórico e estado da conversa
│   │   │   └── metrics.py        # latência por etapa
│   │   │
│   │   ├── providers/            # tudo trocável por configuração
│   │   │   ├── base.py           # interfaces: STTProvider, LLMProvider, TTSProvider
│   │   │   ├── stt/
│   │   │   │   └── faster_whisper.py
│   │   │   ├── llm/
│   │   │   │   ├── gemini.py
│   │   │   │   ├── groq.py
│   │   │   │   └── ollama.py     # (claude.py entra como stretch goal)
│   │   │   └── tts/
│   │   │       └── piper.py
│   │   │
│   │   ├── tools/                # o que o agente consegue fazer
│   │   │   ├── base.py           # classe Tool: nome, schema, execute()
│   │   │   ├── registry.py       # registra e despacha as tools
│   │   │   ├── confirmation.py   # fluxo de confirmação antes de escrever
│   │   │   ├── tasks.py
│   │   │   ├── calendar.py
│   │   │   └── email.py
│   │   │
│   │   ├── integrations/
│   │   │   └── google/
│   │   │       ├── oauth.py
│   │   │       ├── calendar_client.py
│   │   │       └── gmail_client.py
│   │   │
│   │   ├── demo/                 # modo demo isolado do código real
│   │   │   ├── fixtures.py       # eventos, e-mails e tarefas fictícios
│   │   │   ├── fake_calendar.py
│   │   │   └── fake_email.py
│   │   │
│   │   ├── db/
│   │   │   ├── database.py       # conexão SQLite
│   │   │   ├── models.py
│   │   │   └── repository.py
│   │   │
│   │   └── prompts/
│   │       └── system_pt_br.md   # prompt do sistema versionado
│   │
│   └── tests/
│       ├── conftest.py
│       ├── unit/
│       │   ├── test_tasks_tool.py
│       │   ├── test_calendar_tool.py
│       │   ├── test_email_tool.py
│       │   └── test_confirmation.py
│       └── integration/
│           └── test_pipeline.py  # pipeline com providers falsos
│
├── eval/
│   ├── commands.yaml             # ~20 comandos em pt-BR + tool esperada
│   ├── run_eval.py               # roda tudo e imprime a acurácia
│   └── results/                  # relatórios gerados
│
└── frontend/
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    ├── index.html
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── components/
        │   ├── PushToTalkButton.tsx
        │   ├── Transcript.tsx
        │   ├── StatusIndicator.tsx   # ouvindo / pensando / falando
        │   ├── ConfirmationDialog.tsx
        │   ├── LatencyPanel.tsx
        │   └── DemoBanner.tsx
        ├── hooks/
        │   ├── useAudioRecorder.ts
        │   ├── useAudioPlayer.ts
        │   └── useVoiceSocket.ts
        ├── lib/
        │   ├── types.ts              # formato das mensagens do WebSocket
        │   └── api.ts
        └── styles/
```

---

## Decisões de organização

- **`providers/` separado de `pipeline/`:** o orquestrador só conhece as interfaces de `base.py`. Trocar Gemini por Groq vira uma mudança de configuração, e isso rende uma boa resposta em entrevista.
- **`tools/` separado de `integrations/`:** a tool cuida da lógica do agente (schema, validação, confirmação), enquanto o cliente do Google cuida só de falar com a API. Assim você testa as tools com clientes falsos.
- **`demo/` isolado:** o modo demo implementa a mesma interface das integrações reais, então o resto do código não precisa saber qual está ativo.
- **`eval/` na raiz:** fica visível para o recrutador e mostra que você mede a qualidade do agente.
- **`prompts/` em arquivos `.md`:** o prompt versionado no Git e fora do código Python facilita iterar e mostrar a evolução.

---

## Ordem de criação

### Semana 1: núcleo de voz

- [ ] `backend/app/main.py`, `config.py`
- [ ] `api/ws.py`
- [ ] `providers/` (um de cada: STT, LLM, TTS)
- [ ] `pipeline/` (orchestrator, session, metrics)
- [ ] `tools/tasks.py` e `db/`
- [ ] Frontend básico: `PushToTalkButton`, `useVoiceSocket`, `useAudioRecorder`

### Semana 2: ferramentas e segurança

- [ ] `integrations/google/` (OAuth, calendar, gmail)
- [ ] `tools/calendar.py`
- [ ] `tools/email.py`
- [ ] `tools/confirmation.py`
- [ ] `demo/`
- [ ] `ConfirmationDialog.tsx`

### Semana 3: acabamento e entrega

- [ ] `tests/` (unit e integration)
- [ ] `eval/` (commands.yaml e run_eval.py)
- [ ] `LatencyPanel.tsx`
- [ ] `.github/workflows/ci.yml`
- [ ] `Dockerfile`
- [ ] Toda a pasta `docs/` e o `README.md` final
