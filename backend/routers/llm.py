from fastapi import APIRouter, HTTPException

from backend.apps.llm.llm import generate_next_sentence, translate
from backend.apps.stories.stories import add_user_story, add_base_story, get_story_version, get_user_stories
from backend.types.stories import Story


router = APIRouter()

@router.post("/complete_story")
async def complete_story(body: dict):
    res = generate_next_sentence(body['story_id'], body['content'], body['title'], body['model'])
    return res

@router.post("/translate_story")
async def translate_story(body: dict):
    res = translate(body['content'], body['model'],body['language'])
    return res