from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy import Column, Integer, String, Enum, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from passlib.context import CryptContext
from jose import JWTError, jwt
import enum
import os
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware # 02.10.2025
from . import crud # 02.10.2025
from . import schemas # 02.10.2025
from .schemas import UserCreate # 02.10.2025
from .deps import get_db  # <- добавляем импорт функции get_db
from .database import engine, SessionLocal, Base
from .models import User

# ========================
# Настройка базы данных
# ========================
# Перемещаем подключение к базе данных в deps.py
# Больше не создаем движок и сессию тут
# 02.10.2025
# DATABASE_URL = os.getenv(
#    "DATABASE_URL",
#    "postgresql+psycopg2://tmc_user:super_secret_password@db:5432/tmc_inventory"
# )
# SECRET_KEY = os.getenv("SECRET_KEY", "ultra_secret_jwt_key")
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 60

# engine = create_engine(DATABASE_URL)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Base = declarative_base()
# end 02.10.2025

# ========================
# Модель пользователя (03.10.2025 отключил т.к. есть в models)
# ========================
# class User(Base):
#    __tablename__ = "users"
#    __table_args__ = {'extend_existing': True}
#
#    id = Column(Integer, primary_key=True, index=True)
#    username = Column(String, unique=True, nullable=False)
#    hashed_password = Column(String, nullable=False)

# ========================
# Модель ТМЦ
# ========================
class StatusEnum(str, enum.Enum):
    in_repair = "В ремонте"
    issued = "Выдано"
    confirm_repair = "Подтвердить ремонт"

class InventoryItem(Base):
    __tablename__ = "inventory_items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    serial_number = Column(String, unique=True, nullable=True)
    brand = Column(String, nullable=True)
    status = Column(Enum(StatusEnum), default=StatusEnum.issued)
    responsible = Column(String, nullable=True)
    location = Column(String, nullable=True)

# ========================
# Авторизация
# ========================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# выключил здесь т.к. перенес подключение к базе данных в deps.py 02.10.2025  
# def get_db():
#    db = SessionLocal()
#    try:
#        yield db
#    finally:
#        db.close()

def get_user(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def authenticate_user(db: Session, username: str, password: str):
    user = get_user(db, username)
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Не удалось проверить учетные данные",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user(db, username)
    if user is None:
        raise credentials_exception
    return user

# ========================
# FastAPI приложение
# ========================
app = FastAPI(
    title="TMC Inventory API",
    #переключить в None на проде!
    docs_url="/docs",       # Swagger UI
    redoc_url="/redoc",     # ReDoc
    openapi_url="/openapi.json"  # JSON-схема
)

# 02.10.2025 start
origins = ["http://localhost:8000", "http://127.0.0.1:8000", "http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# 02.10.2025 end

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    # Создадим дефолтного пользователя (admin:admin), если БД пуста
    db = SessionLocal()
    if not db.query(User).first():
        user = User(username="admin", hashed_password=get_password_hash("admin"))
        db.add(user)
        db.commit()
    db.close()

# ========================
# Auth endpoints
# ========================
@app.post("/auth/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Неверное имя пользователя или пароль")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# ========================
# Регистрация нового пользователя (только admin)
# ========================
@app.post("/auth/register", response_model=schemas.UserOut)
def register_user(
    new_user: schemas.UserCreate,
    db: Session = Depends(get_db),
    current_user: schemas.UserOut = Depends(get_current_user)
):
    """
    Только администраторы могут добавлять новых пользователей.
    """
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Недостаточно прав для выполнения этой операции")
    
    # Проверяем, существует ли уже такой пользователь
    existing_user = crud.get_user_by_username(db, new_user.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="Такой пользователь уже существует")

    # Создаём нового пользователя
    db_user = crud.create_user(db, new_user)
    return db_user  

# ========================
# CRUD по ТМЦ
# ========================
@app.get("/items")
def list_items(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(InventoryItem).all()

@app.post("/items")
def add_item(item: dict, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_item = InventoryItem(
        name=item.get("name"),
        serial_number=item.get("serial_number"),
        brand=item.get("brand"),
        status=item.get("status", StatusEnum.issued),
        responsible=item.get("responsible"),
        location=item.get("location")
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

@app.put("/items/{item_id}")
def update_item(item_id: int, item: dict, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_item = db.query(InventoryItem).filter(InventoryItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")

    for key, value in item.items():
        if hasattr(db_item, key) and value is not None:
            setattr(db_item, key, value)

    db.commit()
    db.refresh(db_item)
    return db_item

@app.delete("/items/{item_id}")
def delete_item(item_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_item = db.query(InventoryItem).filter(InventoryItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")

    db.delete(db_item)
    db.commit()
    return {"message": "Item deleted"}

@app.put("/api/tmc/{tmc_id}/edit", response_model=schemas.TMCOut)
def edit_tmc_item(tmc_id: int, tmc_in: schemas.TMCUpdate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    obj = crud.update_tmc(db, tmc_id, tmc_in)
    if not obj:
        raise HTTPException(status_code=404, detail="TMC not found")
    return obj

@app.post("/api/tmc/{tmc_id}/transfer", response_model=schemas.TMCOut)
def transfer_tmc_item(tmc_id: int, new_responsible_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    obj = crud.transfer_tmc(db, tmc_id, new_responsible_id)
    if not obj:
        raise HTTPException(status_code=404, detail="TMC not found")
    return obj

@app.post("/api/tmc/{tmc_id}/send_to_service", response_model=schemas.TMCOut)
def send_tmc_to_service(tmc_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    obj = crud.send_to_service(db, tmc_id)
    if not obj:
        raise HTTPException(status_code=404, detail="TMC not found")
    return obj

@app.post("/api/tmc/{tmc_id}/return_from_service", response_model=schemas.TMCOut)
def return_tmc_from_service(tmc_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    obj = crud.return_from_service(db, tmc_id)
    if not obj:
        raise HTTPException(status_code=404, detail="TMC not found")
    return obj
