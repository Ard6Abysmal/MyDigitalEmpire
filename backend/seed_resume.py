from app.database import SessionLocal
from app.models.resume import ResumeData

def seed_resume():
    db = SessionLocal()
    
    # Check if resume already exists
    existing = db.query(ResumeData).first()
    if existing:
        print("Resume data already exists!")
        return
    
    resume_data = ResumeData(
        full_name="Your Name",
        title="Full Stack Developer & AI/ML Engineer",
        email="your.email@example.com",
        phone="+1 (123) 456-7890",
        location="Your City, Country",
        website="https://yourwebsite.com",
        github="https://github.com/yourusername",
        linkedin="https://linkedin.com/in/yourusername",
        summary="Passionate full-stack developer with expertise in AI/ML, web development, and blockchain. Building innovative solutions that make a difference.",
        experience=[
            {
                "title": "Full Stack Developer",
                "company": "Tech Company",
                "location": "Remote",
                "start_date": "Jan 2023",
                "end_date": "Present",
                "responsibilities": [
                    "Developed full-stack web applications using React and FastAPI",
                    "Implemented AI chatbot using Groq API",
                    "Managed PostgreSQL databases and RESTful APIs"
                ]
            }
        ],
        education=[
            {
                "degree": "Bachelor of Science in Computer Science",
                "institution": "Your University",
                "start_date": "2020",
                "end_date": "2024",
                "gpa": "3.8/4.0"
            }
        ],
        skills={
            "Languages": ["Python", "JavaScript", "SQL", "C++"],
            "Frameworks": ["React", "FastAPI", "Django", "Node.js"],
            "AI/ML": ["PyTorch", "TensorFlow", "scikit-learn", "OpenCV"],
            "Tools": ["Git", "Docker", "VS Code", "Postman"]
        },
        projects=[
            {
                "name": "BlueDepth AI",
                "description": "Underwater image enhancement using UNet deep learning",
                "technologies": ["PyTorch", "Computer Vision", "CUDA"],
                "link": "https://github.com/yourusername/bluedepth"
            },
            {
                "name": "Digital Empire Portfolio",
                "description": "Full-stack portfolio with AI chatbot",
                "technologies": ["React", "FastAPI", "Groq AI"],
                "link": "https://yourwebsite.com"
            }
        ],
        certifications=[
            {
                "name": "AWS Certified Developer",
                "issuer": "Amazon Web Services",
                "date": "2024"
            }
        ]
    )
    
    db.add(resume_data)
    db.commit()
    print("✅ Resume data seeded successfully!")
    db.close()

if __name__ == "__main__":
    seed_resume()
