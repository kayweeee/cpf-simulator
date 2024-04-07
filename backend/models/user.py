from sqlalchemy import Integer, String, Column
from typing import List
from sqlalchemy.orm import Mapped, relationship
from config import Base
from models.scheme import SchemeModel
import uuid
from models.association_tables import user_scheme_association

def generate_uuid():
    print(uuid.uuid4())
    return str(uuid.uuid4())

class UserModel(Base):
    __tablename__ = "user"
    uuid: Mapped[str] = Column(String(255), primary_key=True, default=generate_uuid)
    email: Mapped[str] = Column(String(255), nullable=False)
    access_rights: Mapped[str] = Column(String(255), nullable=False)
    team_id: Mapped[int] = Column(Integer, nullable=False)
    
    # relationships
    scheme: Mapped[list[SchemeModel]] = relationship(SchemeModel, secondary=user_scheme_association, back_populates="users")

