from sqlalchemy.orm import Session

import models
import schemas

"""
    vacancy orm
"""


def mapping_from_schemas_to_models(schemas_model: schemas.VacancyModel, db: Session):
    model = get_vacancy_by_id(db, schemas_model.id)

    if model is None:
        model = models.Vacancy(id=schemas_model.id)

    model.experience = schemas_model.experience
    model.experience_id = schemas_model.experience_id
    model.salary_currency = schemas_model.salary_currency
    model.salary_to = schemas_model.salary_to
    model.salary_from = schemas_model.salary_from
    model.employer = schemas_model.employer
    model.name = schemas_model.name
    model.is_archived = schemas_model.is_archived
    model.professional_roles = schemas_model.professional_roles

    return model


def create_vacancy(db: Session, vacancy: schemas.VacancyModel):
    db_vacancy = mapping_from_schemas_to_models(vacancy, db)

    db.add(db_vacancy)
    db.commit()
    db.refresh(db_vacancy)
    return db_vacancy


def get_all_vacancies(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Vacancy).offset(skip).limit(limit).all()


def get_vacancy_by_id(db: Session, vacancy_id: int):
    return db.get(models.Vacancy, vacancy_id)


def update_vacancies(db: Session, vacancy: schemas.VacancyModel):
    mapping_from_schemas_to_models(vacancy, db)
    db.commit()


def get_filtered_vacancies(db: Session, filters: schemas.Filter):
    query = db.query(models.Vacancy)

    if filters.experience:
        query = query.filter(models.Vacancy.experience_id == filters.experience)

    if filters.text:
        query = query.filter(
            (models.Vacancy.name.ilike(f"%{filters.text}%")) |
            (models.Vacancy.employer.ilike(f"%{filters.text}%"))
        )

    if filters.professional_role:
        for r in filters.professional_role:
            query = query.filter(models.Vacancy.professional_roles.contains(filters.professional_role))

    if filters.salary:
        query = query.filter(
            (models.Vacancy.salary_from >= filters.salary) | (models.Vacancy.salary_to <= filters.salary))

    if filters.only_with_salary:
        query = query.filter((models.Vacancy.salary_from is not None) | (models.Vacancy.salary_to is not None))

    if filters.currency:
        query = query.filter(models.Vacancy.salary_currency == filters.currency)

    filtered_vacancies = query.all()

    return filtered_vacancies


"""
    category orm
"""


def get_all_categories(db: Session):
    return db.query(models.Category).all()


def get_category_by_id(db: Session, category_id: int):
    return db.get(models.Category, category_id)


def create_category(db: Session, category: schemas.Category):
    c = get_category_by_id(db, category.id)
    if c:
        return c

    cat = models.Category(id=category.id)
    cat.name = category.name

    db.add(cat)
    db.commit()
    db.refresh(cat)
    return cat


"""
    role orm
"""


def get_all_roles_by_category(db: Session, category_id: int):
    return db.query(models.Role).filter(models.Role.category_id == category_id).all()


def get_role_by_id(db: Session, role_id: int):
    return db.get(models.Role, role_id)


def create_role(db: Session, role: schemas.Role):
    r = get_role_by_id(db, role.id)

    if r:
        return r

    r = models.Role(id=role.id)
    r.name = role.name
    r.category = get_category_by_id(db, role.category_id)

    db.add(r)
    db.commit()
    db.refresh(r)
    return r
