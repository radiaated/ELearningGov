from django.db.models import Avg, Count

from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView, RetrieveAPIView

from .models import Course, Chapter
from .serializers import (
    CourseSerializer,
    ChapterSerializer,
)


# Create your views here.
class CourseListView(ListAPIView):
    queryset = Course.objects.all().order_by("date_created")
    serializer_class = CourseSerializer
    lookup_field = "slug"

    def get_serializer(self, *args, **kwargs):
        return super().get_serializer(
            *args, **kwargs, exclude_fields=["course_chapters", "course_reviews"]
        )

    def get_queryset(self):
        queryset = super().get_queryset()

        search = self.request.GET.get("search")
        category = self.request.GET.get("category")

        if search:
            queryset = queryset.filter(title__icontains=search)

        if category:
            queryset = queryset.filter(category=category)

        queryset = queryset.annotate(
            avg_rating=Avg("course_coursereviews__rating"),
            reviews_count=Count("course_coursereviews", distinct=True),
        )

        return queryset

    def list(self, request, *args, **kwargs):

        paginator = PageNumberPagination()
        paginator.page_size = 5

        page = paginator.paginate_queryset(self.get_queryset(), request)
        serializer = self.get_serializer(page, many=True)

        data = serializer.data

        return paginator.get_paginated_response(data)


class CourseWithChaptersRetreiveView(RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    lookup_field = "slug"

    def get_serializer(self, *args, **kwargs):
        context = self.get_serializer_context()
        context["include_chapter_video"] = False
        kwargs["context"] = context

        return super().get_serializer(*args, **kwargs)

    def get_queryset(self):
        return Course.objects.annotate(
            avg_rating=Avg("course_coursereviews__rating"),
            reviews_count=Count("course_coursereviews", distinct=True),
        )


class TakeCourseRetreiveView(RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    lookup_field = "slug"

    def get_serializer(self, *args, **kwargs):
        context = self.get_serializer_context()
        context["include_chapter_video"] = False
        kwargs["context"] = context

        return super().get_serializer(*args, **kwargs)

    def get_queryset(self):
        return Course.objects.filter(
            course_coursepurchases__user=self.request.user
        ).annotate(
            avg_rating=Avg("course_coursereviews__rating"),
            reviews_count=Count("course_coursereviews", distinct=True),
        )


class TakeChapterRetreiveView(RetrieveAPIView):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    lookup_field = "slug"
    lookup_url_kwarg = "chapter_slug"

    def get_queryset(self):
        return Chapter.objects.filter(course__slug=self.kwargs["course_slug"])
