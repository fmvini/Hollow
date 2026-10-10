import asyncio

from app.providers.llm.gemini import create_chat, generate_response


async def main():
    chat = create_chat()

    response = await generate_response(
        chat,
        "Responda apenas: Hollow funcionando"
    )

    print(response)


asyncio.run(main())