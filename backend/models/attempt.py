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
    ##foreign key but question model not created yet
    question_id: Mapped[int] = Column(Integer, nullable=False)
    answer: Mapped[str] = Column(String(255), nullable=False)
    date: Mapped[DateTime] = Column(DateTime, server_default=func.now(), nullable=False)
    # scores
    precision_score: Mapped[int] = Column(Integer, nullable=False)
    accuracy_score: Mapped[int] = Column(Integer, nullable=False)
    tone_score: Mapped[int] = Column(Integer, nullable=False)
    feedback: Mapped[str] = Column(String(255), nullable=False)