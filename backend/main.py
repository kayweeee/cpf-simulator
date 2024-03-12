from fastapi import FastAPI, Depends, status, HTTPException
from sqlalchemy.orm  import Session
from models import UserModel, SchemeModel, AttemptModel, ScoreModel
from session import create_session, engine
from schemas import UserBase, SchemeBase, AttemptBase, ScoreBase
from config import Base

app = FastAPI()

Base.metadata.create_all(bind=engine)

### USER ROUTES ###

@app.get("/user/{user_id}", status_code=status.HTTP_201_CREATED)
async def read_user(user_id:str, db: Session = Depends(create_session)):
    db_user = db.query(UserModel).filter(UserModel.uuid == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.post("/user/", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserBase, db: Session = Depends(create_session)):
    db_user = UserModel(**user.dict())
    db.add(db_user)
    db.commit()

### SCHEME ROUTES ###
    
@app.get("/schema/{user_id}", status_code=status.HTTP_201_CREATED)
async def read_schema(user_id: int, db: Session = Depends(create_session)):
    db_schema = db.query(SchemeModel).filter(SchemeModel.user_id == user_id).first()
    if db_schema is None:
        raise HTTPException(status_code=404, detail="User schema not found")
    return db_schema

@app.post("/schema", status_code=status.HTTP_201_CREATED)
async def create_schema(schema: SchemeBase , db: Session = Depends(create_session)):
    db_schema = SchemeModel(**schema.dict())
    db.add(db_schema)
    db.commit()

## ATTEMPT ROUTES ##
    
@app.get("/attempt/{attempt_id}", status_code=status.HTTP_201_CREATED)
async def read_attempt(attempt_id: str, db: Session = Depends(create_session)):
    db_schema = db.query(AttemptModel).filter(AttemptModel.attempt_id == attempt_id).first()
    if db_schema is None:
        raise HTTPException(status_code=404, detail="Attempt not found")
    return db_schema

@app.post("/attempt/", status_code=status.HTTP_201_CREATED)
async def create_attempt(schema: AttemptBase , db: Session = Depends(create_session)):
    db_schema = AttemptModel(**schema.dict())
    db.add(db_schema)
    db.commit()

@app.get("/attempt/user/{user_id}", status_code=status.HTTP_201_CREATED)
async def get_user_attempts(user_id: str, db: Session = Depends(create_session)):
    db_user = db.query(AttemptModel).filter(AttemptModel.user_id == user_id).all()
    if db_user is None:
        raise HTTPException(status_code=404, detail="Attempts not found")
    return db_user    

## SCORE ROUTES ##
    
@app.get("/score/{score_id}", status_code=status.HTTP_201_CREATED)
async def read_score(score_id: str, db: Session = Depends(create_session)):
    db_schema = db.query(ScoreModel).filter(ScoreModel.score_id == score_id).first()
    if db_schema is None:
        raise HTTPException(status_code=404, detail="Attempt not found")
    return db_schema

@app.post("/score/", status_code=status.HTTP_201_CREATED)
async def create_score(schema: ScoreBase , db: Session = Depends(create_session)):
    db_schema = ScoreModel(**schema.dict())
    db.add(db_schema)
    db.commit()
