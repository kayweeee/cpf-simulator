from contextlib import contextmanager
from typing import Iterator
from sqlalchemy import create_engine
from sqlalchemy.orm import (Session, sessionmaker)
from config import config

engine = create_engine(config.database.dsn)

# create session factory to generate new database sessions
SessionFactory = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
)


def create_session() -> Iterator[Session]:
    """Create new database session.

    Yields:
        Database session.
    """

    session = SessionFactory()

    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()


@contextmanager
def open_session() -> Iterator[Session]:
    """Create new database session with context manager.

    Yields:
        Database session.
    """

    return create_session()
