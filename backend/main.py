from fastapi import FastAPI, Depends, status, HTTPException
from sqlalchemy.orm  import Session
from models.user import UserModel
from models.attempt import AttemptModel
from models.scheme import SchemeModel
from session import create_session, engine
from schemas.attempt import AttemptBase
from schemas.user import UserBase, UserEmailInput
from schemas.scheme import SchemeBase
from config import Base
from sqlalchemy import func
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
# Base.metadata.drop_all(bind=engine, checkfirst=False)
Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://example.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

### USER ROUTES ###

@app.post("/login", status_code=200)
async def read_user(user_input: UserEmailInput, db: Session = Depends(create_session)):
    email = user_input.email
    db_user = db.query(UserModel).filter(UserModel.email == email).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    # Query the schemes associated with the user
    db_schemes = db.query(SchemeModel).filter(SchemeModel.user_id == db_user.uuid).all()
    db_user.schemes = db_schemes
    return db_user

@app.get("/user/{user_id}", status_code=status.HTTP_201_CREATED)
async def read_user(user_id:str, db: Session = Depends(create_session)):
    db_user = db.query(UserModel).filter(UserModel.uuid == user_id).first()
    # db_schemes = db.query(SchemeModel).filter(SchemeModel.user_id == user_id).all
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
        # Query the schemes associated with the user
    db_schemes = db.query(SchemeModel).filter(SchemeModel.user_id == user_id).all()
    db_user.schemes = db_schemes
    return db_user

@app.post("/user/", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserBase, db: Session = Depends(create_session)):
    db_user = UserModel(**user.dict())
    db.add(db_user)
    db.commit()

### SCHEME ROUTES ###
    
@app.get("/scheme/{user_id}", status_code=status.HTTP_201_CREATED)
async def read_schema(user_id: str, db: Session = Depends(create_session)):
    db_scheme = db.query(SchemeModel).filter(SchemeModel.user_id == user_id).all()
    if db_scheme is None:
        raise HTTPException(status_code=404, detail="User schema not found")
    return db_scheme

@app.post("/scheme", status_code=status.HTTP_201_CREATED)
async def create_scheme(scheme: SchemeBase , db: Session = Depends(create_session)):
    user_id = scheme.user_id
    # Check if the user exists
    db_user = db.query(UserModel).filter(UserModel.uuid == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    # Create and add the SchemeModel instance
    db_scheme_data = scheme.dict()
    db_scheme_data.pop("user_id")  # Remove user_id from scheme data
    db_scheme = SchemeModel(**db_scheme_data, user=db_user)  # Assign user object to relationship
    db.add(db_scheme)
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

@app.get("/attempt/user/{user_id}/average_scores", status_code=200)
async def get_user_average_scores(user_id: str, db: Session = Depends(create_session)):
    attempts = db.query(
        func.avg(AttemptModel.precision_score),
        func.avg(AttemptModel.accuracy_score),
        func.avg(AttemptModel.tone_score)
    ).filter(AttemptModel.user_id == user_id).first()

    if not attempts:
        raise HTTPException(status_code=404, detail="Attempts not found")

    precision_score_avg, accuracy_score_avg, tone_score_avg = attempts

    return {
        "precision_score_avg": precision_score_avg,
        "accuracy_score_avg": accuracy_score_avg,
        "tone_score_avg": tone_score_avg
    }