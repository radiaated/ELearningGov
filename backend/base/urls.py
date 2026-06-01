from django.urls import path
from . import views

urlpatterns = [
    path("course/", views.CourseListView.as_view(), name="base-course-list"),
    path(
        "course/<str:slug>/",
        views.CourseWithChaptersRetreiveView.as_view(),
        name="base-course-retrieve",
    ),
]
