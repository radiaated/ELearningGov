from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from course.models import Course
from .models import CoursePurchase

import requests
import json
import uuid
import os

# Create your views here.


class PurchaseCourseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        transaction_id = uuid.uuid1()

        payload = {
            "return_url": f"{os.environ.get('PRODUCTION_URL')}/verifying-payment",
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

        return Response(json.loads(res.text), status=status.HTTP_200_OK)


class VerifyPurchaseCourseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        pidx = request.data.get("pidx")
        course_ids_raw = request.GET.get("course_ids", "")

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
            user=request.user, course__slug=request.GET.get("course_slug")
        ).exists():

            return Response({"status": True}, status=status.HTTP_200_OK)

        else:
            return Response({"status": False}, status=status.HTTP_200_OK)
