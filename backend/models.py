from sqlalchemy import Integer, String, Column
from sqlalchemy.orm import Mapped
from config import Base

class UserModel(Base):
    __tablename__ = "user"
    uuid: Mapped[int] = Column(Integer, primary_key=True)
    access_rights: Mapped[str] = Column(String(255), nullable=False)
    team_id: Mapped[int] = Column(Integer, nullable=False)
    # scheme_id: Mapped[List] = Column(List(String(255)), nullable=True)
    scheme_id: Mapped[int] = Column(Integer, nullable=True)

class SchemaModel(Base):
    __tablename__ = "user_schema"
    scheme_id: Mapped[int] = Column(Integer, primary_key=True)
    user_id: Mapped[int] = Column(Integer, nullable=False)
    scheme_one: Mapped[int] = Column(Integer, nullable=False)
    scheme_two: Mapped[int] = Column(Integer, nullable=False)
    scheme_three: Mapped[int] = Column(Integer, nullable=False)
    scheme_four: Mapped[int] = Column(Integer, nullable=False)
    scheme_five: Mapped[int] = Column(Integer, nullable=False)
