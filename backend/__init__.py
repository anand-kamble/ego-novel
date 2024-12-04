from .app import app
import uvicorn

def start():
    print("Starting backend")
    uvicorn.run(app, host="127.0.0.1", port=8000)