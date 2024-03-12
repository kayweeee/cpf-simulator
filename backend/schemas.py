from pydantic import BaseModel

class UserBase(BaseModel):
    uuid: int
    access_rights: str
    team_id: int
    scheme_id: int

class SchemaBase(BaseModel):
    scheme_id: int
    user_id: int
    scheme_one: int
    scheme_two: int
    scheme_three: int
    scheme_four: int
    scheme_five: int

class AttemptBase(BaseModel):
    attempt_id: int
    user_id: int
    question_id: int
    scores_id: int
    answer: str
    
class ScoreBase(BaseModel):
    score_id: int
    attempt_id: int
    precision_score: int
    accuracy_score: int
    tone_score: int
    feedback: str