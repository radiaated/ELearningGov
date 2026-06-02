from rest_framework import serializers
from .models import CoursePurchase


class CoursePurchaseSerializer(serializers.ModelSerializer):
    title = serializers.ReadOnlyField(source="online_course.title")
    description = serializers.ReadOnlyField(source="online_course.description")
    thumbnail = serializers.ImageField(source="online_course.thumbnail")
    price = serializers.ReadOnlyField(source="online_course.price")
    category = serializers.ReadOnlyField(source="online_course.category")
    slug = serializers.ReadOnlyField(source="online_course.slug")

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
