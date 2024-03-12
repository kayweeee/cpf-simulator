from sqlalchemy import Integer, String, Column, DateTime, func, ForeignKey
from sqlalchemy.orm import Mapped
from config import Base
import datetime
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class UserModel(Base):
    __tablename__ = "user"
    uuid: Mapped[str] = Column(String(255), primary_key=True, default=generate_uuid())
    access_rights: Mapped[str] = Column(String(255), nullable=False)
    team_id: Mapped[int] = Column(Integer, nullable=False)
    scheme_id: Mapped[int] = Column(Integer, nullable=True)

class SchemeModel(Base):
    __tablename__ = "user_schema"
    scheme_id: Mapped[str] = Column(String(255), primary_key=True, default=generate_uuid())
    user_id: Mapped[str] = Column(String(255), ForeignKey("user.uuid"), nullable=False)
    scheme_one: Mapped[int] = Column(Integer, nullable=False)
    scheme_two: Mapped[int] = Column(Integer, nullable=False)
    scheme_three: Mapped[int] = Column(Integer, nullable=False)
    scheme_four: Mapped[int] = Column(Integer, nullable=False)
    scheme_five: Mapped[int] = Column(Integer, nullable=False)

class AttemptModel(Base):
    __tablename__ = "attempt"
    attempt_id: Mapped[str] = Column(String(255), primary_key=True, default=generate_uuid())
    user_id: Mapped[str] = Column(String(255), ForeignKey("user.uuid"), nullable=False)
    ##foreign key but question model not created yet
    question_id: Mapped[int] = Column(Integer, nullable=False)
    ## also foreign key but confused
    scores_id: Mapped[int] = Column(Integer, nullable=False)
    answer: Mapped[str] = Column(String(255), nullable=False)
    date: Mapped[datetime.datetime] = Column(DateTime, server_default=func.now(), nullable=False)

class ScoreModel(Base):
    __tablename__ = "score"
    score_id: Mapped[str] = Column(String(255), primary_key=True, default=generate_uuid())
    attempt_id: Mapped[int] = Column(Integer, nullable=False)

    precision_score: Mapped[int] = Column(Integer, nullable=False)
    accuracy_score: Mapped[int] = Column(Integer, nullable=False)
    tone_score: Mapped[int] = Column(Integer, nullable=False)
    feedback: Mapped[str] = Column(String(255), nullable=False)
