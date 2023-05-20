from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from .models import *
from django.contrib.auth.models import User

# Create your views here.

@api_view(["GET"])
def get_online_courses(request):
    
    request.GET

    online_courses = OnlineCourse.objects.all().order_by("date_created")
    if(request.GET.get("category")):
        online_courses = online_courses.filter(category = request.GET.get("category"))
    
    

    if online_courses:

        serializers = OnlineCourseSerializer(online_courses, many=True)

        return Response(serializers.data, status=status.HTTP_200_OK)
    else:
        return Response({"message": "Empty"}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(["GET"])
def get_online_course(request,slug):

    online_course = OnlineCourse.objects.get(slug=slug)

    course = Course.objects.filter(online_course=online_course).order_by("chpt")

    if online_course:
        
        oc_serializers = OnlineCourseSerializer(online_course)
        c_serializers = CourseSerializer(course, many=True)
        oc_serializers = dict(oc_serializers.data)
        oc_serializers["syllabus"] = c_serializers.data
        return Response(oc_serializers, status=status.HTTP_200_OK)
    else:
        return Response({"course_detail": "Empty"}, status=status.HTTP_404_NOT_FOUND)

@permission_classes([IsAuthenticated])
@api_view(["GET"]) 

def get_bought_online_course(request,slug):

    online_course = OnlineCourse.objects.get(slug=slug)

    course = Course.objects.filter(online_course=online_course).order_by("chpt")

    if online_course:
        
        oc_serializers = OnlineCourseSerializer(online_course)
        c_serializers = CourseSerializer(course, many=True)
        oc_serializers = dict(oc_serializers.data)
        oc_serializers["syllabus"] = c_serializers.data
        return Response(oc_serializers, status=status.HTTP_200_OK)
    else:
        return Response({"course_detail": "Empty"}, status=status.HTTP_404_NOT_FOUND)
    

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
    

@api_view(["GET"])
def get_study_materials(request):
    

    study_materials = StudyMaterial.objects.all().order_by("date_created")
    if(request.GET.get("category")):
        study_materials = study_materials.filter(category = request.GET.get("category"))
    
    if study_materials:
        print(study_materials)
        serializers = StudyMaterialSerializer(study_materials, many=True)

      

        return Response(serializers.data, status=status.HTTP_200_OK)
    else:
        return Response({"message": "Empty"}, status=status.HTTP_404_NOT_FOUND)
    

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
    