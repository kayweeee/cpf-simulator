from sqlalchemy import Integer, Column, ForeignKey, String, DateTime, func, String
from sqlalchemy.orm import Mapped
from config import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())


class AttemptModel(Base):
    __tablename__ = "attempt"
    attempt_id: Mapped[str] = Column(String(255), primary_key=True, default=generate_uuid)
    user_id: Mapped[str] = Column(String(255), ForeignKey("user.uuid"), nullable=False)
    question_id: Mapped[int] = Column(String(255), ForeignKey("question.question_id"), nullable=False)
    answer: Mapped[str] = Column(String(3000), nullable=False)
    date: Mapped[DateTime] = Column(DateTime, default=func.now(), nullable=False)
    # scores
    precision_score: Mapped[int] = Column(Integer, nullable=False)
    accuracy_score: Mapped[int] = Column(Integer, nullable=False)
    tone_score: Mapped[int] = Column(Integer, nullable=False)
    accuracy_feedback: Mapped[str] = Column(String(1000), nullable=False)
    precision_feedback: Mapped[int] = Column(String(1000), nullable=False)
    tone_feedback: Mapped[str] = Column(String(1000), nullable=False)
    feedback: Mapped[str] = Column(String(3000), nullable=False)