from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

from rest_framework import status, exceptions
from rest_framework.views import APIView
from rest_framework.generics import (
    RetrieveUpdateDestroyAPIView,
    UpdateAPIView,
    ListAPIView,
    CreateAPIView,
)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
    TokenBlacklistSerializer,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from course.serializers import CourseSerializer
from course.models import Course

from .models import CoursePurchase
from .serializers import (
    RegisterSerializer,
    UserProfileSerializer,
    PasswordUpdateSerializer,
    CourseReviewSerializer,
)

from datetime import datetime, timedelta
import requests
import json
import uuid
import os

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
            expires=datetime.now() + timedelta(hours=1),
            secure=True,
            httponly=True,
            samesite="strict",
        )

        response.set_cookie(
            key="refresh",
            value=refresh_token,
            expires=datetime.now() + timedelta(days=30),
            secure=True,
            httponly=True,
            samesite="strict",
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

            print(request.user)

            access_token = response.data["access"]
            refresh_token = response.data["refresh"]

            del response.data["access"]
            del response.data["refresh"]

            response.set_cookie(
                key="access",
                value=access_token,
                expires=datetime.now() + timedelta(hours=1),
                secure=True,
                httponly=True,
                samesite="strict",
            )

            response.set_cookie(
                key="refresh",
                value=refresh_token,
                expires=datetime.now() + timedelta(days=30),
                secure=True,
                httponly=True,
                samesite="strict",
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

            print(request.data)
            response = super().post(request, *args, **kwargs)
            response.data = {"detail": "Logged out"}
            response = self.clear_cookies(response)
            print("returnd_top")
            return response
        except Exception as ex:
            print(ex)

            response = Response({"detail": "Logged out"})

            response = self.clear_cookies(response)

            print("returnd_bottom")

            return Response({"detail": "Logged out"})


class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class ProfileAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.user_userprofile


class PasswordUpdateAPIView(UpdateAPIView):
    serializer_class = PasswordUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class UserCoursesListAPIView(ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer(self, *args, **kwargs):
        return super().get_serializer(
            *args, **kwargs, exclude_fields=["course_chapters", "course_reviews"]
        )

    def get_queryset(self):
        return Course.objects.filter(
            course_coursepurchases__user=self.request.user
        ).all()


class PurchaseCourseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        transaction_id = uuid.uuid1()

        payload = {
            "return_url": f"{os.environ.get('PRODUCTION_URL')}/verifypay",
            "website_url": f"{os.environ.get('PRODUCTION_URL')}/",
            "amount": request.data.get("price"),
            "purchase_order_id": "course_" + str(transaction_id),
            "purchase_order_name": "_".join(request.data.get("course_id")),
        }

        res = requests.post(
            "https://a.khalti.com/api/v2/epayment/initiate/",
            data=json.dumps(payload),
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Key {os.environ.get("KHALTI_KEY")}",
            },
        )

        print(res.text)

        return Response(json.loads(res.text), status=status.HTTP_200_OK)


class VerifyPurchaseCourseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        pidx = request.data.get("pidx")
        course_ids_raw = request.GET.get("course_ids", "")

        print(request.GET)

        if not pidx:
            return Response(
                {"message": "pidx is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        course_ids = [cid for cid in course_ids_raw.split("_") if cid.strip().isdigit()]

        if not course_ids:
            return Response(
                {"message": "No valid course IDs provided"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            payment_response = requests.post(
                "https://a.khalti.com/api/v2/epayment/lookup/",
                json={"pidx": pidx},
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Key {os.environ.get('KHALTI_KEY')}",
                },
                timeout=10,
            )
        except requests.RequestException:
            return Response(
                {"message": "Payment verification service unavailable"},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        if payment_response.status_code != 200:
            return Response(
                {"message": "Failed to verify payment"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        payment_data = payment_response.json()

        courses_to_purchase = Course.objects.filter(id__in=course_ids)

        existing_purchases_course = CoursePurchase.objects.filter(
            user=request.user, course__in=courses_to_purchase, pidx=pidx
        ).values_list("course_id", flat=True)

        to_create = [
            CoursePurchase(
                user=request.user,
                course=course,
                pidx=pidx,
                total_amount=payment_data.get("total_amount", 0),
                transaction_id=payment_data.get("transaction_id", ""),
            )
            for course in courses_to_purchase
            if course.id not in existing_purchases_course
        ]

        CoursePurchase.objects.bulk_create(to_create)

        return Response(
            {
                "message": "Courses purchased successfully",
            },
            status=status.HTTP_200_OK,
        )


class VerifyCourseOwnershipView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        if CoursePurchase.objects.filter(
            user=request.user, online_course__slug=request.GET.get("course_slug")
        ).exists():

            return Response({"status": True}, status=status.HTTP_200_OK)

        else:
            return Response({"status": False}, status=status.HTTP_200_OK)


class CourseReviewCreateUpdateDestroyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        course_slug = request.GET.get("course")
        course = get_object_or_404(Course, slug=course_slug)

        serializer = CourseReviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user, course=course)

        return Response(serializer.data)

    def put(self, request):
        course_slug = request.GET.get("course")
        course = get_object_or_404(Course, slug=course_slug)

        review = self.get_object(course, request.user)

        serializer = CourseReviewSerializer(review, data=request.data, partial=False)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request):
        course_slug = request.GET.get("course")
        course = get_object_or_404(Course, slug=course_slug)

        review = self.get_object(course, request.user)
        review.delete()

        return Response(
            {"detail": "Review deleted successfully."},
            status=status.HTTP_204_NO_CONTENT,
        )
