from pydantic import BaseModel
from schema.scheme import SchemeBase

class UserBase(BaseModel):
    uuid: int
    access_rights: str
    team_id: int
    scheme: SchemeBase



