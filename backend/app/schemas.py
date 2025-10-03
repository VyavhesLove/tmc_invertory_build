from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    username: str
    email: Optional[EmailStr] = None  # пусть по умолчанию будет None

class UserCreate(UserBase):
    password: str
    is_admin: bool = False

class UserOut(UserBase):
    id: int
    is_admin: bool # int
    class Config:
        orm_mode = True

class TMCBase(BaseModel):
    name: str
    serial_number: Optional[str]
    brand: Optional[str]
    type: Optional[str]
    model: Optional[str]
    location: Optional[str]

class TMCCreate(TMCBase):
    pass

class TMCUpdate(TMCBase):
    status: Optional[str]
    responsible_id: Optional[int]
    comment: Optional[str]

class TMCOut(TMCBase):
    id: int
    status: str
    responsible_id: Optional[int]
    comment: Optional[str]
    class Config:
        orm_mode = True
