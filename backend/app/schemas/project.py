from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ProjectBase(BaseModel):
    name: str
    category: str
    status: str
    description: str
    tech: List[str]
    image_url: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    status: Optional[str] = None
    description: Optional[str] = None
    tech: Optional[List[str]] = None
    image_url: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None

class Project(ProjectBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True