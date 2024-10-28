from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from django.http import FileResponse
from django.forms.models import model_to_dict
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from .models import *
from user.serializers import *
from user.models import *
from django.contrib.auth.models import User
from django.db.models import Avg, Count
from django.conf import settings
from rest_framework.pagination import PageNumberPagination

# Create your views here.

# Get a list of courses for public view
@api_view(["GET"])
def get_online_courses(request):

    online_courses = OnlineCourse.objects.all().order_by("date_created")
    
    if request.GET.get("search") and request.GET.get("category"):
        online_courses = online_courses.filter(title__contains=request.GET.get("search"), category = request.GET.get("category"))
    elif(request.GET.get("search")):
        online_courses = online_courses.filter(title__contains=request.GET.get("search"))
    elif(request.GET.get("category")):
        online_courses = online_courses.filter(category = request.GET.get("category"))
    
    paginator = PageNumberPagination()
    paginator.page_size = 5
    result_page = paginator.paginate_queryset(online_courses, request)

    if online_courses:

        serializers = OnlineCourseSerializer(result_page, many=True).data

        for oc in serializers:
            avg_rating = CourseReview.objects.filter(online_course__id=oc["id"]).aggregate(Avg("rating"))["rating__avg"] 
       
            oc["avg_rating"] = avg_rating if avg_rating else 0
            oc["reviews_count"] = len(CourseReview.objects.filter(online_course__id=oc["id"]))


        return paginator.get_paginated_response(serializers)
    else:
        return Response({"message": "Empty"}, status=status.HTTP_404_NOT_FOUND)
    
# Get course detail
@api_view(["GET"])
def get_online_course(request,slug):

    online_course = OnlineCourse.objects.get(slug=slug)

    course = Course.objects.filter(online_course=online_course).order_by("chpt")
    
    reviews = CourseReview.objects.filter(online_course__slug = slug).order_by("-date_created")

    avg_rating = CourseReview.objects.filter(online_course__slug = slug).aggregate(Avg("rating"))

    

    if online_course:
        
        oc_serializers = OnlineCourseSerializer(online_course)
        c_serializers = CourseSerializer(course, many=True)
        r_serializers = CourseReviewSerializer(reviews, many=True)
        oc_serializers = dict(oc_serializers.data)
        oc_serializers["syllabus"] = c_serializers.data

        oc_serializers["reviews"] = r_serializers.data
        oc_serializers["avg_rating"] = avg_rating["rating__avg"] if avg_rating["rating__avg"] else 0 
        oc_serializers["count_rating"] = len(reviews)
        return Response(oc_serializers, status=status.HTTP_200_OK)
    else:
        return Response({"course_detail": "Empty"}, status=status.HTTP_404_NOT_FOUND)

# Gets a chapter
@permission_classes([IsAuthenticated])
@api_view(["GET"]) 
def get_bought_online_course(request,slug):

    online_course = OnlineCourse.objects.get(slug=slug)

    course = Course.objects.filter(online_course=online_course).order_by("chpt")
    
    reviews = CourseReview.objects.filter(online_course__slug = slug).order_by("-date_created")

    avg_rating = CourseReview.objects.filter(online_course__slug = slug).aggregate(Avg("rating"))


    if online_course:
        
        oc_serializers = OnlineCourseSerializer(online_course)
        c_serializers = CourseSerializer(course, many=True)
        r_serializers = CourseReviewSerializer(reviews, many=True)
        oc_serializers = dict(oc_serializers.data)
        oc_serializers["syllabus"] = c_serializers.data
        oc_serializers["reviews"] = r_serializers.data
        oc_serializers["avg_rating"] = avg_rating["rating__avg"]
        oc_serializers["count_rating"] = len(reviews)
        return Response(oc_serializers, status=status.HTTP_200_OK)
    else:
        return Response({"course_detail": "Empty"}, status=status.HTTP_404_NOT_FOUND)
    

# Gets a bought chapter
@permission_classes([IsAuthenticated])
@api_view(["GET"])
def get_bought_chapter(request, slug):

    online_course = OnlineCourse.objects.get(slug=slug)

    course = Course.objects.filter(online_course=online_course, slug=request.GET.get("chapter_slug"))[0]

    if online_course:
        
        c_serializers = CourseSerializer(course)
        
        return Response(c_serializers.data, status=status.HTTP_200_OK)
    else:
        return Response({"course_detail": "Empty"}, status=status.HTTP_404_NOT_FOUND)
    

# Downloads study materials
@permission_classes([IsAuthenticated])
@api_view(["GET"])
def download_studym(request):

    sm = StudyMaterial.objects.get(slug=request.GET.get("slug"))

    sm.dw_count += 1

    sm.save() 

    return Response({"file": str(sm.file)}, status=status.HTTP_200_OK)

    
# Gets the student materials
@api_view(["GET"])
def get_study_materials(request):
    

    study_materials = StudyMaterial.objects.all().order_by("date_created")
    if request.GET.get("search") and request.GET.get("category"):
        study_materials = study_materials.filter(title__contains=request.GET.get("search"), category = request.GET.get("category"))
    elif(request.GET.get("search")):
        study_materials = study_materials.filter(title__contains=request.GET.get("search"))
    elif(request.GET.get("category")):
        study_materials = study_materials.filter(category = request.GET.get("category"))
    
    paginator = PageNumberPagination()
    paginator.page_size = 5
    result_page = paginator.paginate_queryset(study_materials, request)
    
    if study_materials:

        serializers = StudyMaterialSerializer(result_page, many=True).data

        return paginator.get_paginated_response(serializers)
        
    else:
        return Response({"message": "Empty"}, status=status.HTTP_404_NOT_FOUND)
    
# Gets the student material details
@api_view(["GET"])
def get_study_material(request,slug):

    study_material = StudyMaterial.objects.get(slug=slug)

    if study_material:
        serializers = StudyMaterialSerializer(study_material)
        return Response(serializers.data, status=status.HTTP_200_OK)
    else:
        return Response({"course_detail": "Empty"}, status=status.HTTP_404_NOT_FOUND)



@api_view(["GET"])
def get_events(request):
    
    events = Event.objects.all().order_by("date_created")
    if(request.GET.get("category")):
        events = Event.filter(category = request.GET.get("category"))
    
    if events:

        serializers = EventSerializer(events, many=True)

        return Response(serializers.data, status=status.HTTP_200_OK)
    else:
        return Response({"message": "Empty"}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(["GET"])
def get_event(request,id):

    events = Event.objects.get(id=id)

    if events:
        serializers = EventSerializer(events)
        return Response(serializers.data, status=status.HTTP_200_OK)
    else:
        return Response({"course_detail": "Empty"}, status=status.HTTP_404_NOT_FOUND)
    
    