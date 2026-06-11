from django.urls import path
from . import views

urlpatterns = [
    path("me/", views.CurrentUserAPIView.as_view(), name="user-me"),
    path("profile/", views.ProfileAPIView.as_view(), name="user-profile"),
    path(
        "password-update/",
        views.PasswordUpdateAPIView.as_view(),
        name="user-password-update",
    ),
    path(
        "course/",
        views.UserCoursesListAPIView.as_view(),
        name="user-user-course-list",
    ),
]
