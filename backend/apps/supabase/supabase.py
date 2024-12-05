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
    

async def get_column(table_name: str, column_name: str):
    try:
        if client is None:
            raise ValueError("Client is not initialized")
        response = await client.table(table_name).select(column_name).execute()
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

async def get_row(table_name: str, column_name: str, column_value: str):
    try:
        if client is None:
            raise ValueError("Client is not initialized")
        response = await client.table(table_name).select("*").eq(column_name, column_value).execute()
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))    

    
async def insert_data(table_name: str, data: dict):
    try:
        if client is None:
            raise ValueError("Client is not initialized")
        response = await client.table(table_name).insert(data).execute()
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
async def update_data(table_name: str, data: dict, column_name: str, column_value: str):
    try:
        if client is None:
            raise ValueError("Client is not initialized")
        response = await client.table(table_name).update(data).eq(column_name, column_value).execute()
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))