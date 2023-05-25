
from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair2'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('token/refresh/', views.refresh_token, name='token_refresh2'),
    path('profile/', views.get_profile),
    path('profilecourses/', views.course_trans_s),
    path('profilecourse/', views.course_trans),
    path('coursereview/', views.course_review),
    path('register/', views.register),
    path('verifypay/', views.verify_payment),
    path('ownfreecourse/', views.free_course),
    path('checkcourseown/', views.check_course_own),
]
