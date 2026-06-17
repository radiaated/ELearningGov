from django.utils import timezone
from django.contrib.auth.models import User

from rest_framework import status, exceptions
from rest_framework.permissions import AllowAny
from rest_framework.generics import (
    CreateAPIView,
)
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
    TokenBlacklistSerializer,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .serializers import RegisterSerializer
from .mixins import CookieTokenMixin


from datetime import timedelta

# Create your views here.


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data["username"] = self.user.username
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):

        response = super().post(request, *args, **kwargs)

        access_token = response.data["access"]
        refresh_token = response.data["refresh"]

        del response.data["access"]
        del response.data["refresh"]

        response.set_cookie(
            key="access",
            value=access_token,
            expires=timezone.now() + timedelta(hours=1),
            secure=True,
            httponly=True,
            samesite="Lax",
            path="/",
        )

        response.set_cookie(
            key="refresh",
            value=refresh_token,
            expires=timezone.now() + timedelta(days=30),
            secure=True,
            httponly=True,
            samesite="Lax",
            path="/",
        )
        return response


class MyTokenRefreshView(CookieTokenMixin, TokenRefreshView):
    serializer_class = TokenRefreshSerializer

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get(self.REFRESH_COOKIE)

        if not refresh_token or not request.COOKIES.get(self.ACCESS_COOKIE):
            response = Response(
                {"detail": "Tokens do not exist"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
            return self.clear_cookies(response)

        try:
            request.data["refresh"] = refresh_token

            response = super().post(request, *args, **kwargs)

            access_token = response.data.pop("access")
            refresh_token = response.data.pop("refresh")

            self.set_token_cookies(
                response,
                access_token=access_token,
                refresh_token=refresh_token,
            )

            return response

        except exceptions.AuthenticationFailed as exc:
            response = Response(
                exc.detail,
                status=status.HTTP_401_UNAUTHORIZED,
            )
            return self.clear_cookies(response)


class MyTokenBlacklistView(CookieTokenMixin, TokenRefreshView):
    serializer_class = TokenBlacklistSerializer

    def post(self, request, *args, **kwargs):
        try:
            request.data["refresh"] = request.COOKIES.get(self.REFRESH_COOKIE)

            super().post(request, *args, **kwargs)

        finally:
            response = Response({"detail": "Logged out"})
            return self.clear_cookies(response)


class RegisterView(CreateAPIView):
    permission_classes = [AllowAny]

    queryset = User.objects.all()
    serializer_class = RegisterSerializer
