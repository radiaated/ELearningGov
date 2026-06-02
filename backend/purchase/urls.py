from django.urls import path
from . import views

urlpatterns = [
    path(
        "purchase-course/",
        views.PurchaseCourseView.as_view(),
        name="course-purchase-course",
    ),
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
