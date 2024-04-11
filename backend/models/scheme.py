from sqlalchemy import Integer, Column, ForeignKey, String,  Table
from sqlalchemy.orm import Mapped, relationship
from config import Base
import uuid
from models.association_tables import user_scheme_association

# def generate_uuid():
#     return str(uuid.uuid4())

class SchemeModel(Base):
    __tablename__ = "scheme"
    scheme_name: Mapped[str] = Column(String(255), primary_key=True, nullable=False )
    scheme_csa_img_path: Mapped[str] = Column(String(255), nullable= True)
    scheme_admin_img_path: Mapped[str] = Column(String(255), nullable= True)
    user_id: Mapped[str] = Column(String(255), ForeignKey("user.uuid"), nullable=True )
    
    users: Mapped[list["UserModel"]] = relationship("UserModel", secondary=user_scheme_association, back_populates="scheme")
    questions: Mapped[list["QuestionModel"]] = relationship("QuestionModel", back_populates="scheme")
    
    def to_dict(self):
        return {
            'scheme_name': self.scheme_name,
            'scheme_csa_img_path': self.scheme_csa_img_path,
            'scheme_admin_img_path': self.scheme_admin_img_path,
            'user_id': self.user_id,
            'users': self.users,
            'questions': self.questions 
        }
