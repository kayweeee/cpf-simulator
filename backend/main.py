from fastapi import FastAPI, Depends
from sqlalchemy.orm  import sessionmaker, Session
from typing import Annotated
import models.user as user
from database.database import engine, SessionLocal
from pydantic import BaseModel

app = FastAPI()

user.Base.metadata.create_all(bind=engine)

class UserBase(BaseModel):
    uuid: str
    access_rights: str
    scheme_id: str
    
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated(Session, Depends(get_db))

@app.post("/users/", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserBase, db: db_dependency):
    db_user = user.User(**user.dict())
    db.add(user)
    db.commit