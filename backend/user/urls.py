from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("token/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", views.MyTokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", views.MyTokenBacklistView.as_view(), name="logout"),
    path("profile/", views.ProfileAPIView.as_view(), name="user-profile"),
    path(
        "password-update/",
        views.PasswordUpdateAPIView.as_view(),
        name="user-password-update",
    ),
    path("course/", views.UserCoursesListAPIView.as_view(), name="base-user-course"),
    # path("profilecourse/", views.course_trans),
    # path("coursereview/", views.course_review),
    path("register/", views.RegisterView.as_view(), name="register"),
    # path("verifypay/", views.verify_payment),
    # path("ownfreecourse/", views.free_course),
    # path("checkcourseown/", views.check_course_own),
]
