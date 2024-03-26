from pydantic import BaseModel

class QuestionBase(BaseModel):
    question_difficulty: str
    question_details: str
    scheme_name: str
    