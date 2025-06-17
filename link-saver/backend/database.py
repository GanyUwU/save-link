# database.py

import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from pathlib import Path

# 1. Load environment variables from .env
load_dotenv(dotenv_path=Path(__file__).resolve().parent / ".env")  

# 2. Read the DATABASE_URL variable
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set in .env")

# 3. Create the SQLAlchemy engine
#    echo=True will print all SQL statements to the console for debugging
engine = create_engine(DATABASE_URL, echo=True)

# 4. Create a configured "Session" class
SessionLocal = sessionmaker(
    autocommit=False,  # you decide when to commit
    autoflush=False,   # you decide when to flush
    bind=engine        # bind this session to our engine
)

# 5. Base class for our ORM models
Base = declarative_base()

# 6. Dependency function for FastAPI to yield a DB session
def get_db():
    """
    FastAPI dependency: yields a SQLAlchemy session and ensures it’s closed after use.
    Usage in a route:
        def my_route(db: Session = Depends(get_db)):
            ...
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
