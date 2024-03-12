from sqlalchemy import Integer, String, Column, DateTime
from typing import List
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from database.database import Base
from datetime import datetime

class UserModel(Base):
    __tablename__ = "user"
    uuid: Mapped[int] = Column(Integer, primary_key=True)
    access_rights: Mapped[str] = Column(String(255), nullable=False)
    team_id: Mapped[int] = Column(Integer, nullable=False)
    # scheme_id: Mapped[List] = Column(List(String(255)), nullable=True)
    scheme_id: Mapped[int] = Column(Integer, nullable=True)