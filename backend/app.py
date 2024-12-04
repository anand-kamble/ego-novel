from fastapi import FastAPI
from .routers import database_router

app = FastAPI()

app.include_router(database_router)

@app.get("/")
def read_root():
    return {"Hello": "World"}

