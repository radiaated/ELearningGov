from django.db.models import Avg, Count
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated

from .models import Course, Chapter, CourseReview
from .serializers import CourseSerializer, ChapterSerializer, CourseReviewSerializer


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

        search = self.request.GET.get("q")
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


class CourseReviewCreateUpdateDestroyView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, course, user, review_id=None):
        qs = CourseReview.objects.filter(course=course, user=user)

        if review_id:
            return get_object_or_404(qs, id=review_id)

        return qs.order_by("-id").first()

    def post(self, request, course_slug):
        course = get_object_or_404(Course, slug=course_slug)

        serializer = CourseReviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user, course=course)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, course_slug):
        review_id = request.query_params.get("id")

        course = get_object_or_404(Course, slug=course_slug)
        review = self.get_object(course, request.user, review_id)

        serializer = CourseReviewSerializer(review, data=request.data, partial=False)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, course_slug):
        review_id = request.query_params.get("id")

        course = get_object_or_404(Course, slug=course_slug)
        review = self.get_object(course, request.user, review_id)

        review.delete()

        return Response(
            {"detail": "Review deleted successfully."},
            status=status.HTTP_204_NO_CONTENT,
        )
