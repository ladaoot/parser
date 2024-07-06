from fastapi.testclient import TestClient

from src.main import app

from unittest.mock import patch, Mock

client = TestClient(app)


def test_filters_categories_endpoint():
    with patch('main.requests.get') as mock_get:
        mock_response = Mock()
        mock_response.json.return_value = {
            "categories": [{"id": 1, "name": "Category 1", "roles": [{"id": 1, "name": "Role 1"}]}]}
        mock_get.return_value = mock_response

        response = client.get("/filters/categories")
        assert response.status_code == 200
        assert len(response.json()) > 0


def test_get_roles_by_category_endpoint():
    cat_id = "1"  # Замените на фактический идентификатор категории
    with patch('orm.get_all_roles_by_category') as mock_get_all_roles_by_category:
        mock_get_all_roles_by_category.return_value = {
            "id": 0,
            "name": "Role 1",
            "category_id": 1
        }  # Замените на фактические данные
        response = client.get(f"/filters/categories/{cat_id}")
        assert response.status_code == 200
        assert len(response.json()) > 0


def test_get_experience_endpoint():
    with patch('main.requests.get') as mock_get:
        mock_response = Mock()
        mock_response.json.return_value = {
            "experience": ["No experience", "Up to 1 year", "1-3 years"]}  # Замените на фактические данные
        mock_get.return_value = mock_response

        response = client.get("/filters/experience")
        assert response.status_code == 200
        assert len(response.json()) > 0


