# # routers/links.py

# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from typing import List
# import requests
# from .. import models, schemas
# from ..database import get_db
# from .auth import get_current_user  # updated import path
# from ..routers.simple_parser import parse_simple 

# router = APIRouter( tags=["Links"])

# @router.post("/", response_model=schemas.LinkResponse)
# def create_link(
#     link: schemas.LinkCreate,
#     db: Session = Depends(get_db),
#     current_user: models.User = Depends(get_current_user)):

#     try:
#         # Call the internal parse endpoint
#         res = requests.post("http://localhost:8000/utils/parse", json={"url": link.url})
#         metadata = res.json() if res.status_code == 200 else {}
#     except Exception as e:
#         metadata = {}

#     db_link = models.Link(
#         url=link.url,
#         title=metadata.get("title"),
#         image_url=metadata.get("image"),
#         domain=metadata.get("domain"),
#         summary=metadata.get("summary"),
#         user_id=current_user.id
#     )
#     db.add(db_link)
#     db.commit()
#     db.refresh(db_link)
#     return db_link

# @router.get("/", response_model=List[schemas.LinkResponse])
# def read_links(
#     db: Session = Depends(get_db),
#     current_user: models.User = Depends(get_current_user)
# ):
#     """
#     Retrieve all links belonging to the authenticated user.
#     """
#     return (
#         db.query(models.Link)
#           .filter(models.Link.user_id == current_user.id)
#           .all()
#     )

# @router.get("/{link_id}", response_model=schemas.LinkResponse)
# def get_link(
#     link_id: int,
#     db: Session = Depends(get_db),
#     current_user: models.User = Depends(get_current_user)
# ):
#     """
#     Fetch a single link by ID, ensuring it belongs to the authenticated user.
#     """
#     db_link = (
#         db.query(models.Link)
#           .filter(
#               models.Link.id == link_id,
#               models.Link.user_id == current_user.id
#           )
#           .first()
#     )
#     if not db_link:
#         raise HTTPException(status_code=404, detail="Link not found")
#     return db_link

# @router.patch("/{link_id}", response_model=schemas.LinkResponse)
# def update_link(
#     link_id: int,
#     link: schemas.LinkUpdate,
#     db: Session = Depends(get_db),
#     current_user: models.User = Depends(get_current_user)
# ):
#     """
#     Update fields of an existing link, only for the authenticated user's link.
#     - Uses LinkUpdate schema to accept partial updates.
#     """
#     db_link = (
#         db.query(models.Link)
#           .filter(
#               models.Link.id == link_id,
#               models.Link.user_id == current_user.id
#           )
#           .first()
#     )
#     if not db_link:
#         raise HTTPException(status_code=404, detail="Link not found")

#     # Apply only provided fields
#     for key, value in link.dict(exclude_unset=True).items():
#         setattr(db_link, key, value)

#     db.commit()
#     db.refresh(db_link)
#     return db_link

# @router.delete("/{link_id}")
# def delete_link(
#     link_id: int,
#     db: Session = Depends(get_db),
#     current_user: models.User = Depends(get_current_user)
# ):
#     """
#     Delete a link owned by the authenticated user.
#     """
#     db_link = (
#         db.query(models.Link)
#           .filter(
#               models.Link.id == link_id,
#               models.Link.user_id == current_user.id
#           )
#           .first()
#     )
#     if not db_link:
#         raise HTTPException(status_code=404, detail="Link not found")
#     db.delete(db_link)
#     db.commit()
#     return {"detail": "Link deleted"}

# @router.get("/", response_model=List[schemas.LinkResponse])
# def read_links(
#     db: Session = Depends(get_db),
#     current_user: models.User = Depends(get_current_user)
# ):
#     return db.query(models.Link).filter(models.Link.user_id == current_user.id).all()


# backend/routers/links.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db
from .auth import get_current_user       # your auth dependency
from ..routers.simple_parser import parse_simple, SimpleParseRequest

router = APIRouter(prefix="/links", tags=["Links"])

@router.post("/", response_model=schemas.LinkResponse)
def create_link(
    link_in: schemas.LinkCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    # 1. Run the simple parser directly
    parse_req = SimpleParseRequest(url=link_in.url)
    parsed = parse_simple(parse_req)

    # 2. Build the ORM object
    db_link = models.Link(
        url         = link_in.url,
        title       = parsed.title,
        image_url   = parsed.image,      # simple_parser returns `.image`
        domain      = parsed.domain,
        # if your Link model/schema has a `description` field:
        description = getattr(parsed, "description", None),
        summary=getattr(parsed, "summary", None),
        tags=getattr(parsed, "tags", []),
        user_id     = current_user.id
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
    link_in: schemas.LinkUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Update fields of an existing link.
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

    for key, value in link_in.dict(exclude_unset=True).items():
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
