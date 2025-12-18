from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uvicorn

from .database import get_db, engine, Base
from .models.project import Project
from .routers import chatbot
from .routes import admin, blog, resume  # Add blog

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Digital Empire API",
    description="Backend for your portfolio ecosystem with admin controls",
    version="2.0.0"
)

# CORS - Allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chatbot.router)  # Chatbot routes
app.include_router(admin.router)    # Admin routes
app.include_router(blog.router)     # Add this
app.include_router(resume.router)  # Add this


@app.get("/")
async def root():
    return {
        "message": "Welcome to Digital Empire API",
        "status": "operational",
        "version": "2.0.0"
    }

@app.get("/api/projects")
async def get_projects(db: Session = Depends(get_db)):
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

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
