# main.py

from fastapi import FastAPI
from . import models                # import the models so Base knows them
from .routers import links,auth  
from fastapi.middleware.cors import CORSMiddleware 
from backend.database import Base, engine
from .routers.simple_parser import router as simple_parser_router



# 2. Create the FastAPI app instance
app = FastAPI()

origins = [
    "http://localhost:5173",   # your React dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Create tables in Postgres (ONLY needed once per new DB or schema change)
# Step 2: Recreate it from models

Base.metadata.create_all(bind=engine)


# 3. 
# Register your router under /links
app.include_router(links.router, tags=["Links"])
app.include_router(auth.router, prefix="/auth", tags=["Auth"]) 
#app.include_router(parser.router, prefix="/utils", tags=["Parser"])
app.include_router(simple_parser_router, prefix="/utils", tags=["SimpleParser"])


# 4. Health check route (test it in browser or Postman)
@app.get("/")
def read_root():
    return {"message": "Link Saver API is up!"}
