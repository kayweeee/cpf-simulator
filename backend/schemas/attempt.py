from pydantic import BaseModel

class AttemptBase(BaseModel):
    user_id: str
    question_id: int
    answer: str
    precision_score: int
    accuracy_score: int
    tone_score: int
    feedback: str