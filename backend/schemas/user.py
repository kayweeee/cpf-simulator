from pydantic import BaseModel
from typing import List

class UserBase(BaseModel):
    email: str
    access_rights: str
    name: str

class UserEmailInput(BaseModel):
    email: str

class UserResponseSchema(BaseModel):
    uuid: str
    email: str
    name: str
    access_rights: str
    schemes: List[str]
