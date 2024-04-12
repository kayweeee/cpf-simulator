from sqlalchemy import Integer, Column, ForeignKey, String
from sqlalchemy.orm import Mapped, relationship
from config import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class QuestionModel(Base):
    __tablename__ = "question"
    question_id: Mapped[str] = Column(String(255), primary_key=True, default=generate_uuid)
    question_index: Mapped[int] = Column(Integer, autoincrement=True, nullable=False)
    question_difficulty: Mapped[str] = Column(String(50), nullable=False )
    question_details: Mapped[str] = Column(String(3000), nullable=False )
    ideal: Mapped[str] = Column(String(3000), nullable=False)
    title: Mapped[str] = Column(String(255), nullable=False)
    scheme_name: Mapped[str] = Column(String(255), ForeignKey("scheme.scheme_name"), nullable=False)
    scheme: Mapped["SchemeModel"] = relationship("SchemeModel", back_populates="questions")
    
    def to_dict(self):
        return {
            'question_id': self.question_id,
            'question_index': self.question_index,
            'question_difficulty': self.question_difficulty,
            'ideal': self.ideal,
            'title': self.title,
            'scheme_name': self.scheme,
            # 'scheme': self.scheme
        }
    
    