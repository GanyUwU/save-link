from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func,Text
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id            = Column(Integer, primary_key=True, index=True)
    email         = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at    = Column(DateTime(timezone=True), server_default=func.now())

 
    links = relationship("Link", back_populates="owner", cascade="all, delete-orphan")
    


class Link(Base):
    __tablename__ = "links"
    id         = Column(Integer, primary_key=True, index=True)
    user_id    = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    url        = Column(String, nullable=False)
    title      = Column(String, nullable=True)
    image_url  = Column(String, nullable=True)
    domain     = Column(String, nullable=True)
    description= Column(Text,   nullable=True)
    tags       = Column(ARRAY(String), nullable=False, default=[])
    summary = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    

   
    owner = relationship("User", back_populates="links")
