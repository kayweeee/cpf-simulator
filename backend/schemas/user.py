from pydantic import BaseModel
from typing import List

class UserBase(BaseModel):
    access_rights: str
    team_id: int



