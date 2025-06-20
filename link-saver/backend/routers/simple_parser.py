# backend/routers/simple_parser.py

from fastapi import APIRouter
from pydantic import BaseModel, HttpUrl
from bs4 import BeautifulSoup
import requests
from urllib.parse import urlparse
from ..services.ai import categorize_content


router = APIRouter(tags=["SimpleParser"])

PLACEHOLDER_IMAGE = "https://via.placeholder.com/150"

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

    # Default fallbacks (if anything goes wrong)
    title = url
    description = None
    image = PLACEHOLDER_IMAGE
    domain = urlparse(url).netloc

    try:
        resp = requests.get(url, timeout=5, headers={"User-Agent": "Mozilla/5.0"})
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")

        # 1) Title: og:title > <title> > URL
        og_title = soup.find("meta", property="og:title")
        if og_title and og_title.get("content"):
            title = og_title["content"].strip()
        elif soup.title and soup.title.string:
            title = soup.title.string.strip()

        # 2) Description: og:description > <meta name="description">
        og_desc = soup.find("meta", property="og:description")
        if og_desc and og_desc.get("content"):
            description = og_desc["content"].strip()
        else:
            name_desc = soup.find("meta", attrs={"name": "description"})
            if name_desc and name_desc.get("content"):
                description = name_desc["content"].strip()

        # 3) Image: og:image or placeholder
        og_image = soup.find("meta", property="og:image")
        if og_image and og_image.get("content"):
            image = og_image["content"].strip()

    except requests.RequestException:
        # Any network or HTTP error: stick with default fallbacks
        pass

    return SimpleParseResponse(
        title=title,
        description=description,
        image=image,
        domain=domain
    )
