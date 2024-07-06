from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import constants

SQLALCHEMY_DATABASE_URL = f"postgresql://{constants.POSTGRES_USER}:{constants.POSTGRES_PASSWORD}@db:{constants.POSTGRES_PORT}/db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
