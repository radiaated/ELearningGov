from rest_framework import serializers
from .models import CoursePurchase


class CoursePurchaseSerializer(serializers.ModelSerializer):
    title = serializers.ReadOnlyField(source="course.title")
    description = serializers.ReadOnlyField(source="course.description")
    thumbnail = serializers.ImageField(source="course.thumbnail")
    price = serializers.ReadOnlyField(source="course.price")
    category = serializers.ReadOnlyField(source="course.category")
    slug = serializers.ReadOnlyField(source="course.slug")

    class Meta:
        model = CoursePurchase
        fields = [
            "date_created",
            "title",
            "description",
            "thumbnail",
            "price",
            "category",
            "slug",
        ]
