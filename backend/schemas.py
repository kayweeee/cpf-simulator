from pydantic import BaseModel

class UserBase(BaseModel):
    access_rights: str
    team_id: int
    scheme_id: int

class SchemeBase(BaseModel):
    user_id: str
    scheme_one: int
    scheme_two: int
    scheme_three: int
    scheme_four: int
    scheme_five: int

class AttemptBase(BaseModel):
    user_id: str
    question_id: int
    scores_id: int
    answer: str
    
class ScoreBase(BaseModel):
    attempt_id: int
    precision_score: int
    accuracy_score: int
    tone_score: int
    feedback: str