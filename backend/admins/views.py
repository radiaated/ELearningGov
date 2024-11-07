from django.shortcuts import render
from base.models import *
from rest_framework.response import Response
from base.serializers import *
from rest_framework.decorators import APIView, permission_classes
from rest_framework.permissions import IsAdminUser
from django.db import transaction
import json
from rest_framework import status
# Create your views here.

class CourseListView(APIView):

    @permission_classes(IsAdminUser)
    def get(self, request):

        print(request.user.is_superuser)

        if request.user.is_superuser == False:

            return Response({"detail": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

        courses = OnlineCourse.objects.all()[::-1]

        serializers = OnlineCourseSerializer(courses, many=True)

        return Response(serializers.data)
    
    @transaction.atomic
    @permission_classes(IsAdminUser)
    def post(self, request):

        if request.user.is_superuser == False:

            return Response({"detail": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)


        rd = request.data

        oc = OnlineCourse.objects.create(
            slug=rd["title"].lower().replace(" ","-"),
            title=rd["title"],
            author=rd["author"],
            language=rd["language"],
            level=rd["level"],
            description=rd["description"],
            requirements=rd["requirements"],
            category=rd["category"],
            thumbnail=request.FILES.get("thumbnail"),
            preview_video=request.FILES.get("preview_video"),
            price=rd["price"],
        )

        if oc:
            oc.save()

        print(request.FILES)

        for chpt_no, chapter in enumerate(json.loads(rd["chapters"])):
            print("\n\n\he",chapter)
            course_chapter = Course.objects.create(
                slug=chapter["title"].lower().replace(" ", "-"),
                title=chapter["title"],
                description=chapter["description"],
                duration=chapter["duration"],
                online_course=oc,
                chpt=chpt_no + 1,
                video=request.FILES.get(f'chpt_no{chpt_no + 1}'),
            )

            if course_chapter:

                course_chapter.save()
        

        return Response({"detail": "Saved"})
    


class CourseItemView(APIView):

    @permission_classes(IsAdminUser)
    def get(self, request, slug):

        course = OnlineCourse.objects.filter(slug=slug)[0]

        chapters = course.course_chapters.all()

        course_serializers = OnlineCourseSerializer(course)
        chapter_serializers = CourseSerializer(chapters, many=True)

        return Response({"course": course_serializers.data, "chapters": chapter_serializers.data})
    
    @transaction.atomic
    @permission_classes(IsAdminUser)
    def put(self, request, slug):

        rd = request.data
        oc = OnlineCourse.objects.filter(slug=slug)[0]

        

        oc.slug=rd["title"].lower().replace(" ","-")
        oc.title=rd["title"]
        oc.author=rd["author"]
        oc.language=rd["language"]
        oc.level=rd["level"]
        oc.description=rd["description"]
        oc.requirements=rd["requirements"]
        oc.category=rd["category"]
        oc.thumbnail=request.FILES.get("thumbnail") or oc.thumbnail
        oc.preview_video=request.FILES.get("preview_video") or oc.preview_video
        oc.price=rd["price"]
        
        if oc:
            oc.save()

        for chpt_no, chapter in enumerate(json.loads(rd["chapters"])):

            course_chapters = oc.course_chapters.filter(chpt=chpt_no + 1)

            if course_chapters.exists():

                course_chapter = course_chapters[0]

                
                course_chapter.slug=chapter["title"].lower().replace(" ", "-")
                course_chapter.title=chapter["title"]
                course_chapter.description=chapter["description"]
                course_chapter.duration=chapter["duration"]
                course_chapter.chpt_no = chpt_no + 1
                course_chapter.video=request.FILES.get(f'chpt_no{chpt_no + 1}') or course_chapter.video
                
                if course_chapter:
                    print(course_chapter)
                    course_chapter.save()
            else:
                course_chapter = Course.objects.create(
                    slug=chapter["title"].lower().replace(" ", "-"),
                    title=chapter["title"],
                    description=chapter["description"],
                    duration=chapter["duration"],
                    online_course=oc,
                    chpt=chpt_no + 1,
                    video=request.FILES.get(f'chpt_no{chpt_no + 1}'),
                )

                if course_chapter:

                    course_chapter.save()

        

        return Response({"detail": "Saved"})


    @permission_classes(IsAdminUser)
    def delete(self, request, slug):

        course = OnlineCourse.objects.filter(slug=slug)[0]

        course.delete()

        return Response({"detail": "Deleted"})