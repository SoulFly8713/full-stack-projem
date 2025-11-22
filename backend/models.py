from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

# User Models
class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class UserLogin(UserBase):
    password: str

class User(UserBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    role: str = "user"  # user or admin
    isCustomer: bool = False
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "username": "testuser",
                "role": "user",
                "isCustomer": False
            }
        }

class UserInDB(User):
    password: str

class UserResponse(BaseModel):
    id: str
    username: str
    role: str
    isCustomer: bool

# Project Models
class ProjectBase(BaseModel):
    title: str
    description: str
    videoUrl: Optional[str] = None
    videoId: Optional[str] = None
    category: str
    featured: bool = False
    isService: bool = False

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "title": "NPC Destekli Eğitim",
                "description": "Roblox Studio projesi",
                "videoUrl": "https://youtu.be/uJKXUEYjMto",
                "videoId": "uJKXUEYjMto",
                "category": "Simülasyon",
                "featured": True,
                "isService": False
            }
        }

# Testimonial Models
class TestimonialBase(BaseModel):
    content: str
    rating: int = Field(ge=1, le=5)

class TestimonialCreate(TestimonialBase):
    pass

class Testimonial(TestimonialBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    userId: str
    author: str
    role: str = "Müşteri"
    isCustomer: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "userId": "user123",
                "author": "Ahmet Y.",
                "role": "Müşteri",
                "content": "Harika bir çalışma!",
                "rating": 5,
                "isCustomer": True
            }
        }

# Settings Models
class SettingsBase(BaseModel):
    title: str
    bio: str
    skills: List[str]
    discord: str

class Settings(SettingsBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "id": "settings",
                "title": "Roblox Script Developer",
                "bio": "Profesyonel script geliştirme",
                "skills": ["Lua", "Roblox Studio"],
                "discord": "soulfly871"
            }
        }

# Auth Response Models
class LoginResponse(BaseModel):
    user: UserResponse
    token: str
    message: str

class RegisterResponse(BaseModel):
    user: UserResponse
    message: str

# Update Models
class UpdateCustomerStatus(BaseModel):
    isCustomer: bool