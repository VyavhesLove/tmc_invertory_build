import os
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from .crud import get_user_by_username #02.10.2025

# CryptContext — можно использовать argon2 или bcrypt
pwd_context = CryptContext(schemes=["argon2", "bcrypt"], deprecated="auto")
# Или если не ставите argon2: CryptContext(schemes=["bcrypt"], ...)

PEPPER = os.getenv("PEPPER", "")  # хранится в Docker secret / env
JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret")  # хранится в secret
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def hash_password(password: str) -> str:
    return pwd_context.hash(password + PEPPER)

# старая функция
# def verify_password(plain_password: str, hashed_password: str) -> bool:
#     return pwd_context.verify(plain_password + PEPPER, hashed_password)

#02.10.2025
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(db: Session, username: str, password: str):
    """
    Проверяет существование пользователя и корректность пароля.
    """
    user = get_user_by_username(db, username)
    if not user:
        return None  # Пользователь не найден
    if not verify_password(password, user.hashed_password):
        return None  # Пароль неверный
    return user
#02.10.2025 end

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    now = datetime.utcnow()
    if expires_delta:
        expire = now + expires_delta
    else:
        expire = now + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire, "iat": now})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET, algorithm=ALGORITHM)
    return encoded_jwt

def decode_token(token: str):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
