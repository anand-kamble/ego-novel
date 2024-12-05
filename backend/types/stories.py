
from typing import List, Optional, TypedDict

from backend.types.user import User


class StoryBase(TypedDict):
    title: str
    content: str
    created_at: str

class Story(TypedDict):
    version: List[StoryBase]
    archived: bool
    published: bool
    published_version: Optional[int]
    user: User
    id: int
    
    