from rest_framework import serializers
from .models import Course, Chapter, StudyMaterial, Event


class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = "__all__"


class ChapterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chapter
        fields = "__all__"


class CourseWithChaptersSerializer(serializers.ModelSerializer):

    course_chapters = ChapterSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = "__all__"


class StudyMaterialSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudyMaterial
        fields = "__all__"


class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = "__all__"
