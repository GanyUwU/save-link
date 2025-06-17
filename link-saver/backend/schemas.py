# backend/schemas.py

from pydantic import BaseModel, EmailStr
from typing import Optional, List


# -----------------------------
# Link Schemas
# -----------------------------
class LinkCreate(BaseModel):
    url: str


class LinkResponse(BaseModel):
    id: int
    url: str
    title: Optional[str] = None
    image_url: Optional[str] = None
    domain: Optional[str] = None

    class Config:
        from_attributes = True  # Pydantic v2: use attributes from ORM models


class LinkUpdate(BaseModel):
    url: Optional[str] = None
    title: Optional[str] = None
    image_url: Optional[str] = None
    domain: Optional[str] = None


# -----------------------------
# User Schemas
# -----------------------------
class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True


# -----------------------------
# Auth Token Schemas
# -----------------------------
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    sub: Optional[str] = None
