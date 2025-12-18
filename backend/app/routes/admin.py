import os
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel

from ..database import get_db
from ..models.project import Project

# Load environment variables
load_dotenv()

router = APIRouter(prefix="/api/admin", tags=["admin"])

# Admin token from environment variable
ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", "fallback-token-12345")

def verify_admin(token: str):
    if token != ADMIN_TOKEN:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin token"
        )
    return True

# Project schemas matching your existing model
class ProjectCreate(BaseModel):
    name: str
    description: str
    category: str
    tech: List[str]
    github_url: str | None = None
    live_url: str | None = None
    image_url: str | None = None
    status: str = "completed"

class ProjectUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    category: str | None = None
    tech: List[str] | None = None
    github_url: str | None = None
    live_url: str | None = None
    image_url: str | None = None
    status: str | None = None

# Get all projects (admin view)
@router.get("/projects")
def admin_get_projects(token: str, db: Session = Depends(get_db)):
    verify_admin(token)
    projects = db.query(Project).all()
    
    # Convert to dict format
    projects_data = [
        {
            "id": p.id,
            "name": p.name,
            "title": p.name,  # Compatibility
            "category": p.category,
            "status": p.status,
            "description": p.description,
            "tech": p.tech,
            "tags": p.tech,  # Compatibility
            "image_url": p.image_url,
            "github_url": p.github_url,
            "live_url": p.live_url,
            "demo_url": p.live_url,  # Compatibility
        }
        for p in projects
    ]
    
    return {"projects": projects_data}

# Create project
@router.post("/projects")
def admin_create_project(
    project: ProjectCreate,
    token: str,
    db: Session = Depends(get_db)
):
    verify_admin(token)
    
    db_project = Project(
        name=project.name,
        description=project.description,
        category=project.category,
        tech=project.tech,
        github_url=project.github_url,
        live_url=project.live_url,
        image_url=project.image_url,
        status=project.status
    )
    
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    
    return {
        "message": "Project created successfully",
        "project": {
            "id": db_project.id,
            "name": db_project.name,
            "category": db_project.category,
            "status": db_project.status
        }
    }

# Update project
@router.put("/projects/{project_id}")
def admin_update_project(
    project_id: int,
    project: ProjectUpdate,
    token: str,
    db: Session = Depends(get_db)
):
    verify_admin(token)
    
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Update only provided fields
    update_data = project.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_project, key, value)
    
    db.commit()
    db.refresh(db_project)
    
    return {
        "message": "Project updated successfully",
        "project": {
            "id": db_project.id,
            "name": db_project.name,
            "status": db_project.status
        }
    }

# Delete project
@router.delete("/projects/{project_id}")
def admin_delete_project(
    project_id: int,
    token: str,
    db: Session = Depends(get_db)
):
    verify_admin(token)
    
    db_project = db.query(Project).filter(Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    db.delete(db_project)
    db.commit()
    
    return {"message": "Project deleted successfully"}
