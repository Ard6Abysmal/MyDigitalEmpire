from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from sqlalchemy.sql import func
from ..database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    category = Column(String(50), nullable=False)
    status = Column(String(50), default="Planned")
    description = Column(Text)
    tech = Column(JSON) # Store array of technologies as JSON
    image_url = Column(String(255), nullable=True)
    github_url = Column(String(255), nullable=True)
    live_url = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Project {self.name}>"