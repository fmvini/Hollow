from google import genai
from app import config
from google.genai import types
from pathlib import Path

client = genai.Client(
    api_key=config.GEMINI_API_KEY
)

def load_system_prompt() -> str:
    prompt_path = Path(__file__).resolve().parents[2] / "prompts" / "system_pt_br.md"

    with open(prompt_path, "r", encoding="utf-8") as file:
        return file.read()

SYSTEM_PROMPT = load_system_prompt()

async def generate_response(text: str) -> str:
    response = await client.aio.models.generate_content(
        model='gemini-3.5-flash-lite',
        contents=text,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT
        )
    )
    return response.text

