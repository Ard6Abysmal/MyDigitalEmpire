import os
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

from ..database import get_db
from ..models.blog import BlogPost

# Load environment variables
load_dotenv()

router = APIRouter(prefix="/api/blog", tags=["blog"])

# Schemas
class BlogPostCreate(BaseModel):
    title: str
    slug: str
    content: str
    excerpt: str | None = None
    category: str | None = None
    tags: str | None = None
    image_url: str | None = None
    published: bool = False
    featured: bool = False

class BlogPostUpdate(BaseModel):
    title: str | None = None
    slug: str | None = None
    content: str | None = None
    excerpt: str | None = None
    category: str | None = None
    tags: str | None = None
    image_url: str | None = None
    published: bool | None = None
    featured: bool | None = None

# Admin token from environment variable
ADMIN_TOKEN = os.getenv("ADMIN_TOKEN", "fallback-token-12345")

def verify_admin(token: str):
    if token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Unauthorized")

# Public routes
@router.get("/posts")
def get_published_posts(
    skip: int = 0,
    limit: int = 10,
    category: str | None = None,
    db: Session = Depends(get_db)
):
    query = db.query(BlogPost).filter(BlogPost.published == True)
    
    if category:
        query = query.filter(BlogPost.category == category)
    
    posts = query.order_by(BlogPost.created_at.desc()).offset(skip).limit(limit).all()
    
    return {
        "posts": [
            {
                "id": p.id,
                "title": p.title,
                "slug": p.slug,
                "excerpt": p.excerpt,
                "category": p.category,
                "tags": p.tags.split(",") if p.tags else [],
                "image_url": p.image_url,
                "author": p.author,
                "featured": p.featured,
                "views": p.views,
                "created_at": p.created_at.isoformat(),
            }
            for p in posts
        ]
    }

@router.get("/posts/{slug}")
def get_post_by_slug(slug: str, db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter(BlogPost.slug == slug).first()
    
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Increment views
    post.views += 1
    db.commit()
    
    return {
        "id": post.id,
        "title": post.title,
        "slug": post.slug,
        "content": post.content,
        "excerpt": post.excerpt,
        "category": post.category,
        "tags": post.tags.split(",") if post.tags else [],
        "image_url": post.image_url,
        "author": post.author,
        "views": post.views,
        "created_at": post.created_at.isoformat(),
        "updated_at": post.updated_at.isoformat() if post.updated_at else None,
    }

# Admin routes
@router.get("/admin/posts")
def admin_get_all_posts(token: str, db: Session = Depends(get_db)):
    verify_admin(token)
    posts = db.query(BlogPost).order_by(BlogPost.created_at.desc()).all()
    
    return {
        "posts": [
            {
                "id": p.id,
                "title": p.title,
                "slug": p.slug,
                "excerpt": p.excerpt,
                "category": p.category,
                "published": p.published,
                "featured": p.featured,
                "views": p.views,
                "created_at": p.created_at.isoformat(),
            }
            for p in posts
        ]
    }

@router.post("/admin/posts")
def admin_create_post(
    post: BlogPostCreate,
    token: str,
    db: Session = Depends(get_db)
):
    verify_admin(token)
    
    db_post = BlogPost(**post.dict())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    
    return {"message": "Post created", "post_id": db_post.id}

@router.put("/admin/posts/{post_id}")
def admin_update_post(
    post_id: int,
    post: BlogPostUpdate,
    token: str,
    db: Session = Depends(get_db)
):
    verify_admin(token)
    
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    update_data = post.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_post, key, value)
    
    db.commit()
    return {"message": "Post updated"}

@router.delete("/admin/posts/{post_id}")
def admin_delete_post(post_id: int, token: str, db: Session = Depends(get_db)):
    verify_admin(token)
    
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    db.delete(db_post)
    db.commit()
    
    return {"message": "Post deleted"}
