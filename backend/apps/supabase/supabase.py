from email.policy import HTTP
import os
from fastapi import HTTPException
from supabase._async.client import create_client, AsyncClient
from dotenv import load_dotenv

load_dotenv("../.env")

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")





client = None
async def get_client():
    global client
    if not client:
        if not url or not key:
            raise ValueError("Missing SUPABASE_URL or SUPABASE_KEY")
        client = await create_client(url, key)
    return client


async def initialize_supabase():
    await get_client()


async def get_table_data(table_name: str):
    try:
        if client is None:
            raise ValueError("Client is not initialized")
        response = await client.table(table_name).select("*").execute()
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))