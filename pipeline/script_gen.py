import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

def generate_script(topic):
    """Generates a video script based on the topic."""
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY not found in environment variables")
    
    genai.configure(api_key=api_key)
    # Using gemini-2.5-flash to avoid rate limits
    model = genai.GenerativeModel('gemini-2.5-flash')
    
    prompt = f"""
    Create a highly engaging, concise YouTube Shorts script for the topic: "{topic}".
    The script should be about 60 seconds long when read aloud.
    Format the output as JSON with the following structure:
    {{
        "title": "A catchy title",
        "scenes": [
            {{
                "id": 1,
                "text": "The spoken words for this scene",
                "visual_keyword": "A keyword to search for stock footage for this scene"
            }},
            ...
        ]
    }}
    Provide only the JSON.
    """
    
    response = model.generate_content(prompt)
    return response.text
