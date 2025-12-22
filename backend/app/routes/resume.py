import os
import json
from datetime import datetime
from typing import List, Dict, Optional

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Query
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ..database import get_db
from ..models.resume import ResumeData  # existing SQLAlchemy model
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
    website: Optional[str] = None
    github: Optional[str] = None
    linkedin: Optional[str] = None
    summary: str
    experience: List[dict]
    education: List[dict]
    skills: Dict[str, List[str]]
    projects: List[dict]
    certifications: Optional[List[dict]] = None


# Default resume data with your details
DEFAULT_RESUME_DATA = {
    "full_name": "Amal Madhu",
    "title": "AI/ML Engineer & Full-Stack Developer",
    "email": "asuragodamal6purdemoneuabeyond@gmail.com",
    "phone": "+91-8921470483",
    "location": "Pathanamthitta, Kerala, India",
    "website": "https://amalmadhu.dev",
    "github": "https://github.com/AbyssDrn",
    "linkedin": "https://www.linkedin.com/in/amal-madhu-48042a20a",
    "summary": (
        "Passionate developer specializing in AI/ML, computer vision, neuromorphic VLSI design, "
        "and full-stack web development. Experienced in building innovative solutions using deep "
        "learning, embedded systems, and modern web technologies. Currently working on "
        "BlueDepth-Crescent, an underwater image enhancement project using UNet architecture for "
        "the Smart India Hackathon."
    ),
    "experience": [
        {
            "title": "AI/ML Developer",
            "company": "Smart India Hackathon - BlueDepth-Crescent",
            "location": "India",
            "start_date": "2024",
            "end_date": "Present",
            "description": [
                "Developing BlueDepth-Crescent: Underwater image enhancement using UNet and PyTorch",
                "Implementing GPU-optimized deep learning pipelines with CUDA acceleration on RTX 4050",
                "Training and deploying computer vision models for low-visibility scenarios",
                "Managing version control with Git and collaborative team development",
                "Preparing deployment pipeline for NVIDIA Jetson Nano embedded platform",
            ],
        },
        {
            "title": "Full-Stack Developer",
            "company": "Personal Projects & Portfolio Development",
            "location": "Remote",
            "start_date": "2023",
            "end_date": "Present",
            "description": [
                "Built responsive portfolio website using React, Tailwind CSS, and Framer Motion",
                "Developed RESTful APIs with FastAPI and PostgreSQL for backend services",
                "Implemented modern UI/UX with dark mode, animations, and accessibility features",
                "Integrated analytics and performance monitoring for web applications",
                "Deployed full-stack applications with Docker containerization",
            ],
        },
    ],
    "education": [
        {
            "degree": "Bachelor of Technology in Electronics and Communication Engineering",
            "institution": "College Of Engineering And Management Punnapra (CEMP)",
            "location": "Kerala, India",
            "start_date": "2021",
            "end_date": "2025",
            "gpa": "6.66/10",
            "achievements": [
                "Smart India Hackathon 2024 participant - BlueDepth-Crescent project",
                "Specialization in VLSI Design and Embedded Systems",
                "Focus on AI/ML and Computer Vision applications",
                "Active in technical project development and innovation",
            ],
        }
    ],
    "skills": {
        "Programming Languages": ["Python", "JavaScript", "C++", "Verilog", "SQL", "Bash"],
        "AI/ML & Deep Learning": [
            "PyTorch",
            "TensorFlow",
            "OpenCV",
            "UNet",
            "Computer Vision",
            "CUDA",
            "GPU Optimization",
        ],
        "Web Development": [
            "React",
            "FastAPI",
            "Node.js",
            "Tailwind CSS",
            "Framer Motion",
            "PostgreSQL",
            "REST APIs",
        ],
        "VLSI & Embedded": [
            "Verilog",
            "Cadence",
            "Arduino",
            "ESP32",
            "IoT",
            "Neuromorphic Design",
            "Jetson Nano",
        ],
        "Tools & Platforms": [
            "Git",
            "GitHub",
            "Docker",
            "VS Code",
            "Linux",
            "Windows",
            "PowerShell",
            "Jupyter",
        ],
        "Soft Skills": [
            "Problem Solving",
            "Team Collaboration",
            "Project Management",
            "Technical Documentation",
            "Rapid Learning",
        ],
    },
    "projects": [
        {
            "name": "BlueDepth-Crescent",
            "description": "Underwater image enhancement using deep learning with UNet architecture for Smart India Hackathon",
            "technologies": ["PyTorch", "Python", "CUDA", "OpenCV", "Computer Vision", "GPU Acceleration"],
            "highlights": [
                "Implemented UNet model for low-visibility image restoration",
                "Optimized for GPU acceleration with NVIDIA RTX 4050 (6GB VRAM)",
                "Built complete training and inference pipeline with model checkpointing",
                "Preparing for deployment on Jetson Nano embedded platform",
                "Collaborative development using Git version control",
            ],
            "github": "https://github.com/AbyssDrn/BlueDepth-Crescent",
            "status": "Active Development",
        },
        {
            "name": "Neuromorphic VLSI Circuits",
            "description": "Brain-inspired circuit design using Verilog and Cadence tools for energy-efficient computing",
            "technologies": ["Verilog", "Cadence", "VLSI Design", "Neuromorphic Computing"],
            "highlights": [
                "Designed energy-efficient neuromorphic circuits mimicking biological neurons",
                "Simulated and tested using Cadence Virtuoso suite",
                "Focus on low-power neural network hardware implementations",
                "Research on spike-based computation for edge AI",
            ],
            "status": "Research Phase",
        },
        {
            "name": "IoT Accident Detection System",
            "description": "Real-time accident detection using MPU6050 accelerometer, GPS, and GSM modules",
            "technologies": ["Arduino", "C++", "MPU6050", "GPS", "GSM800L", "IoT"],
            "highlights": [
                "Built automatic emergency alert system with real-time monitoring",
                "Integrated accelerometer and GPS tracking for location detection",
                "SMS notification system using GSM module for emergency contacts",
                "Real-time data processing and threshold-based alerting mechanism",
            ],
            "status": "Completed",
        },
        {
            "name": "Digital Empire Portfolio",
            "description": "Modern, responsive portfolio website with dark mode, animations, and dynamic content management",
            "technologies": ["React", "Tailwind CSS", "Framer Motion", "FastAPI", "PostgreSQL"],
            "highlights": [
                "Built with React and modern UI/UX principles",
                "Implemented smooth animations and transitions using Framer Motion",
                "RESTful backend API with FastAPI and PostgreSQL database",
                "Integrated blog system and dynamic project showcase",
                "Fully responsive design with dark mode support",
            ],
            "github": "https://github.com/AbyssDrn",
            "demo": "https://amalmadhu.dev",
            "status": "Completed",
        },
    ],
    "certifications": [
        {
            "name": "Deep Learning Specialization",
            "issuer": "Coursera / DeepLearning.AI",
            "date": "2024",
            "description": "Neural Networks, CNNs, RNNs, and Sequence Models",
        },
        {
            "name": "Python for Data Science and Machine Learning",
            "issuer": "Online Learning Platform",
            "date": "2023",
            "description": "Advanced Python programming for ML and data analysis",
        },
        {
            "name": "GPU Programming with CUDA",
            "issuer": "NVIDIA",
            "date": "2024",
            "description": "GPU acceleration and parallel computing optimization",
        },
    ],
}


# ========================
# PUBLIC ENDPOINTS
# ========================

# Get resume data (PUBLIC - No auth required)
@router.get("/data")
def get_resume_data(db: Session = Depends(get_db)):
    resume = db.query(ResumeData).first()

    if not resume:
        return {
            "message": "Using default resume data",
            "data": DEFAULT_RESUME_DATA,
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


# Download PDF (PUBLIC - No auth required)
@router.get("/download")
def download_resume_pdf(db: Session = Depends(get_db)):
    resume = db.query(ResumeData).first()

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

    filename = resume_dict["full_name"].replace(" ", "_")

    return StreamingResponse(
        pdf_buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={filename}_Resume.pdf"},
    )


# ========================
# ADMIN JSON API (BODY)
# ========================

# Update resume data (ADMIN ONLY - POST)
@router.post("/data")
def update_resume_data(
    data: ResumeDataCreate,
    token: str,
    db: Session = Depends(get_db),
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


# ========================
# ADMIN FILE UPLOAD (FORM-DATA)
# ========================

@router.post("/upload")
async def upload_resume_json(
    file: UploadFile = File(...),
    token: str = Query(...),
    db: Session = Depends(get_db),
):
    """
    Upload resume JSON file.

    - Accepts both:
      - raw resume JSON matching DB fields
      - or wrapped format: {"data": {...}}
      - and normalizes experience.description -> experience.responsibilities
    """
    verify_admin(token)

    contents = await file.read()

    try:
        resume_data = json.loads(contents)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON file")

    # If wrapped as {"data": {...}}, unwrap it
    if isinstance(resume_data, dict) and "data" in resume_data:
        resume_data = resume_data["data"]

    if not isinstance(resume_data, dict):
        raise HTTPException(status_code=400, detail="Invalid JSON structure")

    # Normalize experience.description -> responsibilities for compatibility
    if "experience" in resume_data and isinstance(resume_data["experience"], list):
        for exp in resume_data["experience"]:
            if isinstance(exp, dict) and "description" in exp and "responsibilities" not in exp:
                exp["responsibilities"] = exp.pop("description")

    # Basic required fields check
    required_fields = ["full_name", "title", "email", "phone", "location", "summary"]
    for field in required_fields:
        if field not in resume_data:
            raise HTTPException(status_code=400, detail=f"Missing required field: {field}")

    # Upsert into ResumeData
    resume = db.query(ResumeData).first()

    if resume:
        for key, value in resume_data.items():
            if hasattr(resume, key):
                setattr(resume, key, value)
    else:
        # Filter only known fields to avoid SQLAlchemy errors
        allowed_keys = {
            "full_name",
            "title",
            "email",
            "phone",
            "location",
            "website",
            "github",
            "linkedin",
            "summary",
            "experience",
            "education",
            "skills",
            "projects",
            "certifications",
        }
        init_kwargs = {k: v for k, v in resume_data.items() if k in allowed_keys}
        resume = ResumeData(**init_kwargs)
        db.add(resume)

    db.commit()
    db.refresh(resume)

    return {"message": "Resume uploaded successfully", "id": resume.id}


# ========================
# ADMIN EXPORT / INIT / DELETE
# ========================

# Export resume data as JSON (ADMIN ONLY)
@router.get("/export")
def export_resume_json(token: str = Query(...), db: Session = Depends(get_db)):
    verify_admin(token)

    resume = db.query(ResumeData).first()

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


# Initialize default resume data - POST (PowerShell)
@router.post("/init")
def initialize_resume_data(token: str = Query(...), db: Session = Depends(get_db)):
    verify_admin(token)

    existing = db.query(ResumeData).first()
    if existing:
        return {"message": "Resume data already exists", "id": existing.id}

    resume = ResumeData(**DEFAULT_RESUME_DATA)
    db.add(resume)
    db.commit()
    db.refresh(resume)

    return {"message": "Default resume data initialized", "id": resume.id}


# Initialize default resume data - GET (Browser)
@router.get("/init")
def initialize_resume_data_browser(token: str = Query(...), db: Session = Depends(get_db)):
    """Browser-accessible version of /init endpoint"""
    verify_admin(token)

    existing = db.query(ResumeData).first()
    if existing:
        return {
            "message": "Resume data already exists",
            "id": existing.id,
            "full_name": existing.full_name,
        }

    resume = ResumeData(**DEFAULT_RESUME_DATA)
    db.add(resume)
    db.commit()
    db.refresh(resume)

    return {
        "message": "Default resume data initialized successfully!",
        "id": resume.id,
        "full_name": resume.full_name,
    }


# Delete resume data - DELETE (PowerShell)
@router.delete("/delete")
def delete_resume_data(token: str = Query(...), db: Session = Depends(get_db)):
    """Delete all resume data (admin only)"""
    verify_admin(token)

    deleted_count = db.query(ResumeData).delete()
    db.commit()

    return {"message": f"Deleted {deleted_count} resume record(s)"}


# Delete resume data - GET (Browser)
@router.get("/delete")
def delete_resume_data_browser(token: str = Query(...), db: Session = Depends(get_db)):
    """Browser-accessible version of /delete endpoint"""
    verify_admin(token)

    deleted_count = db.query(ResumeData).delete()
    db.commit()

    return {
        "message": f"Successfully deleted {deleted_count} resume record(s)",  # ✅ FIXED
        "action": "Delete",
        "status": "Success",
    }
