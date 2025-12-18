import sys
from pathlib import Path

# Add parent directory to Python path
sys.path.append(str(Path(__file__).parent))

from app.database import Base, engine
from app.models.project import Project
from app.models.chat_message import ChatMessage
from app.models.resume import ResumeData  # Add this import

def init_database():
    """Initialize database with all tables"""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully!")

    # List created tables
    from sqlalchemy import inspect
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    
    print("\n📊 Tables in database:")
    for table in tables:
        print(f"  ✓ {table}")

if __name__ == "__main__":
    init_database()
    
# from app.database import engine, Base
# from app.models import Project, ChatMessage

# def init_database():
#     """Create all tables"""
#     print("Creating database tables...")
#     Base.metadata.create_all(bind=engine)
#     print("Database tables created successfully!")

# if __name__ == "__main__":
#     init_database()