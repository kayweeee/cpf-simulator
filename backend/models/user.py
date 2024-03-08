from sqlalchemy import Integer, String, Column
from typing import List
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from database import Base



class UserModel(Base):
    __tablename__ = "users"
    uuid: Mapped[str] = Column(String(255), primary_key=True)
    access_rights: Mapped[str] = Column(String(255), nullable=False)
    last_name: Mapped[str] = Column(String(255), nullable=False)
    scheme_id: Mapped[List] = Column(List(String(255)), nullable=True)
