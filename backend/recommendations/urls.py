from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'meals', views.MealViewSet)
router.register(r'profiles', views.UserProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('interactions/', views.log_interaction, name='log_interaction'),
    path('popular/', views.popular_meals, name='popular_meals'),
    path('personalized/', views.personalized_recommendations, name='personalized'),
    path('similar/<int:meal_id>/', views.similar_meals, name='similar_meals'),
    path('profile/', views.user_profile, name='user_profile'),
    path('profile/update/', views.update_profile, name='update_profile'),
    path('evaluation/', views.evaluation_metrics, name='evaluation'),
]
