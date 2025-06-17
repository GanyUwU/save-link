# schemas.py

from pydantic import BaseModel
from typing import Optional


# Used to validate incoming POST request for creating a new link
class LinkCreate(BaseModel):
    url: str


# Used to format the API response when returning a link
class LinkResponse(BaseModel):
    id: int
    url: str
    title: Optional[str] = None
    image_url: Optional[str] = None
    domain: Optional[str] = None



    class Config:
            orm_mode = True  # allows compatibility with SQLAlchemy models

class LinkUpdate(BaseModel):
    url: Optional[str] = None
    title: Optional[str] = None
    image_url: Optional[str] = None
    domain: Optional[str] = None
