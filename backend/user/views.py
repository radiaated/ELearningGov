from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import (
    RetrieveUpdateDestroyAPIView,
    UpdateAPIView,
    ListAPIView,
)
from rest_framework.permissions import IsAuthenticated, AllowAny


from course.serializers import CourseSerializer
from course.models import Course

from .serializers import (
    UserProfileSerializer,
    PasswordUpdateSerializer,
    CurrentUserSerializer,
)

# Create your views here.


class CurrentUserAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        serializer = CurrentUserSerializer(request.user)

        return Response(serializer.data)


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


class UserCoursesPurchaseStatusAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, slug):
        print(slug)
        purchase_status = Course.objects.filter(
            slug=slug, course_coursepurchases__user=request.user
        ).exists()

        return Response({"purchase_status": purchase_status})
