from pydantic import BaseModel
from typing import List

class SchemeBase(BaseModel):
    user_id: str
    scheme_name: str

class SchemeInput(BaseModel):
    user_id: str
    schemesList: List[str]