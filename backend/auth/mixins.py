from datetime import timedelta

from django.utils import timezone


class CookieTokenMixin:
    ACCESS_COOKIE = "access"
    REFRESH_COOKIE = "refresh"

    def clear_cookies(self, response):
        response.delete_cookie(self.ACCESS_COOKIE, path="/")
        response.delete_cookie(self.REFRESH_COOKIE, path="/")
        return response

    def set_token_cookies(self, response, access_token, refresh_token):
        response.set_cookie(
            key=self.ACCESS_COOKIE,
            value=access_token,
            expires=timezone.now() + timedelta(hours=1),
            secure=True,
            httponly=True,
            samesite="Lax",
            path="/",
        )

        response.set_cookie(
            key=self.REFRESH_COOKIE,
            value=refresh_token,
            expires=timezone.now() + timedelta(days=30),
            secure=True,
            httponly=True,
            samesite="Lax",
            path="/",
        )

        return response
