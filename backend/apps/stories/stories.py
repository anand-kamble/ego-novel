

from datetime import datetime, timezone
from backend.apps.supabase.supabase import get_row, insert_data, update_data
from backend.types.stories import Story, StoryBase
from backend.utils.constants import STORY_BASE_TABLE_NAME, STORY_TABLE_NAME
import uuid

async def add_base_story(content: str, title: str,version:int,username:str,id:str):
    time = datetime.now(timezone.utc)
    story = {
        'content': content,
        'created_at': time.strftime(("%Y-%m-%d %H:%M:%S%z")),
        'title': title,
        'version': version,
        'username':username,
        'story_id':id
    }
    
    response = await insert_data(STORY_BASE_TABLE_NAME, story)
    return response
    


async def add_user_story(username: str):
    
    new_story = {
        "archived": False,
        "published": False,
        "published_version": 0,
        "username": username,
        "version": 0,
        "story_id": str(uuid.uuid4()),
        "title": "Untitled",
    }
    
    response = await insert_data(STORY_TABLE_NAME, new_story )
    if response:
        await add_base_story("", "", 0, username, new_story['story_id'])
    
    return response

async def get_story_version(story_id:str):
    res = await get_row(STORY_BASE_TABLE_NAME, "story_id", story_id)
    return res
    
    
async def get_user_stories(username:str):
    res = await get_row(STORY_TABLE_NAME, "username", username)
    return res

async def update_story_title(title:str, story_id:str):
    res = await update_data(STORY_TABLE_NAME, {"title":title}, "story_id", story_id)
    return res