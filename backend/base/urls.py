
from django.urls import path
from . import views


urlpatterns = [
    path('courses/', views.get_online_courses),
    path('course/<slug:slug>/', views.get_online_course),
    path('takecourse/<slug:slug>/', views.get_bought_online_course),
    path('takechapter/<slug:slug>/', views.get_bought_chapter),
    path('studymaterials/', views.get_study_materials),
    path('studymaterial/<slug:slug>/', views.get_study_material),
    path('download/studymaterial/', views.download_studym),
    path('events/', views.get_events),
    path('event/<slug:slug>/', views.get_event),
]

