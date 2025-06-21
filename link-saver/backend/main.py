
from fastapi import FastAPI
from .routers import links,auth  
from fastapi.middleware.cors import CORSMiddleware 
from backend.database import Base, engine
from .routers.simple_parser import router as simple_parser_router



app = FastAPI()

origins = [
    "http://localhost:5173",   
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


app.include_router(links.router, tags=["Links"])
app.include_router(auth.router, prefix="/auth", tags=["Auth"]) 
app.include_router(simple_parser_router, prefix="/utils", tags=["SimpleParser"])

@app.get("/")
def read_root():
    return {"message": "Link Saver API is up!"}
