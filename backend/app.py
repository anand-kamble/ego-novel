from fastapi import FastAPI
from .routers import database_router, user_router, stories_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# For development purposes, we allow all origins
origins: list[str] = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(database_router)
app.include_router(user_router)
app.include_router(stories_router)

@app.get("/")
def read_root():
    return {"Hello": "World"}

