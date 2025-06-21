
from pydantic import BaseModel, EmailStr
from typing import Optional, List


class LinkCreate(BaseModel):
    url: str


class LinkResponse(BaseModel):
    id: int
    url: str
    title: Optional[str] = None
    image_url: Optional[str] = None
    domain: Optional[str] = None
    summary: Optional[str] = None
    description:str | None
    tags:    List[str]= [] 

    class Config:
        from_attributes = True  


class LinkUpdate(BaseModel):
    url: Optional[str] = None
    title: Optional[str] = None
    image_url: Optional[str] = None
    domain: Optional[str] = None
    summary: Optional[str]     = None
    tags: Optional[List[str]]  = None 


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    sub: Optional[str] = None
