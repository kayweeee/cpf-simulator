from sqlalchemy import Integer, Column, ForeignKey, String
from sqlalchemy.orm import Mapped, relationship
from config import Base
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class SchemeModel(Base):
    __tablename__ = "user_scheme"
    scheme_id: Mapped[str] = Column(String(255), primary_key=True,  default = generate_uuid)
    user_id: Mapped[str] = Column(String(255), ForeignKey("user.uuid"), nullable=False )
    user: Mapped["UserModel"] = relationship("UserModel", back_populates="schemes")
    scheme_no: Mapped[int] = Column(Integer, nullable=False )
