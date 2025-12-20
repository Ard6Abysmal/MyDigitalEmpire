from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uvicorn

from .database import get_db, engine, Base
from .models.project import Project
from .routers import chatbot
from .routes import admin, blog, resume
from .routes import projects  # NEW - Add this import

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
app.include_router(blog.router)     # Blog routes
app.include_router(resume.router)   # Resume routes
app.include_router(projects.router) # NEW - Public projects routes (including detail endpoint)

@app.get("/")
async def root():
    return {
        "message": "Welcome to Digital Empire API",
        "status": "operational",
        "version": "2.0.0"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}

# REMOVED: The old /api/projects endpoint is now handled by routes/projects.py
# This avoids duplication and keeps all project routes in one place

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
