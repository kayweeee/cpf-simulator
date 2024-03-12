from fastapi import FastAPI, Depends, status, HTTPException
from sqlalchemy.orm  import sessionmaker, Session
from typing import Annotated
# import models.user as user
import models
from database.database import engine, SessionLocal
from pydantic import BaseModel

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

class UserBase(BaseModel):
    uuid: int
    access_rights: str
    team_id: int
    scheme_id: int
    
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/user/", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserBase, db: Session = Depends(get_db)):
    db_user = models.UserModel(**user.dict())
    db.add(db_user)
    db.commit()

@app.get("/user/{user_id}", status_code=status.HTTP_201_CREATED)
async def read_user(user_id:int, db: Session = Depends(get_db)):
    db_user = db.query(models.UserModel).filter(models.UserModel.uuid == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user