import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def summarize_text(text: str) -> str | None:
    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        chat = model.start_chat()
        prompt = f"Summarize this content in 1-2 sentences:\n\n{text}"
        response = chat.send_message(prompt)
        return response.text.strip()
    except Exception as e:
        print("Summary error:", e)
        return None

def categorize_content(text: str) -> list[str]:
    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        prompt = (
            "Categorize this content into ONLY these categories: "
            "Image, Video, News, Blog, Music, Social Media Post. "
            "Return 1-3 relevant category names as a comma-separated list. "
            f"\n\nContent:\n{text[:3000]}"
        )
        response = model.generate_content(prompt)
        raw = response.text.strip()
        valid = {"Image", "Video", "News", "Blog", "Music", "Social Media Post"}
        return [tag.strip() for tag in raw.split(",") if tag.strip() in valid]
    except Exception as e:
        print("Categorization error:", e)
        return []
