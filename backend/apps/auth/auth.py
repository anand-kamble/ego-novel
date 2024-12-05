

from backend.apps.supabase.supabase import get_column, insert_data, get_row
from backend.types import user
from backend.types.user import User
from datetime import datetime

from backend.utils.constants import USERS_TABLE_NAME, USERS_TABLE_USERNAME_COLUMN

async def check_username_exits(username:str) -> bool:
    usernames = await get_column(USERS_TABLE_NAME,USERS_TABLE_USERNAME_COLUMN)
    print("usernames", usernames.data)
    if usernames.data is None or len(usernames.data) == 0:
        return False
    for user in usernames.data:
        print("user", user)
        if user["username"] == username:
            return True
    return False


async def register_user(email: str, password: str, username:str, firstname:str, lastname:str):
    time = datetime.now().strftime("%Y-%m-%d %H:%M:%S%z")
    
    username_exists =  await check_username_exits(username)
    
    if not username_exists:
        user: User = {
            "email": email,
            "password": password,
            "username": username,
            "created_at": time,
            "firstname": firstname,
            "lastname": lastname
        }
        response = await insert_data(USERS_TABLE_NAME, user)
        return response  
    else:
        return {"error": "Username already taken"}
    

async def login_user(username: str, password: str):
    username_exists = await check_username_exits(username)
    if username_exists:
        
        res = await get_row(USERS_TABLE_NAME, USERS_TABLE_USERNAME_COLUMN, username)
        user = res.data[0]
        
        if user["password"] == password:
            return {"user": user}
        else:
            return {"error": "Incorrect password"}
    else:
        return {"error": "Username does not exist"}