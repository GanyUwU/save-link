# # backend/routers/parser.py

# from fastapi import APIRouter
# from pydantic import BaseModel, HttpUrl
# import requests
# from bs4 import BeautifulSoup
# import tldextract
# import yt_dlp
# from ..services.ai import summarize_text

# router = APIRouter(tags=["Parser"])

# class ParseRequest(BaseModel):
#     url: HttpUrl

# class ParseResponse(BaseModel):
#     title: str
#     image: str | None
#     domain: str
#     summary: str | None

# def parse_youtube(url: str):
#     try:
#         with yt_dlp.YoutubeDL({"quiet": True, "skip_download": True}) as ydl:
#             info = ydl.extract_info(url, download=False)
#             return {
#                 "title": info.get("title"),
#                 "image": info.get("thumbnail"),
#                 "domain": "youtube.com",
#                 "description": info.get("description", "")[:500]
#             }
#     except Exception as e:
#         print("YouTube parsing error:", e)
#         return None

# @router.post("/parse", response_model=ParseResponse)
# def parse_url(payload: ParseRequest):
#     url = str(payload.url)
#     ext = tldextract.extract(url)
#     domain = f"{ext.domain}.{ext.suffix}" if ext.suffix else ext.domain

#     # 🎥 YouTube handling
#     if "youtube.com" in url or "youtu.be" in url:
#         yt = parse_youtube(url)
#         if yt:
#             try:
#                 summary = summarize_text(yt["description"])
#             except Exception as e:
#                 print("Summarization failed:", e)
#                 summary = yt["description"]
#             return ParseResponse(
#                 title=yt["title"],
#                 image=yt["image"],
#                 domain=yt["domain"],
#                 summary=summary
#             )

#     # 🌐 Website / Open Graph parsing
#     try:
#         response = requests.get(url, timeout=6, headers={
#             "User-Agent": "Mozilla/5.0"
#         })
#         response.raise_for_status()
#     except requests.RequestException:
#         return ParseResponse(title=url, image=None, domain=domain, summary=None)

#     soup = BeautifulSoup(response.text, 'html.parser')

#     # Title
#     og_title = soup.find("meta", property="og:title")
#     title = og_title['content'].strip() if og_title and og_title.get('content') else (
#         soup.title.string.strip() if soup.title and soup.title.string else url
#     )

#     # Image
#     og_image = soup.find("meta", property="og:image")
#     image = og_image['content'].strip() if og_image and og_image.get('content') else None

#     # Description
#     og_desc = soup.find("meta", property="og:description")
#     description = og_desc['content'].strip() if og_desc and og_desc.get('content') else ""

#     if not description:
#         paragraphs = soup.find_all("p")
#         description = " ".join(p.get_text(strip=True) for p in paragraphs[:3])[:600]

#     # Summarize
#     try:
#         summary = summarize_text(f"{title}. {description}")
#     except Exception as e:
#         print("Summarization failed:", e)
#         summary = description if description else None

#     return ParseResponse(title=title, image=image, domain=domain, summary=summary)

# backend/routers/parser.py

# from fastapi import APIRouter
# from pydantic import BaseModel, HttpUrl
# from bs4 import BeautifulSoup
# import requests
# import tldextract
# from urllib.parse import urlparse, parse_qs
# from yt_dlp import YoutubeDL
# from ..services.ai import summarize_text, categorize_content

# router = APIRouter(tags=["Parser"])

# class ParseRequest(BaseModel):
#     url: HttpUrl

# class ParseResponse(BaseModel):
#     title: str
#     image: str | None
#     domain: str
#     summary: str | None
#     tags: list[str]

# def parse_youtube(url: str):
#     with YoutubeDL({"quiet": True, "skip_download": True}) as ydl:
#         info = ydl.extract_info(url, download=False)
#         return {
#             "title": info.get("title"),
#             "image": info.get("thumbnail"),
#             "description": info.get("description", "")
#         }

# @router.post("/parse", response_model=ParseResponse)
# def parse_url(payload: ParseRequest):
#     url = str(payload.url)
#     ext = tldextract.extract(url)
#     domain = f"{ext.domain}.{ext.suffix}" if ext.suffix else ext.domain

#     # 1) YouTube
#     if "youtube.com" in url or "youtu.be" in url:
#         yt = parse_youtube(url)
#         title, image, desc = yt["title"], yt["image"], yt["description"][:2000]
#         summary = None
#         try: summary = summarize_text(desc)
#         except: pass
#         tags = []
#         try: tags = categorize_content(desc)
#         except: pass

#         return ParseResponse(
#             title=title, image=image, domain=domain,
#             summary=summary, tags=tags
#         )

#     # 2) General website
#     try:
#         resp = requests.get(url, timeout=6, headers={"User-Agent":"Mozilla/5.0"})
#         resp.raise_for_status()
#     except:
#         return ParseResponse(
#             title=url, image=None, domain=domain,
#             summary=None, tags=[]
#         )

#     soup = BeautifulSoup(resp.text, "html.parser")

#     # Title
#     t = soup.find("meta", property="og:title") or soup.title
#     title = (t.get("content") if t.has_attr("content") else t.string) if t else url
#     title = title.strip() if title else url

#     # Image
#     img = soup.find("meta", property="og:image")
#     image = img.get("content").strip() if img and img.get("content") else None

#     # Description
#     desc_tag = soup.find("meta", property="og:description")
#     description = desc_tag.get("content").strip() if desc_tag and desc_tag.get("content") else ""
#     if not description:
#         # fallback on first several paragraphs
#         paras = soup.find_all("p")
#         text_chunks, total = [], 0
#         for p in paras:
#             t = p.get_text().strip()
#             if t:
#                 text_chunks.append(t)
#                 total += len(t)
#             if total > 2000 or len(text_chunks) >= 7:
#                 break
#         description = " ".join(text_chunks)

#     combined = f"{title}\n\n{description}"
#     summary = None
#     try: summary = summarize_text(combined)
#     except: pass

#     tags = []
#     try: tags = categorize_content(combined)
#     except: pass

#     return ParseResponse(
#         title=title, image=image, domain=domain,
#         summary=summary, tags=tags
#     )

# backend/routers/parser.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, HttpUrl
import requests
from bs4 import BeautifulSoup
import tldextract
from ..services.ai import summarize_text

router = APIRouter(tags=["Parser"])

class ParseRequest(BaseModel):
    url: HttpUrl

class ParseResponse(BaseModel):
    title: str
    image: str | None
    domain: str
    summary: str | None

@router.post("/parse", response_model=ParseResponse)
def parse_url(payload: ParseRequest):
    url = str(payload.url)
    # Extract domain
    ext = tldextract.extract(url)
    domain = f"{ext.domain}.{ext.suffix}" if ext.suffix else ext.domain

    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        html = response.text
    except requests.RequestException:
        # Fallback if fetch fails
        return ParseResponse(title=url, image=None, domain=domain, summary=None)

    soup = BeautifulSoup(html, 'html.parser')

    # Extract title: prefer og:title, otherwise <title>
    og_title = soup.find('meta', property='og:title')
    title = og_title['content'].strip() if og_title and og_title.get('content') else (
        soup.title.string.strip() if soup.title and soup.title.string else url
    )

    # Extract description: prefer og:description
    og_desc = soup.find('meta', property='og:description')
    description = og_desc['content'].strip() if og_desc and og_desc.get('content') else None

    # Extract image: og:image
    og_image = soup.find('meta', property='og:image')
    image = og_image['content'].strip() if og_image and og_image.get('content') else None

    # Generate summary via LLM if description exists, otherwise use title
    text_for_summary = description if description else title
    try:
        summary = summarize_text(text_for_summary)
    except Exception:
        summary = None

    return ParseResponse(title=title, image=image, domain=domain, summary=summary)
