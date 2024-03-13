from sqlalchemy import Integer, Column, String
from sqlalchemy.orm import Mapped
from config import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class ScoreModel(Base):
    __tablename__ = "score"
    score_id: Mapped[str] = Column(String(255), primary_key=True, default=generate_uuid)
    attempt_id: Mapped[str] = Column(String(255), nullable=False)
    precision_score: Mapped[int] = Column(Integer, nullable=False)
    accuracy_score: Mapped[int] = Column(Integer, nullable=False)
    tone_score: Mapped[int] = Column(Integer, nullable=False)
    feedback: Mapped[str] = Column(String(255), nullable=False)