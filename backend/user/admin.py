from django.contrib import admin
from .models import UserProfile, CourseReview

# Register your models here.

admin.site.register(UserProfile)
admin.site.register(CourseReview)
