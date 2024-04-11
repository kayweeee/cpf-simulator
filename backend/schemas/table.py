from pydantic import BaseModel


class TableBase(BaseModel):
    scheme_name: str
    user_id: str
    