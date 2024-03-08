import sqlalchemy as create_engine
from sqlalchemy.orm  import sessionmaker, Session
import sqlalchemy.ext.declarative as declarative_base



SQL_DATABASE_URL = ""

engine = create_engine(SQL_DATABASE_URL)

def get_db():
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    try:
        yield SessionLocal
    finally:
        SessionLocal.close()

Base = declarative_base()