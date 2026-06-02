from django.contrib.auth.models import User
from user.models import UserProfile
from rest_framework import serializers


class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    gender = serializers.CharField(write_only=True)
    address = serializers.CharField(write_only=True)
    phone = serializers.CharField(write_only=True)
    academic_level = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "first_name",
            "gender",
            "address",
            "phone",
            "academic_level",
            "password",
            "password2",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError("Passwords don't match")
        return attrs

    def create(self, validated_data):
        # remove non-user fields
        gender = validated_data.pop("gender")
        address = validated_data.pop("address")
        phone = validated_data.pop("phone")
        academic_level = validated_data.pop("academic_level")
        validated_data.pop("password2")

        print("a")

        # create user
        user = User.objects.create_user(**validated_data)

        # create user detail
        UserProfile.objects.create(
            user=user,
            gender=gender,
            address=address,
            phone=phone,
            academic_level=academic_level,
        )

        return user
