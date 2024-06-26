from pydantic import BaseModel

class QuestionBase(BaseModel):
    title: str 
    question_difficulty: str
    question_details: str
    ideal: str
    scheme_name: str
    ideal_system_name: str
    ideal_system_url: str
    