from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.hashers import make_password
from .serializers import *
from .models import *
from base.models import OnlineCourse, StudyMaterial
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
import requests
import uuid
import json
from rest_framework import permissions

# from django.views.decorators.csrf import csrf_exempt
# import jwt



from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
# from rest_framework_simplejwt.tokens import RefreshToken

# def get_tokens_for_user(user):
#     refresh = RefreshToken.for_user(user)

#     return {
#         'refresh': str(refresh),
#         'access': str(refresh.access_token),
#     }

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # refresh = self.get_token(self.user)

        # Add extra responses here
        data['username'] = self.user.username
        return data
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



# def jwt_provider(func):

#     def wrapper(*args, **kwargs):
        
#         print(args[0].COOKIES.get("access"))

#         args[0].META["HTTP_AUTHORIZATION"] = f'Bearer {args[0].COOKIES.get("access")}'

#         return func(*args, **kwargs)

#     return wrapper


# @api_view(["POST"])
# def refresh_token(request):

#     x = jwt.decode(request.COOKIES.get("access"), "secret", algorithms=["HS256"], options={"verify_signature": False})
#     user = User.objects.get(id=x['user_id'])
#     refresh = RefreshToken(request.COOKIES.get("refresh"))
#     refresh.blacklist()

#     refresh = RefreshToken.for_user(user)
   
#     res = Response(status=status.HTTP_200_OK)

#     res.set_cookie('access', str(refresh.access_token), httponly=True)
#     res.set_cookie('refresh', str(refresh), httponly=True)

#     return res


# Create your views here.

@api_view(["POST"])
def register(request):
    if request.method == "POST":
        rd = request.data

        if User.objects.filter(username = rd["username"]).exists():
            return Response({"detail": "Username exists"}, status=status.HTTP_403_FORBIDDEN)
        

        if User.objects.filter(email = rd["email"]).exists():
            return Response({"detail": "Email exists"}, status=status.HTTP_403_FORBIDDEN)

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
    
@permission_classes([IsAuthenticated])
@api_view(["GET", "PUT", "DELETE"])
def get_profile(request):


    
    if request.method == "GET":

        user_detail = UserDetail.objects.get(user=request.user)
        
        if user_detail:

            serializers = UserDetailSerializer(user_detail)

            return Response(serializers.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Empty"}, status=status.HTTP_404_NOT_FOUND)
    
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

    elif request.method == "DELETE":

        UserDetail.objects.get(user=request.user).delete()
        User.objects.get(id=request.user.id).delete()

        return Response({"message": "Account Deleted"}, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
@api_view(["GET", "POST", "DELETE"])
def course_trans_s(request):
    
    if request.method == "GET":
        buy_course = BuyCourse.objects.filter(user=request.user)

        if buy_course:

            serializers = BuyCourseSerializer(buy_course, many=True)

            return Response(serializers.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Empty"}, status=status.HTTP_404_NOT_FOUND)
    elif request.method == "POST":

        rd = request.data

        trans_id = uuid.uuid1()



        payload = {
            "return_url": 'http://127.0.0.1:8000/verifypay',
            "website_url": "http://127.0.0.1:8000/",
            # "return_url": 'http://localhost:5173/verifypay',
            # "website_url": "http://localhost:5173/",
            "amount": rd["price"],
            "purchase_order_id": "course_" + str(trans_id),
            # "purchase_order_id": 16,
            "purchase_order_name": "_".join(rd["course_id"])
        }

        res = requests.post("https://a.khalti.com/api/v2/epayment/initiate/", data=json.dumps(payload) ,headers={"Content-Type": "application/json", "Authorization": "Key ed5c97d78e1d4473acf4fd5ddabe488f"})


        # online_course = OnlineCourse.objects.get(id=request.GET.get("id"))
        # buy_course = BuyCourse.objects.create(user=request.user, online_course=online_course)

        # if buy_course and online_course:
        #     buy_course.save()
        #     serializers = BuyCourseSerializer(buy_course)

        #     return Response(serializers.data, status=status.HTTP_200_OK)
        # else:
        return Response(json.loads(res.text), status=status.HTTP_200_OK)
    

@permission_classes([IsAuthenticated])
@api_view(["GET"])
def course_trans(request):

    if request.method == "GET":
 
        oc = OnlineCourse.objects.get(slug=request.GET.get("slug"))
        buy_course = BuyCourse.objects.filter(user=request.user, online_course=oc)

        if buy_course:

            serializers = BuyCourseSerializer(buy_course[0])

            return Response(serializers.data, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Empty"}, status=status.HTTP_404_NOT_FOUND)
        # return Response({"hello": "huhu"}, status=status.HTTP_200_OK)
    
    


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

            for xx in request.GET.get("course_id").split("_"):
                if not BuyCourse.objects.filter(user=request.user, online_course__id = xx).exists():
                    online_course = OnlineCourse.objects.get(id=xx)
                    buy_course = BuyCourse.objects.create(user=request.user, online_course=online_course, pidx=res["pidx"], total_amount=res["total_amount"],transaction_id=res["transaction_id"])

                    if buy_course and online_course:
                        buy_course.save()
            

            return Response(status=status.HTTP_200_OK)
                
    else:
        return Response({"message": "Error"}, status=status.HTTP_404_NOT_FOUND)
    

@permission_classes([IsAuthenticated])
@api_view(["POST"])
def free_course(request):

    
  
    if not BuyCourse.objects.filter(user=request.user, online_course__slug = request.GET.get("course_slug")).exists():
        oc = OnlineCourse.objects.get(slug = request.GET.get("course_slug"))
        buy_course = BuyCourse.objects.create(user=request.user, online_course=oc, total_amount=0)

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
                
    # else:
    #     return Response({"message": "Error"}, status=status.HTTP_404_NOT_FOUND)
    


@permission_classes([IsAuthenticated])
@api_view(["GET", "POST", "PUT", "DELETE"])
def course_review(request):
    
    if request.method == "POST":

        rd = request.data

        oc = OnlineCourse.objects.get(slug = request.GET.get("online_course"))

        review = CourseReview.objects.create(user=request.user, online_course=oc, rating=request.GET.get("rating"), comment=rd['comment'])

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
            # print(review)
            review.delete()
            

            # serializers = CourseReviewSerializer(review)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response({"message": "Error"}, status=status.HTTP_404_NOT_FOUND)

