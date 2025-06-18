# routers/links.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from .. import models, schemas
from ..database import get_db
from .auth import get_current_user  # updated import path

router = APIRouter( tags=["Links"])

@router.post("/", response_model=schemas.LinkResponse)
def create_link(
    link: schemas.LinkCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Create a new link owned by the authenticated user.
    - Validates input via LinkCreate schema.
    - Uses current_user.id for user-specific ownership.
    """
    db_link = models.Link(
        url=link.url,
        user_id=current_user.id  # assign to the authenticated user
    )
    db.add(db_link)
    db.commit()
    db.refresh(db_link)
    return db_link

@router.get("/", response_model=List[schemas.LinkResponse])
def read_links(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Retrieve all links belonging to the authenticated user.
    """
    return (
        db.query(models.Link)
          .filter(models.Link.user_id == current_user.id)
          .all()
    )

@router.get("/{link_id}", response_model=schemas.LinkResponse)
def get_link(
    link_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Fetch a single link by ID, ensuring it belongs to the authenticated user.
    """
    db_link = (
        db.query(models.Link)
          .filter(
              models.Link.id == link_id,
              models.Link.user_id == current_user.id
          )
          .first()
    )
    if not db_link:
        raise HTTPException(status_code=404, detail="Link not found")
    return db_link

@router.patch("/{link_id}", response_model=schemas.LinkResponse)
def update_link(
    link_id: int,
    link: schemas.LinkUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Update fields of an existing link, only for the authenticated user's link.
    - Uses LinkUpdate schema to accept partial updates.
    """
    db_link = (
        db.query(models.Link)
          .filter(
              models.Link.id == link_id,
              models.Link.user_id == current_user.id
          )
          .first()
    )
    if not db_link:
        raise HTTPException(status_code=404, detail="Link not found")

    # Apply only provided fields
    for key, value in link.dict(exclude_unset=True).items():
        setattr(db_link, key, value)

    db.commit()
    db.refresh(db_link)
    return db_link

@router.delete("/{link_id}")
def delete_link(
    link_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Delete a link owned by the authenticated user.
    """
    db_link = (
        db.query(models.Link)
          .filter(
              models.Link.id == link_id,
              models.Link.user_id == current_user.id
          )
          .first()
    )
    if not db_link:
        raise HTTPException(status_code=404, detail="Link not found")
    db.delete(db_link)
    db.commit()
    return {"detail": "Link deleted"}

@router.get("/", response_model=List[schemas.LinkResponse])
def read_links(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return db.query(models.Link).filter(models.Link.user_id == current_user.id).all()
