from django.contrib.auth.models import User

from rest_framework import status, exceptions
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.generics import (
    CreateAPIView,
)
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .serializers import RegisterSerializer
from .mixins import AuthCookieTokenMixin


# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # data["username"] = self.user.username
        return data


class MyTokenObtainPairView(AuthCookieTokenMixin, TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        access_token = response.data.pop("access")
        refresh_token = response.data.pop("refresh")

        return self.set_token_cookies(
            response,
            access_token=access_token,
            refresh_token=refresh_token,
        )


class MyTokenRefreshView(AuthCookieTokenMixin, TokenRefreshView):
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


class LogoutView(AuthCookieTokenMixin, APIView):

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get("refresh")

            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()

        except Exception:
            pass

        response = Response({"detail": "Logged out"}, status=status.HTTP_200_OK)

        response = self.clear_cookies(response)
        return response


class RegisterView(CreateAPIView):
    permission_classes = [AllowAny]

    queryset = User.objects.all()
    serializer_class = RegisterSerializer
