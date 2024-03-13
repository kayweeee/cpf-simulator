from sqlalchemy import Integer, String, Column
from typing import List
from sqlalchemy.orm import Mapped, relationship
from config import Base
from models.scheme import SchemeModel
import uuid

def generate_uuid():
    return str(uuid.uuid4())

class UserModel(Base):
    __tablename__ = "user"
    uuid: Mapped[str] = Column(String(255), primary_key=True, default=generate_uuid)
    access_rights: Mapped[str] = Column(String(255), nullable=False)
    team_id: Mapped[int] = Column(Integer, nullable=False)
    schemes: Mapped[list["SchemeModel"]] = relationship("SchemeModel", back_populates="user" )

