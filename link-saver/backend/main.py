# main.py

from fastapi import FastAPI
from . import models                # import the models so Base knows them
from .database import engine, Base # engine connects to Postgres, Base is your model base class
from .routers import links,auth  
from fastapi.middleware.cors import CORSMiddleware 



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
Base.metadata.create_all(bind=engine)

# 3. 
# Register your router under /links
app.include_router(links.router, prefix="/links", tags=["Links"])
app.include_router(auth.router, prefix="/auth", tags=["Auth"]) 

# 4. Health check route (test it in browser or Postman)
@app.get("/")
def read_root():
    return {"message": "Link Saver API is up!"}
