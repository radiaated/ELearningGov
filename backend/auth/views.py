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


class MyTokenRefreshView(TokenRefreshView):
    serializer_class = TokenRefreshSerializer

    def post(self, request, *args, **kwargs):

        try:

            if not request.COOKIES.get("access") or not request.COOKIES.get("refresh"):
                raise exceptions.AuthenticationFailed(
                    detail={"Tokens do not exist"}, code=status.HTTP_401_UNAUTHORIZED
                )

            request.data["refresh"] = request.COOKIES.get("refresh")
            response = super().post(request, *args, **kwargs)

            access_token = response.data["access"]
            refresh_token = response.data["refresh"]

            del response.data["access"]
            del response.data["refresh"]

            response.set_cookie(
                key="access",
                value=access_token,
                expires=timezone.now() + timezone(hours=1),
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
        except exceptions.AuthenticationFailed as ex:

            response = Response(ex.detail, status=status.HTTP_401_UNAUTHORIZED)
            response.delete_cookie("access")

            response.delete_cookie("refresh")

            return response


class MyTokenBacklistView(TokenRefreshView):
    serializer_class = TokenBlacklistSerializer

    def clear_cookies(self, response):

        response.delete_cookie("access")

        response.delete_cookie("refresh")

        return response

    def post(self, request, *args, **kwargs):

        try:

            raw_refresh_token = request.COOKIES.get("refresh")

            request.data["refresh"] = raw_refresh_token

            response = super().post(request, *args, **kwargs)
            response.data = {"detail": "Logged out"}
            response = self.clear_cookies(response)
            return response
        except Exception as ex:

            response = Response({"detail": "Logged out"})

            response = self.clear_cookies(response)

            return Response({"detail": "Logged out"})


class RegisterView(CreateAPIView):
    permission_classes = [AllowAny]

    queryset = User.objects.all()
    serializer_class = RegisterSerializer
