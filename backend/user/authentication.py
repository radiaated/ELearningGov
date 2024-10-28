from rest_framework_simplejwt.authentication import JWTAuthentication



class CustomAuthentication(JWTAuthentication):

    def authenticate(self, request):

        raw_access_token = request.COOKIES.get("access") or None

        if not raw_access_token:
            return None
        
        validated_token = self.get_validated_token(raw_access_token)

        validated_user = self.get_user(validated_token)

        return validated_user, validated_token
    

    