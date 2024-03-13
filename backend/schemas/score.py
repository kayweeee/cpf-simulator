from pydantic import BaseModel

class ScoreBase(BaseModel):
    attempt_id: str
    precision_score: int
    accuracy_score: int
    tone_score: int
    feedback: str