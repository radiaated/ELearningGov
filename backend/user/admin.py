from django.contrib import admin
from .models import UserProfile, CoursePurchase, CourseReview

# Register your models here.

admin.site.register(UserProfile)
admin.site.register(CoursePurchase)
admin.site.register(CourseReview)
