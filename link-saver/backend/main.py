# main.py

from fastapi import FastAPI
from . import models                # import the models so Base knows them
from .database import engine, Base # engine connects to Postgres, Base is your model base class
from .routers import links 

# 1. Create tables in Postgres (ONLY needed once per new DB or schema change)
Base.metadata.create_all(bind=engine)

# 2. Create the FastAPI app instance
app = FastAPI()

# 3. 
# Register your router under /links
app.include_router(links.router, prefix="/links", tags=["Links"])

# 4. Health check route (test it in browser or Postman)
@app.get("/")
def read_root():
    return {"message": "Link Saver API is up!"}
