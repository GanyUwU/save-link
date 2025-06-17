# routers/links.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas, database

router = APIRouter()

@router.post("/", response_model=schemas.LinkResponse)
def create_link(link: schemas.LinkCreate, db: Session = Depends(database.get_db)):
    # Optional: check if URL already exists for this user
    db_link = models.Link(url=link.url , user_id=1)  # Assuming user_id=1 for demo purposes; replace with actual user ID logic
    db.add(db_link)
    db.commit()
    db.refresh(db_link)
    return db_link

@router.get("/{link_id}", response_model=schemas.LinkResponse)
def get_link(link_id: int, db: Session = Depends(database.get_db)):
    db_link = db.query(models.Link).filter(models.Link.id == link_id).first()
    if not db_link:
        raise HTTPException(status_code=404, detail="Link not found")
    return db_link


@router.patch("/{link_id}", response_model=schemas.LinkResponse)
def update_link(link_id: int, link: schemas.LinkUpdate, db: Session = Depends(database.get_db)):
    db_link = db.query(models.Link).filter(models.Link.id == link_id).first()
    if not db_link:
        raise HTTPException(status_code=404, detail="Link not found")

    for key, value in link.dict(exclude_unset=True).items():
        setattr(db_link, key, value)

    db.commit()
    db.refresh(db_link)
    return db_link







