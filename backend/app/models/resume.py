from sqlalchemy import Column, Integer, String, Text, JSON
from ..database import Base

class ResumeData(Base):
    __tablename__ = "resume_data"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    title = Column(String)
    email = Column(String)
    phone = Column(String)
    location = Column(String)
    website = Column(String)
    github = Column(String)
    linkedin = Column(String)
    summary = Column(Text)
    
    # JSON fields for complex data
    experience = Column(JSON)  # List of work experiences
    education = Column(JSON)   # List of education
    skills = Column(JSON)      # Skills by category
    projects = Column(JSON)    # Featured projects
    certifications = Column(JSON)  # Certifications
