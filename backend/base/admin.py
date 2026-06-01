from django.contrib import admin
from .models import Course, Chapter, StudyMaterial, Event

# Register your models here.

admin.site.register(Course)
admin.site.register(Chapter)
admin.site.register(StudyMaterial)
admin.site.register(Event)
