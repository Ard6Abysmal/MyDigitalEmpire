import sys
import os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.database import SessionLocal
from app.models.project import Project

def seed_projects():
    db = SessionLocal()

    # Check if data already exits
    existing_count = db.query(Project).count()
    if existing_count > 0:
        print(f"Database already has {existing_count} projects!")
        print("Run this to clear: python -c 'from app.database import *; from app.models import *; SessionLocal().query(Project).delete(); SessionLocal().commit()'")
        db.close()
        return
    
    projects = [
        Project(
            name="AI Chatbot",
            category="AI/ML",
            status="In Development",
            description="Intelligent assistant for all websites.",
            tech=["Python", "FastAPI", "OpenAI"]
        ),
        Project(
            name="Manga Reader",
            category="Web App",
            status="Planned",
            description="Custom manga reading platform",
            tech=["React", "CDN", "PostgreSQL"]
        ),
        Project(
            name="3D Gaming Site",
            category="Game Dev",
            status="Concept",
            description="Browser-based 3D game showcase",
            tech=["Three.js", "WebGL", "FastAPI"]
        ),
        Project(
            name="Blockchain Tokens",
            category="Blockchain",
            status="Research",
            description="Gaming achievement token system",
            tech=["Python", "Web3.py", "Ethereum"]
        ),
    ]

    db.add_all(projects)
    db.commit()
    print(f"Successfully added {len(projects)} projects to database!")

    # Verify
    all_projects = db.query(Project).all()
    print("\nProjects in database:")
    for p in all_projects:
        print(f" {p.id}. {p.name} ({p.status})")

    db.close()

if __name__ == "__main__":
    seed_projects()