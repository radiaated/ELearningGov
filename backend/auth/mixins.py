class AuthCookieTokenMixin:
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
            max_age=60 * 60 * 24 * 30,
            secure=True,
            httponly=True,
            samesite="Lax",
            path="/",
        )

        response.set_cookie(
            key=self.REFRESH_COOKIE,
            value=refresh_token,
            max_age=60 * 60 * 24 * 30,
            secure=True,
            httponly=True,
            samesite="Lax",
            path="/",
        )

        return response
