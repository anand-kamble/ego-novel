from fastapi import APIRouter, HTTPException

from backend.apps.stories.stories import add_user_story, add_base_story, get_story_version, get_user_stories, update_story_title
from backend.types.stories import Story


router = APIRouter()

@router.post("/create_story")
async def create_story(body: dict):
    response = await add_user_story(body['username'])
    print(response)
    return response

@router.post("/update_story")
async def update_story(body:dict):
    res = await add_base_story(
        body['content'], 
        body['title'], 
        body['version'], 
        body['username'], 
        body['story_id'])
    return res


@router.post("/get_version")
async def get_version(body:dict):
    res = await get_story_version(body['story_id'])
    return res


@router.post("/get_user_stories")
async def user_stories(body:dict):
    res = await get_user_stories(body['username'])
    return res

@router.post("/update_story_title")
async def story_title_update(body:dict):
    res = await update_story_title(body['title'], body['story_id'])
    return res