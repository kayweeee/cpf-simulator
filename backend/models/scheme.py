from sqlalchemy import Integer, Column, ForeignKey, String,  Table
from sqlalchemy.orm import Mapped, relationship
from config import Base
import uuid
from models.association_tables import user_scheme_association

# def generate_uuid():
#     return str(uuid.uuid4())

class SchemeModel(Base):
    __tablename__ = "scheme"
    # scheme_id: Mapped[str] = Column(String(255), primary_key=True,  default = generate_uuid)
    scheme_name: Mapped[str] = Column(String(255), primary_key=True, nullable=False )
    user_id: Mapped[str] = Column(String(255), ForeignKey("user.uuid"), nullable=False )
    users: Mapped[list["UserModel"]] = relationship("UserModel", secondary=user_scheme_association, back_populates="scheme")
    questions: Mapped[list["QuestionModel"]] = relationship("QuestionModel", back_populates="scheme")
