from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.project import Project

router = APIRouter(prefix="/api/projects", tags=["projects"])


# GET all projects (public - no auth required)
@router.get("")
async def get_all_projects(db: Session = Depends(get_db)):
    """Fetch all published projects from database"""
    projects = db.query(Project).all()
    
    # Convert SQLAlchemy models to dict
    projects_data = [
        {
            "id": p.id,
            "title": p.name,  # Using 'name' from your existing model
            "name": p.name,
            "category": p.category,
            "status": p.status,
            "description": p.description,
            "tech": p.tech,
            "tags": p.tech,  # Map tech to tags for compatibility
            "image_url": p.image_url,
            "github_url": p.github_url,
            "live_url": p.live_url,
            "demo_url": p.live_url,  # Map live_url to demo_url for compatibility
        }
        for p in projects
    ]
    
    return {"projects": projects_data}


# GET single project by ID (public - for detail page)
@router.get("/{project_id}")
async def get_project_by_id(project_id: int, db: Session = Depends(get_db)):
    """Get a single project by ID (public endpoint)"""
    project = db.query(Project).filter(Project.id == project_id).first()
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return {
        "id": project.id,
        "title": project.name,
        "name": project.name,
        "category": project.category,
        "status": project.status,
        "description": project.description,
        "tech": project.tech,
        "tags": project.tech,
        "image_url": project.image_url,
        "github_url": project.github_url,
        "live_url": project.live_url,
        "demo_url": project.live_url,
    }
