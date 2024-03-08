from fastapi import FastApi, Depends
from sqlalchemy.orm  import sessionmaker, Session
from typing import Annotated
from database import get_db

app = FastApi()

db_dependency = Annotated(Session, Depends(get_db))