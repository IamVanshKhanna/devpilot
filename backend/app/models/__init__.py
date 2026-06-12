"""Database models for DevPilot."""
from sqlalchemy import create_engine, Column, String, Integer, Boolean, DateTime, Float, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime, timezone

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    github_id = Column(Integer, unique=True, nullable=False)
    github_username = Column(String(255), nullable=False)
    email = Column(String(255), nullable=True)
    plan = Column(String(50), default="free")  # free, starter, pro, enterprise
    stripe_customer_id = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    repos = relationship("Repo", back_populates="owner")


class Repo(Base):
    __tablename__ = "repos"

    id = Column(Integer, primary_key=True, autoincrement=True)
    github_repo_id = Column(Integer, unique=True, nullable=False)
    full_name = Column(String(500), nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    plan = Column(String(50), default="free")
    active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    owner = relationship("User", back_populates="repos")
    reviews = relationship("Review", back_populates="repo")


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, autoincrement=True)
    repo_id = Column(Integer, ForeignKey("repos.id"), nullable=False)
    pr_number = Column(Integer, nullable=False)
    pr_title = Column(String(500), nullable=True)
    comments_count = Column(Integer, default=0)
    issues_found = Column(Integer, default=0)
    accepted_count = Column(Integer, default=0)
    rejected_count = Column(Integer, default=0)
    duration_seconds = Column(Float, nullable=True)
    status = Column(String(50), default="completed")  # queued, processing, completed, failed
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    repo = relationship("Repo", back_populates="reviews")
    comments = relationship("ReviewComment", back_populates="review")


class ReviewComment(Base):
    __tablename__ = "review_comments"

    id = Column(Integer, primary_key=True, autoincrement=True)
    review_id = Column(Integer, ForeignKey("reviews.id"), nullable=False)
    file_path = Column(String(1000), nullable=False)
    line_number = Column(Integer, nullable=True)
    severity = Column(String(50), default="info")  # info, warning, error, critical
    category = Column(String(100), nullable=True)  # bug, security, style, performance
    message = Column(Text, nullable=False)
    suggestion = Column(Text, nullable=True)
    accepted = Column(Boolean, nullable=True)  # None = pending, True = accepted, False = rejected
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    review = relationship("Review", back_populates="comments")


class TeamLearning(Base):
    __tablename__ = "team_learning"

    id = Column(Integer, primary_key=True, autoincrement=True)
    repo_id = Column(Integer, ForeignKey("repos.id"), nullable=False)
    pattern_type = Column(String(100), nullable=False)
    pattern_value = Column(Text, nullable=False)
    weight = Column(Float, default=1.0)
    occurrences = Column(Integer, default=1)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))