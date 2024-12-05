from typing import Optional, TypedDict


class User(TypedDict):
    username: str
    email: str
    password: str
    created_at: str
    firstname: str
    lastname: str
    