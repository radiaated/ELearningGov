from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from datetime import datetime, timedelta
from rest_framework.decorators import api_view, permission_classes, APIView
from rest_framework import exceptions
from rest_framework.permissions import IsAuthenticated
from .models import *
from base.models import Course
from django.contrib.auth.hashers import make_password
from .serializers import *
from base.serializers import OnlineCourseSerializer
from datetime import datetime
from django.contrib.auth.models import User
import requests
import json
from django.db import transaction
import uuid
import os


# Create your views here.

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer, TokenBlacklistSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        data['username'] = self.user.username
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
                            key = "access", 
                            value = access_token,
                            expires = datetime.now() + timedelta(hours=1),
                            secure = True,
                            httponly = True,
                            samesite = "strict"
                        )
        
        response.set_cookie(
                            key = "refresh", 
                            value = refresh_token,
                            expires = datetime.now() + timedelta(days=30),
                            secure = True,
                            httponly = True,
                            samesite = "strict"
                        )
        return response
    
class MyTokenRefreshView(TokenRefreshView):
    serializer_class = TokenRefreshSerializer
    
    def post(self, request, *args, **kwargs):

        try:
            
            if not request.COOKIES.get("access") or not request.COOKIES.get("refresh"):
                raise exceptions.AuthenticationFailed(detail={"Tokens do not exist"} , code=status.HTTP_401_UNAUTHORIZED)
        
            request.data['refresh'] = request.COOKIES.get("refresh")
            response = super().post(request, *args, **kwargs)

            print(request.user)

            access_token = response.data["access"] 
            refresh_token = response.data["refresh"]

            del response.data["access"]
            del response.data["refresh"]

            response.set_cookie(
                                key = "access", 
                                value = access_token,
                                expires = datetime.now() + timedelta(hours=1),
                                secure = True,
                                httponly = True,
                                samesite = "strict"
                            )
            
            response.set_cookie(
                                key = "refresh", 
                                value = refresh_token,
                                expires = datetime.now() + timedelta(days=30),
                                secure = True,
                                httponly = True,
                                samesite = "strict"
                            )

            return response
        except exceptions.AuthenticationFailed as ex :

            response = Response(ex.detail, status = status.HTTP_401_UNAUTHORIZED)
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
            print('returnd_top')
            return response
        except:

            response = Response( {"detail": "Logged out"})

            response = self.clear_cookies(response)

            print('returnd_bottom')

            return Response( {"detail": "Logged out"})


#
# Register
#
@api_view(["POST"])
@transaction.atomic
def register(request):
    if request.method == "POST":
        rd = request.data


        # Checks if username exists
        if User.objects.filter(username = rd["username"]).exists():
            return Response({"detail": "Username exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Checks if email exists
        if User.objects.filter(email = rd["email"]).exists():
            return Response({"detail": "Email exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create(
            username= rd["username"],
            email= rd["email"],
            first_name= rd["full_name"],
            password= make_password(rd["password"]),
            )

        user_detail = UserDetail.objects.create(
                gender= rd["gender"],
                address= rd["address"],
                phone= rd["phone"],
                academic_level = rd['academic_level'],
                user = user
            )
        
        if user and user_detail:
            user.save()
            user_detail.save()
            serializers = UserDetailSerializer(user_detail)

            return Response(serializers.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Empty"}, status=status.HTTP_404_NOT_FOUND)


# Profile
@permission_classes([IsAuthenticated])
@api_view(["GET", "PUT"])
def get_profile(request):


    # Retrieve the user profile 
    if request.method == "GET":

        user_detail = UserDetail.objects.get(user=request.user)
        
        if user_detail:

            serializers = UserDetailSerializer(user_detail)

            return Response(serializers.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Empty"}, status=status.HTTP_404_NOT_FOUND)
    
     # Update the user profile 
    elif request.method == "PUT":
        rd = request.data
       
        user = User.objects.get(id = request.user.id)
        if rd.get("username"):
            if User.objects.filter(username=rd["username"]).exclude(username=request.user.username).exists():
                return Response({"message": "Username Exists"}, status=status.HTTP_403_FORBIDDEN)
            else:
                user.username = rd["username"]


        if rd.get("full_name"):
            user.first_name = rd["full_name"]

        if rd.get("email"):
            if User.objects.filter(email=rd["email"]).exclude(email=request.user.email).exists():
                return Response({"message": "Email Exists"}, status=status.HTTP_403_FORBIDDEN)
            else:
                user.email = rd["email"]

        if rd.get("password"):

            if request.user.check_password(rd["oldpassword"]):

                user.password = make_password(rd['password'])
            else:
                return Response({"message": "Incorrect oldd password"}, status=status.HTTP_404_NOT_FOUND)
            

        user_detail = UserDetail.objects.get(user=request.user)

        if rd.get("gender"):
            user_detail.gender = rd['gender']

        if rd.get("address"):
            user_detail.address = rd['address']

        if rd.get("phone"):
            user_detail.phone = rd['phone']

        if rd.get("academic_level"):
            user_detail.academic_level = rd['academic_level']

        if user and user_detail:
            user.save()
            user_detail.save()
            serializers = UserDetailSerializer(user_detail)

            return Response(serializers.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Empty"}, status=status.HTTP_404_NOT_FOUND)

    # Delete account
    elif request.method == "DELETE":

        UserDetail.objects.get(user=request.user).delete()
        User.objects.get(id=request.user.id).delete()

        return Response({"message": "Account Deleted"}, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
@api_view(["GET", "POST", "DELETE"])
def course_trans_s(request):
    

    # Gets the list of all the purchased user's courses
    if request.method == "GET":
        buy_course = BuyCourse.objects.filter(user=request.user)

        if buy_course:

            serializers = BuyCourseSerializer(buy_course, many=True)

            return Response(serializers.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Empty"}, status=status.HTTP_404_NOT_FOUND)
    
    # Initiates the payment for purchasing the course
    elif request.method == "POST":

        rd = request.data

        trans_id = uuid.uuid1()

        payload = {
            "return_url": "{prod_url}/verifypay".format(prod_url=os.environ.get("PROD_URL")),
            "website_url": "{prod_url}/".format(prod_url=os.environ.get("PROD_URL")),
            "amount": rd["price"],
            "purchase_order_id": "course_" + str(trans_id),
            "purchase_order_name": "_".join(rd["course_id"])
        }

        res = requests.post("https://a.khalti.com/api/v2/epayment/initiate/", data=json.dumps(payload) ,headers={"Content-Type": "application/json", "Authorization": "Key ed5c97d78e1d4473acf4fd5ddabe488f"})

        return Response(json.loads(res.text), status=status.HTTP_200_OK)
    
#
# Authorizes if the user bought the course during the payment
#
@permission_classes([IsAuthenticated])
@api_view(["GET"])
def course_trans(request):

    if request.method == "GET":
 
        buy_course = BuyCourse.objects.filter(user=request.user, online_course__slug=request.GET.get("slug"))

        if buy_course:

            serializers = BuyCourseSerializer(buy_course[0])

            return Response(serializers.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Empty"}, status=status.HTTP_404_NOT_FOUND)
    

# Verifies the payment
# And saves the course after payment verification
@permission_classes([IsAuthenticated])
@api_view(["POST"])
def verify_payment(request):
    rd = request.data

    payload = {
            "pidx": rd["pidx"],
        }
        
    res = requests.post("https://a.khalti.com/api/v2/epayment/lookup/", data=json.dumps(payload) ,headers={"Content-Type": "application/json", "Authorization": "Key ed5c97d78e1d4473acf4fd5ddabe488f"})

    if res:
        res = json.loads(res.text)
        if request.GET.get("type") == "course":

            # Can buy in mass
            for xx in request.GET.get("course_id").split("_"):
                if not BuyCourse.objects.filter(user=request.user, online_course__id = xx).exists():
                    oc = OnlineCourse.objects.get(id=xx)
                    buy_course = BuyCourse.objects.create(user=request.user, online_course=oc, pidx=res["pidx"], total_amount=res["total_amount"],transaction_id=res["transaction_id"])

                    if buy_course:
                        buy_course.save()
            

            return Response(status=status.HTTP_200_OK)
                
    else:
        return Response({"message": "Error"}, status=status.HTTP_404_NOT_FOUND)
    

@permission_classes([IsAuthenticated])
@api_view(["POST"])
def free_course(request):

    if not BuyCourse.objects.filter(user=request.user, online_course__slug = request.GET.get("course_slug")).exists():
        buy_course = BuyCourse.objects.create(user=request.user, online_course__slug = request.GET.get("course_slug"), total_amount=0)

        if buy_course:
            buy_course.save()


        serializers = BuyCourseSerializer(buy_course)
        return Response(serializers.data, status=status.HTTP_200_OK)
        
    else:
            return Response({"message": "Purchased before."}, status=status.HTTP_404_NOT_FOUND)
                
    # else:
    #     return Response({"message": "Error"}, status=status.HTTP_404_NOT_FOUND)
    

@permission_classes([IsAuthenticated])
@api_view(["GET"])
def check_course_own(request):

    if BuyCourse.objects.filter(user=request.user, online_course__slug = request.GET.get("course_slug")).exists():

        return Response({"status": True}, status=status.HTTP_200_OK)
        
    else:
        return Response({"status": False}, status=status.HTTP_200_OK)
                


@permission_classes([IsAuthenticated])
@api_view(["GET", "POST", "PUT", "DELETE"])
def course_review(request):
    
    if request.method == "POST":

        rd = request.data

        review = CourseReview.objects.create(user=request.user, online_course__slug=request.GET.get("online_course"), rating=request.GET.get("rating"), comment=rd['comment'])

        if review:
            review.save()

            serializers = CourseReviewSerializer(review)
            return Response(serializers.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Error"}, status=status.HTTP_404_NOT_FOUND)
        

    elif request.method == "PUT":

        rd = request.data

        review = CourseReview.objects.get(user=request.user, online_course__slug=request.GET.get("online_course"))

        review.rating = rd["rating"]
        review.comment = rd["comment"]

        if review:

            review.save()

            serializers = CourseReviewSerializer(review)
            return Response(serializers.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Error"}, status=status.HTTP_404_NOT_FOUND)
        


    elif request.method == "DELETE":

        rd = request.data

        review = CourseReview.objects.get(user=request.user, id=request.GET.get("review_id"))

        if review:
            review.delete()
            
            return Response(status=status.HTTP_200_OK)
        else:
            return Response({"message": "Error"}, status=status.HTTP_404_NOT_FOUND)


