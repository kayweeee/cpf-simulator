from fastapi import FastAPI, Depends, status, HTTPException, responses, File, UploadFile
from sqlalchemy.orm  import Session, joinedload
from sqlalchemy import select, distinct, desc
from models.user import UserModel
from models.attempt import AttemptModel
from models.scheme import SchemeModel
from models.question import QuestionModel
from models.association_tables import user_scheme_association
from session import create_session, engine
from schemas.attempt import AttemptBase
from schemas.user import UserBase, UserEmailInput, UserResponseSchema
from schemas.scheme import SchemeBase, SchemeInput
from schemas.question import QuestionBase
from schemas.table import TableBase
from config import Base, config
from sqlalchemy import func
from fastapi.middleware.cors import CORSMiddleware
from ML.openAI import process_response, openAI_response
import shutil
import uuid
import os

app = FastAPI()
Base.metadata.drop_all(bind=engine)
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
async def login_user(user_input: UserEmailInput, db: Session = Depends(create_session)):
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

@app.get("/user/{user_id}/schemes", status_code=status.HTTP_201_CREATED)
async def get_all_scheme_no_by_user_id(user_id:str, db: Session = Depends(create_session)):

    db_user = db.query(UserModel).filter(UserModel.uuid == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    schemes =  db.query(SchemeModel)\
            .join(user_scheme_association, SchemeModel.scheme_name == user_scheme_association.c.scheme_table_name)\
            .filter(user_scheme_association.c.user_table_id == user_id).all()
    
    if not schemes:
        raise HTTPException(status_code=404, detail="No scheme names found")
    
    results = []
    
    for scheme in schemes:
        num_attempted_questions = db.query(func.count(func.distinct(AttemptModel.question_id))) \
                    .filter(AttemptModel.user_id == user_id) \
                    .filter(AttemptModel.question_id.in_([question.question_id for question in scheme.questions])) \
                    .scalar()
        
        num_questions = db.query(func.count(QuestionModel.question_id)).filter(QuestionModel.scheme_name == scheme.scheme_name).scalar()
        scheme_attempt_info = {
            "scheme_name": scheme.scheme_name,
            "num_attempted_questions": num_attempted_questions,
            "num_questions": num_questions
        }
        results.append(scheme_attempt_info)
    return results

@app.get("/user/{user_id}/{scheme_name}", status_code=status.HTTP_201_CREATED)
async def get_scheme_no_by_user_id(user_id:str, scheme_name:str, db: Session = Depends(create_session)):
    db_user = db.query(UserModel).filter(UserModel.uuid == user_id).first()
    
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    db_questions = db.query(QuestionModel).filter(QuestionModel.scheme_name == scheme_name).all()
    if db_questions is None:
        raise HTTPException(status_code=404, detail="No questions found for the scheme")

    num_attempted_questions = db.query(func.count(func.distinct(AttemptModel.question_id))) \
                        .filter(AttemptModel.user_id == user_id) \
                        .filter(AttemptModel.question_id.in_([question.question_id for question in db_questions])) \
                        .scalar()
    num_questions = db.query(func.count(QuestionModel.question_id)).filter(QuestionModel.scheme_name == scheme_name).scalar()
    # Create a dictionary containing the scheme name and the number of attempted questions
    scheme_attempt_info = {
        "scheme_name": scheme_name,
        "num_attempted_questions": num_attempted_questions,
        "num_questions": num_questions
    }
    return scheme_attempt_info


### SCHEME ROUTES ###
@app.get("/scheme/{user_id}", status_code=status.HTTP_201_CREATED)
async def get_scheme_by_user_id(user_id: str, db: Session = Depends(create_session)):
    db_user = db.query(UserModel).filter(UserModel.uuid == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    scheme_list = []
    for scheme in db_user.scheme:  # Iterate over schemes through the relationship
        scheme_dict = scheme.to_dict()
        num_questions = db.query(func.count(QuestionModel.question_id)).filter(QuestionModel.scheme_name == scheme.scheme_name).scalar()
        scheme_dict.update({"num_questions": num_questions})
        scheme_list.append(scheme_dict)

    return scheme_list

async def save_image_locally(file):
    unique_str = str(uuid.uuid4())[:5]
    filename, file_extension = os.path.splitext(file.filename)
    file.filename = f"{filename}_{unique_str}{file_extension}"
    
    # Save file for admin dashboard
    admin_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../admin-dashboard/public"))
    admin_upload_path = os.path.join(admin_path, "uploads")
    os.makedirs(admin_upload_path, exist_ok=True)
    admin_file_path = os.path.join(admin_upload_path, file.filename)

    with open(admin_file_path, "wb") as f_admin:
        file.file.seek(0)  # Reset file pointer to start of the file
        shutil.copyfileobj(file.file, f_admin)
        
    # Save file for final-csa-dashboard
    csa_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../final-csa-dashboard/public"))
    csa_upload_path = os.path.join(csa_path, "uploads")  
    os.makedirs(csa_upload_path, exist_ok=True)
    csa_file_path = os.path.join(csa_upload_path, file.filename)  

    with open(csa_file_path, "wb") as f_csa:
        file.file.seek(0)  
        shutil.copyfileobj(file.file, f_csa)
    
    # Get the relative path of the saved files
    rel_admin_path = os.path.relpath(admin_file_path, admin_path)
    rel_csa_path = os.path.relpath(csa_file_path, csa_path)
    
    return rel_admin_path, rel_csa_path

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

@app.post('/scheme', status_code=status.HTTP_201_CREATED)
async def add_new_scheme(scheme_name: str, file: UploadFile = File(...), db: Session = Depends(create_session)):
    # Check if the scheme with the provided scheme_name exists
    db_scheme = db.query(SchemeModel).filter(SchemeModel.scheme_name == scheme_name).first()
    if db_scheme:
        return responses.JSONResponse(content={"message": "This is an exisiting scheme"})
    
    else:
        try:
            csa_filepath, admin_filepath = await save_image_locally(file)
            new_scheme = SchemeModel(scheme_name=scheme_name, scheme_csa_img_path=csa_filepath, scheme_admin_img_path= admin_filepath)
            db.add(new_scheme)
            db.commit()

        except:
            raise HTTPException(status_code=404, detail= "Please upload an image")

    return responses.JSONResponse(content={"message": "File uploaded successfully", "filename": file.filename})

@app.put("/scheme/{user_id}", status_code=status.HTTP_201_CREATED)
async def update_scheme_of_user(scheme_input: SchemeInput, db: Session = Depends(create_session)):
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

@app.get("/distinct/scheme", status_code=status.HTTP_201_CREATED)
async def get_distinct_scheme_names(db: Session = Depends(create_session)):
    schemes = db.query(distinct(SchemeModel.scheme_name)).all()
    if not schemes:
        raise HTTPException(status_code=404, detail="No scheme names found")
    scheme_name_list = [scheme_name[0] for scheme_name in schemes]
    return scheme_name_list

@app.get("/scheme", status_code=status.HTTP_201_CREATED)
async def get_all_schemes(db: Session = Depends(create_session)):
    db_schemes= db.query(distinct(SchemeModel.scheme_name)).all()
    if not db_schemes:
        raise HTTPException(status_code=404, detail="No scheme names found")
    scheme_list = []
    for scheme in db_schemes:
        scheme_name = scheme[0]
        db_scheme = db.query(SchemeModel).filter(SchemeModel.scheme_name == scheme_name).first()
        scheme_dict = db_scheme.to_dict()
        question_number = len(scheme_dict['questions'])
        scheme_dict.update({'number_of_questions': question_number})
        scheme_list.append(scheme_dict)
    return scheme_list


## QUESTION ROUTES ##
@app.get("/questions/scheme/{scheme_name}", status_code=status.HTTP_201_CREATED)
async def get_questions_by_scheme_name(scheme_name: str, db: Session = Depends(create_session)):
    db_question = db.query(QuestionModel).filter(QuestionModel.scheme_name == scheme_name).all()
    if db_question is None:
        raise HTTPException(status_code=404, detail="No questions found for the given scheme")
    return db_question

@app.get("/question/{question_id}", status_code=status.HTTP_201_CREATED)
async def get_questions_by_question_id(question_id: str, db: Session = Depends(create_session)):
    db_question = db.query(QuestionModel).filter(QuestionModel.question_id == question_id).all()
    if db_question is None:
        raise HTTPException(status_code=404, detail="No questions found for the given scheme")
    return db_question

@app.get("/questions/all", status_code=status.HTTP_201_CREATED)
async def get_all_questions(db: Session = Depends(create_session)):
    print('get all questions')
    db_questions = db.query(QuestionModel).all()
    return [question.to_dict() for question in db_questions]

@app.post("/question", status_code=status.HTTP_201_CREATED)
async def add_question_to_scheme(question: QuestionBase, db: Session = Depends(create_session)):

    db_scheme = db.query(SchemeModel).filter(SchemeModel.scheme_name == question.scheme_name).first()
    if db_scheme:
        exists = db.query(QuestionModel).filter(QuestionModel.question_details== question.question_details).first()
        if exists:
            raise HTTPException(status_code=404, detail="Question is already in the database")
        else:
            db_question= QuestionModel(**question.dict())
            db.add(db_question)
            db.commit()    
            return db_question.question_id
    else:
        raise HTTPException(status_code=404, detail="Scheme not found")
    
## TABLE ROUTE ##
@app.get("/table/{user_id}/{scheme_name}", status_code=status.HTTP_201_CREATED)
async def get_table_details_of_user_for_scheme(scheme_name: str, user_id: str, db: Session = Depends(create_session)):
    question_list = []
    db_questions = db.query(QuestionModel).filter(QuestionModel.scheme_name == scheme_name).all()
    
    if db_questions is None:
        raise HTTPException(status_code=404, detail="No questions found for the given scheme")

    for db_question in db_questions:
        question_dict = db_question.to_dict()
        db_attempt = db.query(AttemptModel).filter(AttemptModel.user_id == user_id).filter(AttemptModel.question_id == db_question.question_id).order_by(desc(AttemptModel.date)).first()
  
        if db_attempt is None:
            db_attempt = ""
            status = 'uncompleted'
        else:
            db_attempt = db_attempt.to_dict()['attempt_id']
            status = 'completed'
            
        question_dict.update({"status": status, "attempt": db_attempt})
        question_list.append(question_dict)
        
    return question_list

## ATTEMPT ROUTES ##
@app.get("/attempt/{attempt_id}", status_code=status.HTTP_201_CREATED)
async def read_attempt(attempt_id: str, db: Session = Depends(create_session)):
    db_attempt = db.query(AttemptModel).filter(AttemptModel.attempt_id == attempt_id).first()
    if db_attempt is None:
        raise HTTPException(status_code=404, detail="Attempt not found")
    attempt_dict = db_attempt.to_dict()
    question_details = db.query(QuestionModel.question_details).filter(QuestionModel.question_id==attempt_dict['question_id']).first()
    if question_details:
        attempt_dict['question_details'] = str(question_details[0])
    return attempt_dict

@app.post("/attempt/", status_code=status.HTTP_201_CREATED)
async def create_attempt(schema: AttemptBase , db: Session = Depends(create_session)):
    inputs = dict(schema)
    db_question = db.query(QuestionModel).filter(QuestionModel.question_id == inputs['question_id']).first()
    if db_question is None: 
        raise HTTPException(status_code=404, detail="question does not exist")
    
    question = db_question.question_details
    ideal = db_question.ideal

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

    return db_attempt.attempt_id

@app.get("/attempt/user/{user_id}", status_code=status.HTTP_201_CREATED)
async def get_user_attempts(user_id: str, db: Session = Depends(create_session)):
    db_attempts= db.query(AttemptModel).filter(AttemptModel.user_id == user_id).all()
    attempts_list = []
    if db_attempts is None:
        raise HTTPException(status_code=404, detail="Attempts not found")

    for db_attempt in db_attempts:
        db_question = db.query(QuestionModel).filter(QuestionModel.question_id == db_attempt.question_id).first()
        question_title = db_question.to_dict()['title']
        scheme_name = db_question.to_dict()['scheme_name']
        attempt_dict = db_attempt.to_dict()
        attempt_dict.update({'question_title':question_title, 'scheme_name': scheme_name.scheme_name})
        attempts_list.append(attempt_dict)

    return attempts_list

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


