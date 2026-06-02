from django.urls import path
from . import views

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
    path(
        "course/", views.UserCoursesListAPIView.as_view(), name="base-user-course-list"
    ),
    path(
        "purchase-course/",
        views.PurchaseCourseView.as_view(),
        name="base-purchase-course",
    ),
    path(
        "course-review/",
        views.CourseReviewCreateUpdateDestroyView.as_view(),
        name="user-course-review-create-update-destroy",
    ),
    path("register/", views.RegisterView.as_view(), name="register"),
    path(
        "verify-payment/",
        views.VerifyPurchaseCourseView.as_view(),
        name="user-verify-purhcase-course",
    ),
    path(
        "verify-course-ownership/",
        views.VerifyCourseOwnershipView.as_view(),
        name="user-verify-course-ownership",
    ),
]
