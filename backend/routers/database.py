from fastapi import APIRouter, HTTPException
from backend.apps.supabase.supabase import get_table_data, initialize_supabase

router = APIRouter()

@router.on_event("startup")
async def startup_event():
    await initialize_supabase()

@router.get("/test_database")
async def get_table(table_name: str):
    try:
        return await get_table_data(table_name)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))