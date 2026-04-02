import os
import random

import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "refood.settings")
django.setup()

from django.contrib.auth.models import User
from recommendations.models import Meal, UserInteraction, UserProfile


RANDOM_SEED = 2026
DEMO_USER_PREFIX = "demo_user_"
DEMO_PASSWORD = "demo123456"
DEMO_USER_COUNT = 40


def ensure_demo_users(categories):
    users = []
    for i in range(1, DEMO_USER_COUNT + 1):
        username = f"{DEMO_USER_PREFIX}{i}"
        email = f"{username}@refood.local"
        user, created = User.objects.get_or_create(
            username=username,
            defaults={
                "email": email,
                "first_name": f"Demo{i}",
                "last_name": "User",
            },
        )
        if created:
            user.set_password(DEMO_PASSWORD)
            user.save(update_fields=["password"])

        fav_count = random.randint(1, min(3, len(categories))) if categories else 0
        favorite_categories = random.sample(categories, k=fav_count) if fav_count else []

        profile, _ = UserProfile.objects.get_or_create(user=user)
        profile.favorite_categories = favorite_categories
        profile.dietary_restrictions = []
        profile.save(update_fields=["favorite_categories", "dietary_restrictions"])

        users.append(user)

    return users


def seed_interactions(users, meals):
    demo_user_ids = [u.id for u in users]
    UserInteraction.objects.filter(user_id__in=demo_user_ids).delete()

    interaction_objects = []
    for user in users:
        viewed_meals = random.sample(meals, k=min(len(meals), random.randint(12, 20)))
        for meal in viewed_meals:
            interaction_objects.append(
                UserInteraction(
                    user=user,
                    meal=meal,
                    interaction_type="view",
                    duration=random.randint(5, 180),
                )
            )

        cart_meals = random.sample(
            viewed_meals, k=min(len(viewed_meals), random.randint(5, 10))
        )
        for meal in cart_meals:
            interaction_objects.append(
                UserInteraction(
                    user=user,
                    meal=meal,
                    interaction_type="add_to_cart",
                    duration=0,
                )
            )

        purchased_meals = random.sample(
            cart_meals, k=min(len(cart_meals), random.randint(3, 7))
        )
        for meal in purchased_meals:
            interaction_objects.append(
                UserInteraction(
                    user=user,
                    meal=meal,
                    interaction_type="purchase",
                    duration=0,
                )
            )

        hovered_meals = random.sample(
            viewed_meals, k=min(len(viewed_meals), random.randint(4, 8))
        )
        for meal in hovered_meals:
            interaction_objects.append(
                UserInteraction(
                    user=user,
                    meal=meal,
                    interaction_type="hover",
                    duration=random.randint(2, 15),
                )
            )

    UserInteraction.objects.bulk_create(interaction_objects)


def rebuild_meal_popularity_fields(meals):
    for meal in meals:
        meal.view_count = UserInteraction.objects.filter(
            meal=meal, interaction_type="view"
        ).count()
        meal.purchase_count = UserInteraction.objects.filter(
            meal=meal, interaction_type="purchase"
        ).count()
    Meal.objects.bulk_update(meals, ["view_count", "purchase_count"])


def main():
    random.seed(RANDOM_SEED)

    meals = list(Meal.objects.all())
    if not meals:
        print("Khong co du lieu mon an. Hay chay populate_db.py truoc.")
        return

    categories = sorted({m.category for m in meals if m.category})
    users = ensure_demo_users(categories)
    seed_interactions(users, meals)
    rebuild_meal_popularity_fields(meals)

    total_users = len(users)
    total_interactions = UserInteraction.objects.filter(
        user__username__startswith=DEMO_USER_PREFIX
    ).count()
    top_meals = Meal.objects.order_by("-purchase_count", "-view_count")[:5]

    print("=== Seed admin demo data hoan tat ===")
    print(f"Demo users: {total_users}")
    print(f"Demo interactions: {total_interactions}")
    print("Top 5 mon an theo luot mua/luot xem:")
    for idx, meal in enumerate(top_meals, start=1):
        print(
            f"{idx}. {meal.name} | views={meal.view_count} | purchases={meal.purchase_count}"
        )


if __name__ == "__main__":
    main()
