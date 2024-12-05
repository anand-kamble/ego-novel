from fastapi import APIRouter, HTTPException

from backend.apps.stories.stories import add_user_story, add_base_story, get_story_version, get_user_stories
from backend.types.stories import Story


router = APIRouter()

@router.post("/create_story")
async def create_story(username: str):
    response = await add_user_story(username)
    print(response)
    return response

@router.get("/update_story")
async def update_story(content:str, title:str, version:int,story_id:str, username:str):
    res = await add_base_story(content, title, version, username, story_id)
    return res


@router.get("/get_version")
async def get_version(story_id:str):
    res = await get_story_version(story_id)
    return res

@router.get("/get_user_stories")
async def user_stories(username:str):
    res = await get_user_stories(username)
    return res