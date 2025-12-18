import os
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Dict
import json

from ..database import get_db
from ..models.resume import ResumeData
from ..services.pdf_generator import generate_resume_pdf

# Load environment variables
load_dotenv()

router = APIRouter(prefix="/api/resume", tags=["resume"])

# Admin token from environment variable
ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", "fallback-token-12345")

def verify_admin(token: str):
    if token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")

# Schemas
class ResumeDataCreate(BaseModel):
    full_name: str
    title: str
    email: str
    phone: str
    location: str
    website: str | None = None
    github: str | None = None
    linkedin: str | None = None
    summary: str
    experience: List[dict]
    education: List[dict]
    skills: Dict[str, List[str]]
    projects: List[dict]
    certifications: List[dict] | None = None

# Get resume data
@router.get("/data")
def get_resume_data(db: Session = Depends(get_db)):
    resume = db.query(ResumeData).first()
    
    if not resume:
        return {
            "message": "No resume data found",
            "data": None
        }
    
    return {
        "id": resume.id,
        "full_name": resume.full_name,
        "title": resume.title,
        "email": resume.email,
        "phone": resume.phone,
        "location": resume.location,
        "website": resume.website,
        "github": resume.github,
        "linkedin": resume.linkedin,
        "summary": resume.summary,
        "experience": resume.experience,
        "education": resume.education,
        "skills": resume.skills,
        "projects": resume.projects,
        "certifications": resume.certifications,
    }

# Update resume data (admin only)
@router.post("/data")
def update_resume_data(
    data: ResumeDataCreate,
    token: str,
    db: Session = Depends(get_db)
):
    verify_admin(token)
    
    resume = db.query(ResumeData).first()
    
    if resume:
        for key, value in data.dict().items():
            setattr(resume, key, value)
    else:
        resume = ResumeData(**data.dict())
        db.add(resume)
    
    db.commit()
    db.refresh(resume)
    
    return {"message": "Resume data updated", "id": resume.id}

# Upload resume data from JSON file
@router.post("/upload")
async def upload_resume_json(
    file: UploadFile = File(...),
    token: str = None,
    db: Session = Depends(get_db)
):
    if not token:
        raise HTTPException(status_code=401, detail="Token required")
    
    verify_admin(token)
    
    # Read uploaded JSON file
    contents = await file.read()
    
    try:
        data = json.loads(contents)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON file")
    
    # Validate required fields
    required_fields = ['full_name', 'title', 'email', 'phone', 'location', 'summary']
    for field in required_fields:
        if field not in data:
            raise HTTPException(status_code=400, detail=f"Missing required field: {field}")
    
    resume = db.query(ResumeData).first()
    
    if resume:
        for key, value in data.items():
            setattr(resume, key, value)
    else:
        resume = ResumeData(**data)
        db.add(resume)
    
    db.commit()
    db.refresh(resume)
    
    return {"message": "Resume uploaded successfully", "id": resume.id}

# Download PDF
@router.get("/download")
def download_resume_pdf(db: Session = Depends(get_db)):
    resume = db.query(ResumeData).first()
    
    if not resume:
        raise HTTPException(status_code=404, detail="Resume data not found")
    
    resume_dict = {
        "full_name": resume.full_name,
        "title": resume.title,
        "email": resume.email,
        "phone": resume.phone,
        "location": resume.location,
        "website": resume.website,
        "github": resume.github,
        "linkedin": resume.linkedin,
        "summary": resume.summary,
        "experience": resume.experience or [],
        "education": resume.education or [],
        "skills": resume.skills or {},
        "projects": resume.projects or [],
        "certifications": resume.certifications or [],
    }
    
    pdf_buffer = generate_resume_pdf(resume_dict)
    
    return StreamingResponse(
        pdf_buffer,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename={resume.full_name.replace(' ', '_')}_Resume.pdf"
        }
    )

# Export resume data as JSON
@router.get("/export")
def export_resume_json(token: str, db: Session = Depends(get_db)):
    verify_admin(token)
    
    resume = db.query(ResumeData).first()
    
    if not resume:
        raise HTTPException(status_code=404, detail="Resume data not found")
    
    resume_dict = {
        "full_name": resume.full_name,
        "title": resume.title,
        "email": resume.email,
        "phone": resume.phone,
        "location": resume.location,
        "website": resume.website,
        "github": resume.github,
        "linkedin": resume.linkedin,
        "summary": resume.summary,
        "experience": resume.experience or [],
        "education": resume.education or [],
        "skills": resume.skills or {},
        "projects": resume.projects or [],
        "certifications": resume.certifications or [],
    }
    
    return resume_dict
