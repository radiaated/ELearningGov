from django.urls import path
from . import views

urlpatterns = [
    path("token/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", views.MyTokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", views.MyTokenBacklistView.as_view(), name="logout"),
    path("register/", views.RegisterView.as_view(), name="register"),
]
