from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Meal, UserProfile, UserInteraction

class MealModelTest(TestCase):
    def setUp(self):
        self.meal = Meal.objects.create(
            name="Test Meal",
            description="A test meal",
            price=10.99,
            category="Test Category",
            ingredients="Test ingredients"
        )

    def test_meal_creation(self):
        self.assertEqual(self.meal.name, "Test Meal")
        self.assertEqual(self.meal.price, 10.99)

    def test_meal_str(self):
        self.assertEqual(str(self.meal), "Test Meal")

class UserProfileModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.profile = UserProfile.objects.create(user=self.user)

    def test_profile_creation(self):
        self.assertEqual(self.profile.user.username, 'testuser')

class MealAPITest(APITestCase):
    def setUp(self):
        self.meal = Meal.objects.create(
            name="API Test Meal",
            description="A test meal for API",
            price=15.99,
            category="API Category",
            ingredients="API ingredients"
        )

    def test_get_meals(self):
        url = reverse('meal-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreater(len(response.data), 0)

    def test_get_meal_detail(self):
        url = reverse('meal-detail', args=[self.meal.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "API Test Meal")

class UserInteractionTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.meal = Meal.objects.create(
            name="Interaction Meal",
            description="Meal for interaction test",
            price=20.00,
            category="Interaction",
            ingredients="Test ingredients"
        )

    def test_log_interaction_requires_auth(self):
        url = reverse('log_interaction')
        response = self.client.post(url, {
            'meal': self.meal.id,
            'interaction_type': 'view'
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_log_interaction_authenticated(self):
        self.client.force_authenticate(user=self.user)
        url = reverse('log_interaction')
        response = self.client.post(url, {
            'meal': self.meal.id,
            'interaction_type': 'view'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
