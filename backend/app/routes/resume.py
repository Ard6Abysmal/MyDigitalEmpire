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

# Default resume data with your details
DEFAULT_RESUME_DATA = {
    "full_name": "Amal Madhu",
    "title": "AI/ML Engineer & Full-Stack Developer",
    "email": "asuragodamal6purdemoneuabeyond@gmail.com",
    "phone": "+91-XXXXXXXXXX",  # Add your phone number
    "location": "Thiruvananthapuram, Kerala, India",
    "website": "https://amalmadhu.dev",  # Update with your actual domain
    "github": "https://github.com/AbyssDrn",
    "linkedin": "https://linkedin.com/in/amal-madhu",
    "summary": "Passionate developer specializing in AI/ML, computer vision, neuromorphic VLSI design, and full-stack web development. Experienced in building innovative solutions using deep learning, embedded systems, and modern web technologies. Currently working on BlueDepth-Crescent, an underwater image enhancement project using UNet architecture.",
    "experience": [
        {
            "title": "AI/ML Developer",
            "company": "Smart India Hackathon",
            "location": "India",
            "start_date": "2024",
            "end_date": "Present",
            "description": [
                "Developing BlueDepth-Crescent: Underwater image enhancement using UNet and PyTorch",
                "Implementing GPU-optimized deep learning pipelines with CUDA acceleration",
                "Training and deploying computer vision models for low-visibility scenarios",
                "Managing version control with Git and collaborative development"
            ]
        },
        {
            "title": "Full-Stack Developer",
            "company": "Personal Projects",
            "location": "Remote",
            "start_date": "2023",
            "end_date": "Present",
            "description": [
                "Built responsive portfolio website using React, Tailwind CSS, and Framer Motion",
                "Developed RESTful APIs with FastAPI and PostgreSQL for backend services",
                "Implemented modern UI/UX with dark mode, animations, and accessibility features",
                "Integrated analytics and performance monitoring for web applications"
            ]
        }
    ],
    "education": [
        {
            "degree": "Bachelor of Technology in Electronics and Communication Engineering",
            "institution": "Your University Name",  # Update with your university
            "location": "Kerala, India",
            "start_date": "2021",
            "end_date": "2025",
            "gpa": "X.XX",  # Add your GPA
            "achievements": [
                "Smart India Hackathon participant",
                "Focus on VLSI Design and Embedded Systems",
                "Specialized in AI/ML and Computer Vision"
            ]
        }
    ],
    "skills": {
        "Programming Languages": ["Python", "JavaScript", "C++", "Verilog", "SQL"],
        "AI/ML & Deep Learning": ["PyTorch", "TensorFlow", "OpenCV", "UNet", "Computer Vision", "CUDA"],
        "Web Development": ["React", "FastAPI", "Node.js", "Tailwind CSS", "Framer Motion", "PostgreSQL"],
        "VLSI & Embedded": ["Verilog", "Cadence", "Arduino", "ESP32", "IoT", "Neuromorphic Design"],
        "Tools & Platforms": ["Git", "Docker", "VS Code", "Linux", "Windows", "GPU Optimization"],
        "Soft Skills": ["Problem Solving", "Team Collaboration", "Project Management", "Technical Documentation"]
    },
    "projects": [
        {
            "name": "BlueDepth-Crescent",
            "description": "Underwater image enhancement using deep learning with UNet architecture",
            "technologies": ["PyTorch", "Python", "CUDA", "OpenCV", "Computer Vision"],
            "highlights": [
                "Implemented UNet model for low-visibility image restoration",
                "Optimized for GPU acceleration with NVIDIA RTX 4050",
                "Built complete training and inference pipeline",
                "Preparing for deployment on Jetson Nano"
            ],
            "github": "https://github.com/AbyssDrn/BlueDepth-Crescent",
            "status": "Active Development"
        },
        {
            "name": "Neuromorphic VLSI Circuits",
            "description": "Brain-inspired circuit design using Verilog and Cadence tools",
            "technologies": ["Verilog", "Cadence", "VLSI Design", "Neuromorphic Computing"],
            "highlights": [
                "Designed energy-efficient neuromorphic circuits",
                "Simulated and tested using Cadence suite",
                "Focus on low-power neural network implementations"
            ],
            "status": "Research Phase"
        },
        {
            "name": "IoT Accident Detection System",
            "description": "Real-time accident detection using MPU6050, GPS, and GSM modules",
            "technologies": ["Arduino", "C++", "MPU6050", "GPS", "GSM800L", "IoT"],
            "highlights": [
                "Built automatic emergency alert system",
                "Integrated accelerometer and GPS tracking",
                "SMS notification system using GSM module",
                "Real-time data processing and alerting"
            ],
            "status": "Completed"
        },
        {
            "name": "Portfolio Website",
            "description": "Modern, responsive portfolio with dark mode and animations",
            "technologies": ["React", "Tailwind CSS", "Framer Motion", "FastAPI", "PostgreSQL"],
            "highlights": [
                "Built with React and modern UI/UX principles",
                "Implemented smooth animations and transitions",
                "RESTful backend API with FastAPI",
                "Integrated blog and project showcase"
            ],
            "github": "https://github.com/AbyssDrn",
            "demo": "https://amalmadhu.dev",
            "status": "Completed"
        }
    ],
    "certifications": [
        {
            "name": "Deep Learning Specialization",
            "issuer": "Coursera / DeepLearning.AI",
            "date": "2024",
            "description": "Neural Networks, CNNs, RNNs, and Sequence Models"
        },
        {
            "name": "Python for Data Science",
            "issuer": "Online Learning Platform",
            "date": "2023",
            "description": "Advanced Python programming for ML and data analysis"
        }
    ]
}

# Get resume data
@router.get("/data")
def get_resume_data(db: Session = Depends(get_db)):
    resume = db.query(ResumeData).first()
    
    if not resume:
        # Return default data if no resume exists in database
        return {
            "message": "Using default resume data",
            "data": DEFAULT_RESUME_DATA
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
    
    # Use default data if no resume in database
    if not resume:
        resume_dict = DEFAULT_RESUME_DATA
    else:
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
    
    filename = resume_dict["full_name"].replace(' ', '_')
    
    return StreamingResponse(
        pdf_buffer,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename={filename}_Resume.pdf"
        }
    )

# Export resume data as JSON
@router.get("/export")
def export_resume_json(token: str, db: Session = Depends(get_db)):
    verify_admin(token)
    
    resume = db.query(ResumeData).first()
    
    # Use default data if no resume in database
    if not resume:
        return DEFAULT_RESUME_DATA
    
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

# Initialize default resume data in database (run once)
@router.post("/init")
def initialize_resume_data(token: str, db: Session = Depends(get_db)):
    verify_admin(token)
    
    existing = db.query(ResumeData).first()
    if existing:
        return {"message": "Resume data already exists", "id": existing.id}
    
    resume = ResumeData(**DEFAULT_RESUME_DATA)
    db.add(resume)
    db.commit()
    db.refresh(resume)
    
    return {"message": "Default resume data initialized", "id": resume.id}
