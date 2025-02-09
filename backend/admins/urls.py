
from django.urls import path
from . import views


urlpatterns = [
    
    path('courses/', views.CourseListView.as_view(), name='courselist-view'),
    path('courses/<str:slug>/', views.CourseItemView.as_view(), name='courselitem-view'),
]
