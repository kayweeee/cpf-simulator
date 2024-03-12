from pydantic import BaseModel

class SchemeBase(BaseModel):
    scheme_id: int
    user_id: int
    scheme_one: int
    scheme_two: int
    scheme_three: int
    scheme_four: int
    scheme_five: int