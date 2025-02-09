from django.db import models
from django.contrib.auth.models import User
import os
import uuid

def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'
    return os.path.join('uploads', filename)


# Create your models here.

course_category = (
    ("tech_it", "Technology and IT"),
    ("prof_dev", "Professional Development"),
    ("creative_arts", "Creative Arts"),
    ("health_wellness", "Health and Wellness"),
    ("language", "Language Learning"),
    ("vocational_trade", "Vocational and Trade Skills"),
    ("environmental_studies", "Environmental Studies"),
    ("social_sciences", "Social Sciences"),
    ("law_studies:", "Law and Legal Studies:"),
)


class Tutor(models.Model):
    full_name = models.CharField(max_length=200, null=False, blank=False)
    def __str__(self):
        return self.full_name

class OnlineCourse(models.Model):
    slug = models.SlugField(max_length=200, null=True, blank=True)
    title = models.CharField(max_length=200, null=False, blank=False)
    author = models.CharField(max_length=200, null=True, blank=True)
    language = models.CharField(max_length=100, null=True, blank=True)
    level = models.CharField(max_length=100, null=True, blank=True)
    description = models.CharField(max_length=5000, null=False, blank=False)
    requirements = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=100, choices=course_category, null=False, blank=False)
    thumbnail = models.ImageField(upload_to=get_file_path, null=False, blank=False)
    preview_video = models.FileField(upload_to=get_file_path, null=False, blank=False)
    date_created = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    price = models.FloatField(default=0, null=False, blank=False)

    def __str__(self):
        return self.title

class Course(models.Model):
    slug = models.SlugField(max_length=200, null=True, blank=True)
    chpt = models.IntegerField(default=1, null=False, blank=False)
    online_course = models.ForeignKey(OnlineCourse, on_delete=models.CASCADE, null=False, blank=False, related_name="course_chapters")
    title = models.CharField(max_length=200, null=False, blank=False)
    description = models.CharField(max_length=5000, null=False, blank=False)
    video = models.FileField(upload_to=get_file_path, null=False, blank=False)
    date_created = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    duration = models.IntegerField(default=1, null=False, blank=False)

    def __str__(self):
        return f'{self.online_course.title}, {self.title}'

class StudyMaterial(models.Model):
    slug = models.SlugField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=100, choices=course_category, null=False, blank=False)
    title = models.CharField(max_length=200, null=False, blank=False)
    description = models.CharField(max_length=5000, null=False, blank=False)
    author = models.CharField(max_length=200, null=True, blank=True)
    language = models.CharField(max_length=100, null=True, blank=True)
    level = models.CharField(max_length=100, null=True, blank=True)
    dw_count = models.IntegerField(default=1, null=True, blank=True)
    thumbnail = models.ImageField(upload_to=get_file_path, null=False, blank=False)
    file = models.FileField(upload_to=get_file_path, null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    price = models.FloatField(default=0, null=False, blank=False)

    def __str__(self):
        return self.title

    
class Event(models.Model):
    slug = models.SlugField(max_length=200, null=True, blank=True)
    title = models.CharField(max_length=200, null=False, blank=False)
    category = models.CharField(max_length=100, choices=course_category, null=False, blank=False)
    description = models.CharField(max_length=5000, null=False, blank=False)
    event_date = models.DateTimeField(auto_created=False)
    thumbnail = models.ImageField(upload_to=get_file_path, null=False, blank=False)
    event_venue = models.CharField(max_length=5000, null=False, blank=False)
    date_created = models.DateTimeField(auto_now_add=True, null=False, blank=False)

    def __str__(self):
        return self.title

