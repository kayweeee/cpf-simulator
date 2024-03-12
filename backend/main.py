from fastapi import FastAPI, Depends, status, HTTPException
from sqlalchemy.orm  import Session
from models.user import UserModel

from database.database import engine, SessionLocal, Base
from pydantic import BaseModel
from session import create_session

app = FastAPI()

Base.metadata.create_all(bind=engine)

class UserBase(BaseModel):
    uuid: int
    team_id: int
    access_rights: str
    scheme_id: int
    
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/user/", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserBase, db: Session = Depends(create_session)):
    db_user = UserModel(**user.dict())
    db.add(db_user)
    db.commit()

@app.get("/user/{user_id}", status_code=status.HTTP_201_CREATED)
async def read_user(user_id:int, db: Session = Depends(create_session)):
    db_user = db.query(UserModel).filter(UserModel.uuid == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user