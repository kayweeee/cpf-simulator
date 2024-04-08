from pydantic import BaseModel
from typing import List

class UserBase(BaseModel):
    email: str
    access_rights: str
    name: str

class UserEmailInput(BaseModel):
    email: str

