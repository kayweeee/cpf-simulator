from fastapi import FastAPI, Depends, status, HTTPException
from sqlalchemy.orm  import Session
from models import UserModel, SchemaModel
from session import create_session, engine
from schemas import UserBase, SchemaBase
from config import Base

app = FastAPI()

Base.metadata.create_all(bind=engine)


# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

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

@app.get("/schema/{user_id}", status_code=status.HTTP_201_CREATED)
async def read_schema(user_id: int, db: Session = Depends(create_session)):
    db_schema = db.query(SchemaModel).filter(SchemaModel.user_id == user_id).first()
    if db_schema is None:
        raise HTTPException(status_code=404, detail="User schema not found")
    return db_schema

@app.post("/schema", status_code=status.HTTP_201_CREATED)
async def create_schema(schema: SchemaBase , db: Session = Depends(create_session)):
    db_schema = SchemaModel(**schema.dict())
    db.add(db_schema)
    db.commit()
