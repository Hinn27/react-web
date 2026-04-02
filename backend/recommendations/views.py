from django.core.cache import cache
from django.conf import settings
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import Meal, UserInteraction, UserProfile
from .serializers import MealSerializer, UserInteractionSerializer, UserProfileSerializer
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from django.db.models import Count, Avg
from collections import defaultdict

class MealViewSet(viewsets.ModelViewSet):
    queryset = Meal.objects.all()
    serializer_class = MealSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def log_interaction(request):
    serializer = UserInteractionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        # Update meal stats
        meal = serializer.validated_data['meal']
        if serializer.validated_data['interaction_type'] == 'view':
            meal.view_count += 1
        elif serializer.validated_data['interaction_type'] == 'purchase':
            meal.purchase_count += 1
        meal.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def popular_meals(request):
    cache_key = 'popular_meals'
    try:
        cached_data = cache.get(cache_key)
        if cached_data:
            return Response(cached_data)
    except Exception:
        cached_data = None

    meals = Meal.objects.order_by('-purchase_count', '-view_count', '-created_at')[:10]
    serializer = MealSerializer(meals, many=True)
    try:
        cache.set(cache_key, serializer.data, getattr(settings, 'CACHE_TTL', 900))
    except Exception:
        pass
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def personalized_recommendations(request):
    user = request.user
    # Get user's interactions
    interactions = UserInteraction.objects.filter(user=user)

    if not interactions.exists():
        # Cold start: return popular meals
        return popular_meals(request)

    # Collaborative filtering
    recommendations = collaborative_filtering(user)
    serializer = MealSerializer(recommendations, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def similar_meals(request, meal_id):
    try:
        meal = Meal.objects.get(id=meal_id)
        # Simple similarity based on category
        similar = Meal.objects.filter(category=meal.category).exclude(id=meal_id)[:5]
        serializer = MealSerializer(similar, many=True)
        return Response(serializer.data)
    except Meal.DoesNotExist:
        return Response({'error': 'Meal not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    try:
        profile = UserProfile.objects.get(user=request.user)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)
    except UserProfile.DoesNotExist:
        return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    profile, created = UserProfile.objects.get_or_create(user=request.user)
    serializer = UserProfileSerializer(profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def collaborative_filtering(user):
    # Simple user-user collaborative filtering
    all_users = User.objects.all()
    user_interactions = {}

    for u in all_users:
        interactions = UserInteraction.objects.filter(user=u)
        ratings = {}
        for inter in interactions:
            # Convert interaction to rating
            rating = implicit_to_rating(inter.interaction_type, inter.duration)
            ratings[inter.meal.id] = rating
        user_interactions[u.id] = ratings

    if user.id not in user_interactions or not user_interactions[user.id]:
        return Meal.objects.order_by('-purchase_count')[:10]

    # Find similar users
    similarities = {}
    for other_user_id, other_ratings in user_interactions.items():
        if other_user_id == user.id:
            continue
        sim = calculate_similarity(user_interactions[user.id], other_ratings)
        similarities[other_user_id] = sim

    # Get top similar users
    similar_users = sorted(similarities.items(), key=lambda x: x[1], reverse=True)[:5]

    # Recommend meals from similar users
    recommended_meals = set()
    for sim_user_id, _ in similar_users:
        sim_interactions = UserInteraction.objects.filter(user_id=sim_user_id)
        for inter in sim_interactions:
            if inter.meal.id not in user_interactions[user.id]:
                recommended_meals.add(inter.meal.id)

    meals = Meal.objects.filter(id__in=list(recommended_meals)[:10])
    return meals

def implicit_to_rating(interaction_type, duration=0):
    ratings = {
        'view': 1,
        'hover': 1.5,
        'add_to_cart': 3,
        'purchase': 5,
        'rate': 4,  # if explicit rating exists
    }
    base_rating = ratings.get(interaction_type, 1)
    # Adjust based on duration for views
    if interaction_type == 'view' and duration > 10:
        base_rating += 1
    return min(base_rating, 5)

def calculate_similarity(ratings1, ratings2):
    common_meals = set(ratings1.keys()) & set(ratings2.keys())
    if not common_meals:
        return 0

    diff_sum = sum((ratings1[m] - ratings2[m])**2 for m in common_meals)
    return 1 / (1 + np.sqrt(diff_sum / len(common_meals)))

@api_view(['GET'])
def evaluation_metrics(request):
    # Simple evaluation: RMSE for predicted vs actual
    # This is a placeholder - in real implementation, you'd have test data
    return Response({
        'rmse': 0.8,  # placeholder
        'precision': 0.75,
        'recall': 0.6
    })


@api_view(['GET'])
def admin_stats(request):
    return Response({
        'total_users': User.objects.count(),
        'total_interactions': UserInteraction.objects.count(),
    })
