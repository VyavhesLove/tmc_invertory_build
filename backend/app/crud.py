from sqlalchemy.orm import Session
from . import models, schemas

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user_in: schemas.UserCreate, hashed_password: str):
    db_user = models.User(username=user_in.username, email=user_in.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def list_tmc(db: Session, status: str | None = None):
    q = db.query(models.TMC)
    if status:
        q = q.filter(models.TMC.status == status)
    return q.all()

def create_tmc(db: Session, tmc_in: schemas.TMCCreate):
    obj = models.TMC(**tmc_in.dict())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def update_tmc(db: Session, tmc_id: int, tmc_in: schemas.TMCUpdate):
    obj = db.query(models.TMC).get(tmc_id)
    if not obj:
        return None
    for k, v in tmc_in.dict(exclude_unset=True).items():
        setattr(obj, k, v)
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

def transfer_tmc(db: Session, tmc_id: int, new_responsible_id: int):
    obj = db.query(models.TMC).get(tmc_id)
    if not obj:
        return None
    obj.responsible_id = new_responsible_id
    db.commit()
    db.refresh(obj)
    return obj

def send_to_service(db: Session, tmc_id: int):
    obj = db.query(models.TMC).get(tmc_id)
    if not obj:
        return None
    obj.status = models.TMCStatus.in_repair
    db.commit()
    db.refresh(obj)
    return obj

def return_from_service(db: Session, tmc_id: int):
    obj = db.query(models.TMC).get(tmc_id)
    if not obj:
        return None
    obj.status = models.TMCStatus.available
    db.commit()
    db.refresh(obj)
    return obj
