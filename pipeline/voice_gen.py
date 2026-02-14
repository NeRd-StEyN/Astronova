import edge_tts
import asyncio
import os

async def generate_voiceover(text, output_path, voice="en-US-AndrewNeural"):
    """Generates a voiceover file from text using edge-tts."""
    communicate = edge_tts.Communicate(text, voice)
    await communicate.save(output_path)
    return output_path

def run_generate_voiceover(text, output_path, voice="en-US-AndrewNeural"):
    """Wrapper to run the async voiceover generation."""
    asyncio.run(generate_voiceover(text, output_path, voice))
    return output_path
