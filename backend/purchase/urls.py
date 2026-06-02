from django.urls import path
from . import views

urlpatterns = [
    path(
        "purchase-course/",
        views.PurchaseCourseView.as_view(),
        name="purchase-purchase-course",
    ),
    path(
        "verify-payment/",
        views.VerifyPurchaseCourseView.as_view(),
        name="purchase-verify-purhcase-course",
    ),
    path(
        "verify-course-ownership/",
        views.VerifyCourseOwnershipView.as_view(),
        name="purchase-verify-course-ownership",
    ),
]
