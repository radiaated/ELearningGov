from django.urls import path
from . import views

urlpatterns = [
    path("course/", views.CourseListView.as_view(), name="base-course-list"),
    path(
        "course/<str:slug>/",
        views.CourseWithChaptersRetreiveView.as_view(),
        name="base-course-retrieve",
    ),
    path(
        "takecourse/<slug:slug>/",
        views.TakeCourseRetreiveView.as_view(),
        name="base-takecourse-retrieve",
    ),
    path(
        "takechapter/<slug:course_slug>/<slug:chapter_slug>/",
        views.TakeChapterRetreiveView.as_view(),
        name="base-takechapter-retrieve",
    ),
    # TODO:
    # path('studymaterials/'),
    # path('studymaterial/<slug:slug>/'),
    # path('download/studymaterial/'),
    # path('events/'),
    # path('event/<slug:slug>/'),
]
