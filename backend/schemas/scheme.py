from pydantic import BaseModel

class SchemeBase(BaseModel):
    user_id: str
    scheme_no: int