from rest_framework.generics import (
    RetrieveUpdateDestroyAPIView,
    UpdateAPIView,
    ListAPIView,
)
from rest_framework.permissions import IsAuthenticated


from course.serializers import CourseSerializer
from course.models import Course

from .serializers import (
    UserProfileSerializer,
    PasswordUpdateSerializer,
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
