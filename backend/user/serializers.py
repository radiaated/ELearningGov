from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, CoursePurchase, CourseReview


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


class CoursePurchaseSerializer(serializers.ModelSerializer):
    title = serializers.ReadOnlyField(source="online_course.title")
    description = serializers.ReadOnlyField(source="online_course.description")
    thumbnail = serializers.ImageField(source="online_course.thumbnail")
    price = serializers.ReadOnlyField(source="online_course.price")
    category = serializers.ReadOnlyField(source="online_course.category")
    slug = serializers.ReadOnlyField(source="online_course.slug")

    class Meta:
        model = CoursePurchase
        fields = [
            "date_created",
            "title",
            "description",
            "thumbnail",
            "price",
            "category",
            "slug",
        ]


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
