from django.db import models
from django.contrib.auth.models import User

class Meal(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.URLField(blank=True)
    category = models.CharField(max_length=100)
    ingredients = models.TextField()
    nutritional_info = models.JSONField(default=dict)
    full_description = models.TextField(blank=True)
    origin = models.CharField(max_length=100, blank=True)
    calories = models.CharField(max_length=50, blank=True)
    rating = models.FloatField(default=0)
    reviews = models.PositiveIntegerField(default=0)
    tag = models.CharField(max_length=100, blank=True)
    time = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Meal(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.URLField(blank=True)
    category = models.CharField(max_length=100)
    ingredients = models.TextField()
    nutritional_info = models.JSONField(default=dict)
    full_description = models.TextField(blank=True)
    origin = models.CharField(max_length=100, blank=True)
    calories = models.CharField(max_length=50, blank=True)
    rating = models.FloatField(default=0)
    reviews = models.PositiveIntegerField(default=0)
    tag = models.CharField(max_length=100, blank=True)
    time = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # For popularity
    view_count = models.PositiveIntegerField(default=0)
    purchase_count = models.PositiveIntegerField(default=0)

    class Meta:
        indexes = [
            models.Index(fields=['category']),
            models.Index(fields=['-purchase_count', '-view_count']),
            models.Index(fields=['rating']),
            models.Index(fields=['created_at']),
        ]

    def __str__(self):
        return self.name

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    favorite_categories = models.JSONField(default=list)  # List of category strings
    dietary_restrictions = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s profile"

class UserInteraction(models.Model):
    INTERACTION_TYPES = [
        ('view', 'View'),
        ('hover', 'Hover'),
        ('purchase', 'Purchase'),
        ('add_to_cart', 'Add to Cart'),
        ('rate', 'Rate'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    meal = models.ForeignKey(Meal, on_delete=models.CASCADE)
    interaction_type = models.CharField(max_length=20, choices=INTERACTION_TYPES)
    timestamp = models.DateTimeField(auto_now_add=True)
    duration = models.PositiveIntegerField(default=0)  # seconds for view time
    rating = models.FloatField(null=True, blank=True)  # explicit rating if any

    class Meta:
        unique_together = ('user', 'meal', 'interaction_type', 'timestamp')
        indexes = [
            models.Index(fields=['user', 'timestamp']),
            models.Index(fields=['meal', 'interaction_type']),
            models.Index(fields=['timestamp']),
        ]

    def __str__(self):
        return f"{self.user.username} {self.interaction_type} {self.meal.name}"
