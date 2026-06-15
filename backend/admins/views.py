from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser
from rest_framework.pagination import PageNumberPagination


from course.models import Course
from course.serializers import CourseSerializer, ChapterSerializer

import json


class AdminCoursePagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 100


class CourseViewSet(ModelViewSet):

    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAdminUser]
    lookup_field = "slug"
    pagination_class = AdminCoursePagination

    def get_queryset(self):
        queryset = Course.objects.all()

        if self.action == "list":
            q = self.request.query_params.get("q", "").strip()
            category = self.request.query_params.get("category", "").strip()

            if q:
                queryset = queryset.filter(title__icontains=q)

            if category:
                queryset = queryset.filter(category=category)

        return queryset

    def get_serializer(self, *args, **kwargs):

        if self.action == "list":
            kwargs["exclude_fields"] = ["course_chapters", "course_reviews"]
        elif self.action == "retrieve":
            context = self.get_serializer_context()
            context["include_chapter_video"] = True
            kwargs["context"] = context
            kwargs["exclude_fields"] = ["course_reviews"]
        return super().get_serializer(*args, **kwargs)

    def create(self, request, *args, **kwargs):

        course_data = request.data.dict()
        chapters_data = json.loads(course_data.pop("course_chapters", "[]"))

        print(chapters_data)

        # Create course
        course_serializer = CourseSerializer(data=course_data)
        course_serializer.is_valid(raise_exception=True)
        course = course_serializer.save()

        # Create chapters
        for i, chapter_data in enumerate(chapters_data):
            chapter_data["chpt"] = i
            chapter_data["course"] = course.id
            chapter_data["video"] = request.FILES.get(f"chpt_no{i + 1}")
            chapter_serializer = ChapterSerializer(data=chapter_data)
            chapter_serializer.is_valid(raise_exception=True)
            chapter_serializer.save()

        return Response(course_serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        course = self.get_object()

        course_data = request.data.dict()
        chapters_data = json.loads(course_data.pop("course_chapters", "[]"))

        # ---------- UPDATE COURSE ----------
        course_serializer = CourseSerializer(course, data=course_data, partial=True)
        course_serializer.is_valid(raise_exception=True)
        course = course_serializer.save()

        # ---------- GET EXISTING CHAPTERS ----------
        existing_chapters = {c.id: c for c in course.course_chapters.all()}
        incoming_ids = []

        # ---------- CREATE / UPDATE ----------
        for i, chapter_data in enumerate(chapters_data):
            chapter_id = chapter_data.get("id", None)
            chapter_data["chpt"] = i
            chapter_data["course"] = course.id
            chapter_data["video"] = request.FILES.get(f"chpt_no{i + 1}")

            if chapter_id and chapter_id in existing_chapters:
                # UPDATE
                chapter_instance = existing_chapters[chapter_id]
                serializer = ChapterSerializer(
                    chapter_instance, data=chapter_data, partial=True
                )
                serializer.is_valid(raise_exception=True)
                serializer.save()
                incoming_ids.append(chapter_id)

            else:
                # CREATE
                serializer = ChapterSerializer(data=chapter_data)
                serializer.is_valid(raise_exception=True)
                chapter = serializer.save()
                incoming_ids.append(chapter.id)

        # ---------- DELETE REMOVED CHAPTERS ----------
        for chapter_id, chapter in existing_chapters.items():
            if chapter_id not in incoming_ids:
                chapter.delete()

        return Response(course_serializer.data, status=status.HTTP_200_OK)
