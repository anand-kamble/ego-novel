from fastapi import APIRouter, HTTPException

from backend.apps.auth.auth import register_user, login_user
from backend.types.user import User

router = APIRouter()

@router.post("/register")
async def register(user:User):
    response = await register_user(email=user['email'], password=user['password'], username=user['username'], firstname=user['firstname'], lastname=user['lastname'])
    return response

@router.post("/login")
async def login(body:dict):
    
    response = await login_user(body['username'], body['password'])
    
    return response