from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, CourseReview


class PasswordUpdateSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["old_password", "password", "password2"]

    def validate(self, attrs):
        user = self.context["request"].user

        # check old password
        if not user.check_password(attrs.get("old_password")):
            raise serializers.ValidationError({"old_password": "Wrong password"})

        # check new passwords match
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "Passwords don't match"})

        return attrs

    def update(self, instance, validated_data):
        validated_data.pop("old_password", None)
        validated_data.pop("password2", None)

        instance.set_password(validated_data["password"])
        instance.save()

        return instance


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["username", "email", "first_name"]


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=False)
    email = serializers.EmailField(source="user.email", read_only=False)
    first_name = serializers.CharField(source="user.first_name", read_only=False)

    class Meta:
        model = UserProfile
        fields = [
            "username",
            "email",
            "first_name",
            "gender",
            "address",
            "phone",
            "academic_level",
        ]

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user")
        print(user_data)
        user_serializer = UserSerializer(
            instance=instance.user, data=user_data, partial=True
        )
        user_serializer.is_valid(raise_exception=True)
        user_serializer.save()

        return super().update(instance, validated_data)


class CourseReviewSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = CourseReview
        fields = ["id", "username", "date_created", "rating", "comment"]


# TODO
# class BuyStudyMatSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = BuyStudyMat
#         fields = "__all__"
