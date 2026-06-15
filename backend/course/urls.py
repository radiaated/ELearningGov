from django.urls import path
from . import views

urlpatterns = [
    path("", views.CourseListView.as_view(), name="course-course-list"),
    path(
        "<str:slug>/",
        views.CourseWithChaptersRetreiveView.as_view(),
        name="course-course-retrieve",
    ),
    path(
        "takecourse/<slug:slug>/",
        views.TakeCourseRetreiveView.as_view(),
        name="course-takecourse-retrieve",
    ),
    path(
        "takechapter/<slug:course_slug>/chapter/<slug:chapter_slug>/",
        views.TakeChapterRetreiveView.as_view(),
        name="course-takechapter-retrieve",
    ),
    path(
        "<slug:course_slug>/course-review/",
        views.CourseReviewCreateUpdateDestroyView.as_view(),
        name="course-course-review-create-update-destroy",
    ),
    # TODO:
    # path('studymaterials/'),
    # path('studymaterial/<slug:slug>/'),
    # path('download/studymaterial/'),
    # path('events/'),
    # path('event/<slug:slug>/'),
]
