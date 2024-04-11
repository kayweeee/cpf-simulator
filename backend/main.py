from fastapi import FastAPI, Depends, status, HTTPException, responses, File, UploadFile
from sqlalchemy.orm  import Session, joinedload
from sqlalchemy import select, distinct
from models.user import UserModel
from models.attempt import AttemptModel
from models.scheme import SchemeModel
from models.question import QuestionModel
from session import create_session, engine
from schemas.attempt import AttemptBase
from schemas.user import UserBase, UserEmailInput, UserResponseSchema
from schemas.scheme import SchemeBase, SchemeInput
from schemas.question import QuestionBase
from config import Base, config
from sqlalchemy import func
from fastapi.middleware.cors import CORSMiddleware
from ML.openAI import process_response, openAI_response
import shutil
import uuid
import os

app = FastAPI()
# Base.metadata.drop_all(bind=engine)
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
        raise HTTPException(status_code=404, detail= "User not found")

    return db_user

@app.get("/user", status_code=status.HTTP_201_CREATED)
async def get_all_users(db: Session = Depends(create_session)):
    users = db.query(UserModel).options(joinedload(UserModel.scheme)).all()

    # If no users are found, raise an HTTPException with status code 404
    if not users:
        raise HTTPException(status_code=404, detail="No users found")
    
    user_responses = []
    for user in users:
        schemes = [scheme.scheme_name for scheme in user.scheme]
        user_response = UserResponseSchema(
            uuid=user.uuid,
            email=user.email,
            name=user.name,
            access_rights=user.access_rights,
            schemes=schemes
        )
        user_responses.append(user_response)
    
    return user_responses

@app.get("/user/{user_id}", status_code=status.HTTP_201_CREATED)
async def read_user(user_id:str, db: Session = Depends(create_session)):
    db_user = db.query(UserModel).filter(UserModel.uuid == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return db_user

@app.delete("/user/{user_id}", status_code=status.HTTP_201_CREATED)
async def delete_user(user_id: str, db: Session = Depends(create_session)):
    db_user = db.query(UserModel).filter(UserModel.uuid == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    else:
        try:
            db_user_attempts= db.query(AttemptModel).filter(AttemptModel.user_id == user_id).all()
            if db_user_attempts: 
                for user_attempt in db_user_attempts:
                    db.delete(user_attempt)
                    
            db.delete(db_user)
            db.commit()
            return responses.JSONResponse(content = {'message' : 'User deleted'}, status_code=201)
        
        except Exception as e:
            db.rollback()
            raise HTTPException(status_code=500, detail=f"Unable to delete user. {e}")

@app.post("/user", status_code=status.HTTP_201_CREATED)
async def create_user(user: UserBase, db: Session = Depends(create_session)):
    db_user = UserModel(**user.dict())
    db.add(db_user)
    db.commit()
    return responses.JSONResponse(content = {'message' : 'User added'}, status_code=201)

### SCHEME ROUTES ###
@app.get("/scheme/{user_id}", status_code=status.HTTP_201_CREATED)
async def get_scheme(user_id: str, db: Session = Depends(create_session)):
    db_user = db.query(UserModel).filter(UserModel.uuid == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db_scheme = db.query(SchemeModel).filter(SchemeModel.user_id == user_id).all()
    if db_scheme is None:
        raise HTTPException(status_code=404, detail="User schema not found")
  
    return db_user.scheme

async def save_image_locally(file):
    unique_str = str(uuid.uuid4())[:5]
    filename, file_extension = os.path.splitext(file.filename)

    file_path = os.path.join(config.upload_path, f"{filename}_{unique_str}{file_extension}")
    file.filename = f"{filename}_{unique_str}{file_extension}"
    print(file_path)
    # Save the file locally
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    print("finished saving locally")
    return file_path

@app.post("/scheme/{user_id}", status_code=status.HTTP_201_CREATED)
async def add_user_to_scheme(scheme: SchemeBase, db: Session = Depends(create_session)):
    user = db.query(UserModel).filter(UserModel.uuid == scheme.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    # Check if the scheme with the provided scheme_name exists
    db_scheme = db.query(SchemeModel).filter(SchemeModel.scheme_name == scheme.scheme_name).first()
    
    if db_scheme:
        # If the scheme exists, add the user to it
        user = db.query(UserModel).filter(UserModel.uuid == scheme.user_id).first()
        if user in db_scheme.users:
            raise HTTPException(status_code=404, detail="User is already associated with the scheme")
        
        else:
            db_scheme.users.append(user)
            db.commit()
            return {"message": "Scheme has been updated successfully"}
    
    raise HTTPException(status_code=404, detail="This is not an existing scheme")

@app.post('/scheme/', status_code=status.HTTP_201_CREATED)
async def add_new_scheme(scheme_name: str, file: UploadFile = File(...), db: Session = Depends(create_session)):
    # Check if the scheme with the provided scheme_name exists
    db_scheme = db.query(SchemeModel).filter(SchemeModel.scheme_name == scheme_name).first()
    if db_scheme:
        return responses.JSONResponse(content={"message": "This is an exisiting scheme"})
    
    else:
        try:
            updated_filepath = await save_image_locally(file)
            
            new_scheme = SchemeModel(scheme_name=scheme_name, scheme_img_path = updated_filepath)
            print('new scheme initialised')
            db.add(new_scheme)
            db.commit()

        except:
            raise HTTPException(status_code=404, detail= "Please upload an image")

    return responses.JSONResponse(content={"message": "File uploaded successfully", "filename": file.filename})

@app.put("/scheme/{user_id}", status_code=status.HTTP_201_CREATED)
async def update_user_schemes(scheme_input: SchemeInput, db: Session = Depends(create_session)):
    # Check if user exists
    user = db.query(UserModel).filter(UserModel.uuid == scheme_input.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Get existing schemes for the user
    existing_schemes = [scheme.scheme_name for scheme in user.scheme]
    schemes_to_add = (set(scheme_input.schemesList) - set(existing_schemes))
    schemes_to_delete = (set(existing_schemes) - set(scheme_input.schemesList))
    print(schemes_to_add, schemes_to_delete)
    try:
        for scheme_name in schemes_to_add:
            # Check if scheme exists in the database
            db_scheme = db.query(SchemeModel).filter(SchemeModel.scheme_name == scheme_name).first()
            if db_scheme:
                # If the scheme exists, add the user to it
                db_scheme.users.append(user)
                
            else:
               raise HTTPException(status_code=404, detail="Scheme not found")

        for scheme_name in schemes_to_delete:
            # Check if scheme exists in the database
            db_scheme = db.query(SchemeModel).filter(SchemeModel.scheme_name == scheme_name).first()
            if db_scheme:
                if user in db_scheme.users:
                    db_scheme.users.remove(user)

        db.commit()
        return {"message": "Schemes updated successfully"}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/scheme", status_code=status.HTTP_201_CREATED)
async def get_scheme_names(db: Session = Depends(create_session)):
    # Query for scheme names
    schemes= db.query(distinct(SchemeModel.scheme_name)).all()
    
    # If no scheme names are found, raise an HTTPException with status code 404
    if not schemes:
        raise HTTPException(status_code=404, detail="No scheme names found")
    # Extract the scheme names from the query results to return a list of schemes
    scheme_name_list = [scheme_name[0] for scheme_name in schemes]
    return scheme_name_list

## QUESTION ROUTES ##
@app.get("/question/{scheme_name}", status_code=status.HTTP_201_CREATED)
async def get_scheme_question(scheme_name: str, db: Session = Depends(create_session)):
    db_question = db.query(QuestionModel).filter(QuestionModel.scheme_name == scheme_name).all()
    if db_question is None:
        raise HTTPException(status_code=404, detail="No questions found for the given scheme")
    return db_question

@app.post("/question", status_code=status.HTTP_201_CREATED)
async def add_question_to_scheme(question: QuestionBase, db: Session = Depends(create_session)):
    # Check if the scheme with the provided scheme_name exists
    db_scheme = db.query(SchemeModel).filter(SchemeModel.scheme_name == question.scheme_name).first()
    
    if db_scheme:
        # check if question is unique
        exists = db.query(QuestionModel).filter(QuestionModel.question_details== question.question_details).first()
        if exists:
            raise HTTPException(status_code=404, detail="Question is already in the database")
        else:
            db_question= QuestionModel(**question.dict())
            db.add(db_question)
            db.commit()    
    else:
        # If the scheme doesn't exist, create a new scheme and add the user to it
        raise HTTPException(status_code=404, detail="Scheme not found")

## ATTEMPT ROUTES ##
@app.get("/attempt/{attempt_id}", status_code=status.HTTP_201_CREATED)
async def read_attempt(attempt_id: str, db: Session = Depends(create_session)):
    db_schema = db.query(AttemptModel).filter(AttemptModel.attempt_id == attempt_id).first()
    if db_schema is None:
        raise HTTPException(status_code=404, detail="Attempt not found")
    return db_schema

@app.post("/attempt/", status_code=status.HTTP_201_CREATED)
async def create_attempt(schema: AttemptBase , db: Session = Depends(create_session)):
    inputs = dict(schema)
    # Get question details
    db_question = db.query(QuestionModel).filter(QuestionModel.question_id == inputs['question_id']).first()
    print('found question')
    if db_question is None: 
        raise HTTPException(status_code=404, detail="question does not exist")
    
    question = db_question.question_details
    ideal = db_question.ideal   

    # Get model answer and process
    response = openAI_response(
        question=question, 
        response=inputs['answer'],
        ideal=ideal
        )
    
    response = process_response(response)
    inputs.update(response)
    
    db_attempt = AttemptModel(**inputs)
    
    db.add(db_attempt)
    db.commit() 

    return response

@app.get("/attempt/user/{user_id}", status_code=status.HTTP_201_CREATED)
async def get_user_attempts(user_id: str, db: Session = Depends(create_session)):
    db_attempts= db.query(AttemptModel).filter(AttemptModel.user_id == user_id).all()
    if db_attempts is None:
        raise HTTPException(status_code=404, detail="Attempts not found")
    
    # for db_attempt in db_attempts:
    #     db_question = db.query(QuestionModel).filter(QuestionModel.question_id == db_attempt.question_id)
    #     question_title = db_question.title
    #     print(question_title)
    
    
    return db_attempts    

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


