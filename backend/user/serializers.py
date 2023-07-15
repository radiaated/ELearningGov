from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class UserDetailSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")
    email = serializers.ReadOnlyField(source="user.email")
    full_name = serializers.ReadOnlyField(source="user.first_name")

    class Meta:
        model = UserDetail
        fields = ['username', 'email', 'full_name', 'gender', 'address', 'phone', 'academic_level']
       



class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'

class BuyCourseSerializer(serializers.ModelSerializer):
    title = serializers.ReadOnlyField(source="online_course.title")
    description = serializers.ReadOnlyField(source="online_course.description")
    thumbnail = serializers.ImageField(source="online_course.thumbnail")
    price = serializers.ReadOnlyField(source="online_course.price")
    category = serializers.ReadOnlyField(source="online_course.category")
    slug = serializers.ReadOnlyField(source="online_course.slug")
    class Meta:
        model = BuyCourse
        fields = ['date_created', 'title', 'description', 'thumbnail', 'price', 'category', 'slug']
        


class BuyStudyMatSerializer(serializers.ModelSerializer):

    class Meta:
        model = BuyStudyMat
        fields = '__all__'


class CourseReviewSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")
   
    class Meta:
        model = CourseReview
        fields = ['id', 'username', 'date_created', 'rating', 'comment']
        

