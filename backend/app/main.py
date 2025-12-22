import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_swagger_ui_html, get_redoc_html
from sqlalchemy.orm import Session
import uvicorn

from .database import get_db, engine, Base
from .models.project import Project
from .routers import chatbot
from .routes import admin, blog, resume, projects

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Digital Empire API - Amal Madhu",
    description="Backend API for Amal Madhu's portfolio ecosystem with AI-powered features, resume management, and project showcase",
    version="2.0.0",
    docs_url=None,      # Disable default Swagger UI
    redoc_url=None      # Disable default ReDoc
)

# Get environment
ENV = os.getenv("ENVIRONMENT", "development")

# CORS configuration - Try to get from .env first, fallback to defaults
allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "")

if allowed_origins_env:
    # Use origins from .env (comma-separated)
    origins = [origin.strip() for origin in allowed_origins_env.split(",")]
elif ENV == "production":
    # Production fallback
    origins = [
        "https://amalmadhu.dev",
        "https://www.amalmadhu.dev",
    ]
else:
    # Development fallback
    origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://10.189.113.33:5173",
        "http://10.10.19.60:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chatbot.router)  # Chatbot routes
app.include_router(admin.router)    # Admin routes
app.include_router(blog.router)     # Blog routes
app.include_router(resume.router)   # Resume routes
app.include_router(projects.router) # Public projects routes

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Digital Empire API - Amal Madhu",
        "owner": "Amal Madhu",
        "status": "operational",
        "version": "2.0.0",
        "environment": ENV,
        "github": "https://github.com/AbyssDrn",
        "portfolio": "https://amalmadhu.dev",
        "docs": "/docs",
        "redoc": "/redoc"
    }

# Health check
@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "api": "operational",
        "database": "connected",
        "version": "2.0.0",
        "environment": ENV,
        "owner": "Amal Madhu"
    }

# Custom Swagger UI with your branding
@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html():
    return get_swagger_ui_html(
        openapi_url="/openapi.json",
        title="Digital Empire API - Interactive Documentation | Amal Madhu",
        swagger_favicon_url="https://fastapi.tiangolo.com/img/favicon.png",
        swagger_ui_parameters={
            "defaultModelsExpandDepth": -1,  # Hide schemas by default
            "syntaxHighlight.theme": "monokai"  # Dark theme for code
        }
    )

# Custom ReDoc with your branding
@app.get("/redoc", include_in_schema=False)
async def redoc_html():
    return get_redoc_html(
        openapi_url="/openapi.json",
        title="Digital Empire API - Documentation | Amal Madhu",
        redoc_favicon_url="https://fastapi.tiangolo.com/img/favicon.png",
    )

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
