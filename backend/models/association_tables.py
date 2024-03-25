from sqlalchemy import Column, String, Table, ForeignKey
from config import Base

user_scheme_association = Table(
    'user_scheme_association',
    Base.metadata,
    Column('user_table_id', String(255), ForeignKey('user.uuid')),
    Column('scheme_table_name', String(255), ForeignKey('scheme.scheme_name'))
)
