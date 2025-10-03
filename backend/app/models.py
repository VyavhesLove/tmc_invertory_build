from sqlalchemy import Boolean, Column, Integer, String, Enum, ForeignKey, Text
from sqlalchemy.orm import relationship
from .database import Base
import enum

class TMCStatus(str, enum.Enum):
    in_repair = "В ремонте"
    issued = "Выдано"
    confirm_repair = "Подтвердить ремонт"
    available = "Доступно"

class TMC(Base):
    __tablename__ = "tmc"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    serial_number = Column(String, unique=True, index=True, nullable=True)
    brand = Column(String, index=True)
    type = Column(String)
    model = Column(String)
    status = Column(Enum(TMCStatus), default=TMCStatus.available)
    responsible_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    location = Column(String, nullable=True)
    comment = Column(Text, nullable=True)

    responsible = relationship("User", back_populates="tmc_items")

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=True)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True) # (Integer, default=1)
    is_admin = Column(Boolean, default=False) # (Integer, default=0)

    tmc_items = relationship("TMC", back_populates="responsible")
