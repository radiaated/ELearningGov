from django.urls import path
from . import views

urlpatterns = [
    path("profile/", views.ProfileAPIView.as_view(), name="user-profile"),
    path(
        "password-update/",
        views.PasswordUpdateAPIView.as_view(),
        name="user-password-update",
    ),
    path(
        "course/",
        views.UserCoursesListAPIView.as_view(),
        name="course-user-course-list",
    ),
    path(
        "course-review/",
        views.CourseReviewCreateUpdateDestroyView.as_view(),
        name="user-course-review-create-update-destroy",
    ),
]
