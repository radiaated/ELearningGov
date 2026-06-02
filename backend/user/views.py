from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.generics import (
    RetrieveUpdateDestroyAPIView,
    UpdateAPIView,
    ListAPIView,
)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


from course.serializers import CourseSerializer
from course.models import Course

from .serializers import (
    UserProfileSerializer,
    PasswordUpdateSerializer,
    CourseReviewSerializer,
)

# Create your views here.


class ProfileAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.user_userprofile


class PasswordUpdateAPIView(UpdateAPIView):
    serializer_class = PasswordUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class UserCoursesListAPIView(ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer(self, *args, **kwargs):
        return super().get_serializer(
            *args, **kwargs, exclude_fields=["course_chapters", "course_reviews"]
        )

    def get_queryset(self):
        return Course.objects.filter(
            course_coursepurchases__user=self.request.user
        ).all()


class CourseReviewCreateUpdateDestroyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        course_slug = request.GET.get("course")
        course = get_object_or_404(Course, slug=course_slug)

        serializer = CourseReviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user, course=course)

        return Response(serializer.data)

    def put(self, request):
        course_slug = request.GET.get("course")
        course = get_object_or_404(Course, slug=course_slug)

        review = self.get_object(course, request.user)

        serializer = CourseReviewSerializer(review, data=request.data, partial=False)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request):
        course_slug = request.GET.get("course")
        course = get_object_or_404(Course, slug=course_slug)

        review = self.get_object(course, request.user)
        review.delete()

        return Response(
            {"detail": "Review deleted successfully."},
            status=status.HTTP_204_NO_CONTENT,
        )
