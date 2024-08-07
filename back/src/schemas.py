from pydantic import BaseModel
from typing import Optional, Union


class VacancyModel(BaseModel):
    id: Optional[int] = None
    name: Optional[str] = None
    experience: Optional[str] = None
    experience_id: Optional[str] = None
    employer: Optional[str] = None
    salary_from: Optional[int] = None
    salary_to: Optional[int] = None
    salary_currency: Optional[str] = None
    is_archived: bool = False
    professional_roles: list[str] = []


class Filter(BaseModel):
    text: Optional[str] = None
    salary: Optional[int] = None
    currency: Optional[str] = None
    only_with_salary: bool = False
    page: int = 0
    professional_role: list[str] = []
    experience: Optional[str] = None


class Category(BaseModel):
    id: int
    name: str


class Role(BaseModel):
    id: int
    name: str
    category_id: int
