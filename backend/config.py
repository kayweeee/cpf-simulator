from pydantic import BaseModel
from pydantic_settings import (BaseSettings, SettingsConfigDict)
from sqlalchemy.ext.declarative import declarative_base



class DatabaseConfig(BaseModel):
    """Backend database configuration parameters.

    Attributes:
        dsn:
            DSN for target database.
    """


    dsn: str = "mysql+pymysql://root:test1234!@localhost:3306/testing"



class Config(BaseSettings):
    """API configuration parameters.

    Automatically read modifications to the configuration parametersß
    from environment variables and ``.env`` file.

    Attributes:
        database:
            Database configuration settings.
            Instance of :class:`app.backend.config.DatabaseConfig`.
        token_key:
            Random secret key used to sign JWT tokens.
    """

    database: DatabaseConfig = DatabaseConfig()
    token_key: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        env_prefix="MYAPI_",
        env_nested_delimiter="__",
        case_sensitive=False,
    )


config = Config()
Base = declarative_base()