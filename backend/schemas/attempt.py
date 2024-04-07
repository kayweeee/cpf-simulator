from pydantic import BaseModel

class AttemptBase(BaseModel):
    user_id: str
    question_id: str
    answer: str
    

