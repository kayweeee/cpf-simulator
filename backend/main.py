from fastapi import FastAPI, Depends, status, HTTPException
from sqlalchemy.orm  import Session
from sqlalchemy import select, distinct
from models.user import UserModel
from models.attempt import AttemptModel
from models.scheme import SchemeModel
from models.question import QuestionModel
from session import create_session, engine
from schemas.attempt import AttemptBase
from schemas.user import UserBase
from schemas.scheme import SchemeBase
from schemas.question import QuestionBase
from config import Base

app = FastAPI()
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

### USER ROUTES ###

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
async def get_scheme(user_id: str, db: Session = Depends(create_session)):
    db_scheme = db.query(SchemeModel).filter(SchemeModel.user_id == user_id).all()
    if db_scheme is None:
        raise HTTPException(status_code=404, detail="User schema not found")
    return db_scheme


@app.post("/scheme", status_code=status.HTTP_201_CREATED)
async def add_user_to_scheme(scheme: SchemeBase, db: Session = Depends(create_session)):
    # Check if the scheme with the provided scheme_name exists
    db_scheme = db.query(SchemeModel).filter(SchemeModel.scheme_name == scheme.scheme_name).first()
    
    if db_scheme:
        # If the scheme exists, add the user to it
        user = db.query(UserModel).filter(UserModel.uuid == scheme.user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Add the user to the scheme
        db_scheme.users.append(user)
        db.commit()
    else:
        # If the scheme doesn't exist, create a new scheme and add the user to it

        user = db.query(UserModel).filter(UserModel.uuid == scheme.user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        new_scheme = SchemeModel(scheme_name=scheme.scheme_name, users=[user], user_id=user.uuid)
        db.add(new_scheme)
        db.commit()
    

@app.get("/scheme", status_code=status.HTTP_201_CREATED)
async def get_scheme_names(db: Session = Depends(create_session)):
    # Query for scheme names
    print(db.query((SchemeModel)).all())
    print(db.query(distinct(SchemeModel.scheme_name)).all())
    schemes= db.query(distinct(SchemeModel.scheme_name)).all()
    
    # If no scheme names are found, raise an HTTPException with status code 404
    if not schemes:
        raise HTTPException(status_code=404, detail="No scheme names found")
    print(schemes)
    # Extract the scheme names from the query results
    scheme_name_list = [scheme_name[0] for scheme_name in schemes]
    
    return scheme_name_list

## QUESTION ROUTES ##
# /question/{scheme_no} Get all questions of a specific scheme. Filter question by scheme
@app.get("/question/{scheme_name}", status_code=status.HTTP_201_CREATED)
async def get_scheme_question(scheme_name: str, db: Session = Depends(create_session)):
    db_question = db.query(QuestionModel).filter(QuestionModel.scheme == scheme_name).all()
    if db_question is None:
        raise HTTPException(status_code=404, detail="User schema not found")
    return db_question

# /questions/schemes Get number of questions in each scheme
# /questions add question 


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