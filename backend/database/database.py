from sqlalchemy import create_engine
from sqlalchemy.orm  import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base


SQL_DATABASE_URL = "mysql+pymysql://root:test1234!@localhost:3306/cpf_simulator_db1"

engine = create_engine(SQL_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()