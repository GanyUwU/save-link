from fastapi import APIRouter
from pydantic import BaseModel, HttpUrl
from bs4 import BeautifulSoup
import requests
from urllib.parse import urlparse
from ..services.ai import categorize_content, summarize_text  

router = APIRouter(tags=["SimpleParser"])

PLACEHOLDER_IMAGE = "../assets/placeholder-image.png"


class SimpleParseRequest(BaseModel):
    url: HttpUrl

class SimpleParseResponse(BaseModel):
    title: str
    description: str | None
    image: str
    domain: str
    summary: str | None
    tags: list[str] = [] 

@router.post("/parse-simple", response_model=SimpleParseResponse)
def parse_simple(payload: SimpleParseRequest):
    url = str(payload.url)

   
    title = url
    description = None
    image = PLACEHOLDER_IMAGE
    domain = urlparse(url).netloc
    summary = None
    tags = []

    try:
        resp = requests.get(url, timeout=5, headers={"User-Agent": "Mozilla/5.0"})
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")

        
        og_title = soup.find("meta", property="og:title")
        if og_title and og_title.get("content"):
            title = og_title["content"].strip()
        elif soup.title and soup.title.string:
            title = soup.title.string.strip()

       
        og_desc = soup.find("meta", property="og:description")
        if og_desc and og_desc.get("content"):
            description = og_desc["content"].strip()
        else:
            name_desc = soup.find("meta", attrs={"name": "description"}) 
            if name_desc and name_desc.get("content")or len(name_desc) > 0:
                description = name_desc["content"].strip()

        
        og_image = soup.find("meta", property="og:image")
        if og_image and og_image.get("content"):
            image = og_image["content"].strip()

     
        if title or description:
            try:
                summary = summarize_text(f"{title}. {description or ''}")
            except Exception as e:
                print("Summary error:", e)
                summary = None
                
        try:
            tags = categorize_content(f"{title}. {summary or ''}")
        except Exception as e:
            print("tags error:", e)
            tags = []
    except requests.RequestException:
        pass
   
    return SimpleParseResponse(
        title=title,
        description=description,
        image=image,
        domain=domain,
        summary=summary,
        tags=tags )
