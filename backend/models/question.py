from sqlalchemy import Integer, Column, ForeignKey, String
from sqlalchemy.orm import Mapped, relationship
from config import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class QuestionModel(Base):
    __tablename__ = "question"
    question_id: Mapped[str] = Column(String(255), primary_key=True,  default = generate_uuid)
    
    question_difficulty: Mapped[str] = Column(String(50), nullable=False )
    question_details: Mapped[str] = Column(String(255), nullable=False )
    
    scheme_name: Mapped[str] = Column(String(255), ForeignKey("scheme.scheme_name"), nullable=False)
    scheme: Mapped["SchemeModel"] = relationship("SchemeModel", back_populates="questions")