from django.shortcuts import render
from base.models import Course, Chapter
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from base.serializers import CourseSerializer, ChapterSerializer
from rest_framework.decorators import APIView, permission_classes
from rest_framework.permissions import IsAdminUser
from django.db import transaction
import json
from rest_framework import status

# Create your views here.

# class CourseListView(APIView):

#     @permission_classes(IsAdminUser)
#     def get(self, request):

#         print(request.user.is_superuser)

#         if request.user.is_superuser == False:

#             return Response({"detail": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

#         courses = OnlineCourse.objects.all()[::-1]

#         serializers = OnlineCourseSerializer(courses, many=True)

#         return Response(serializers.data)

#     @transaction.atomic
#     @permission_classes(IsAdminUser)
#     def post(self, request):

#         if request.user.is_superuser == False:

#             return Response({"detail": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)


#         rd = request.data

#         oc = OnlineCourse.objects.create(
#             slug=rd["title"].lower().replace(" ","-"),
#             title=rd["title"],
#             author=rd["author"],
#             language=rd["language"],
#             level=rd["level"],
#             description=rd["description"],
#             requirements=rd["requirements"],
#             category=rd["category"],
#             thumbnail=request.FILES.get("thumbnail"),
#             preview_video=request.FILES.get("preview_video"),
#             price=rd["price"],
#         )

#         if oc:
#             oc.save()

#         print(request.FILES)

#         for chpt_no, chapter in enumerate(json.loads(rd["chapters"])):
#             print("\n\n\he",chapter)
#             course_chapter = Course.objects.create(
#                 slug=chapter["title"].lower().replace(" ", "-"),
#                 title=chapter["title"],
#                 description=chapter["description"],
#                 duration=chapter["duration"],
#                 online_course=oc,
#                 chpt=chpt_no + 1,
#                 video=request.FILES.get(f'chpt_no{chpt_no + 1}'),
#             )

#             if course_chapter:

#                 course_chapter.save()


#         return Response({"detail": "Saved"})


# class CourseItemView(APIView):

#     @permission_classes(IsAdminUser)
#     def get(self, request, slug):

#         course = OnlineCourse.objects.filter(slug=slug)[0]

#         chapters = course.course_chapters.all()

#         course_serializers = OnlineCourseSerializer(course)
#         chapter_serializers = CourseSerializer(chapters, many=True)

#         return Response(
#             {"course": course_serializers.data, "chapters": chapter_serializers.data}
#         )

#     @transaction.atomic
#     @permission_classes(IsAdminUser)
#     def put(self, request, slug):

#         rd = request.data
#         oc = OnlineCourse.objects.filter(slug=slug)[0]

#         oc.slug = rd["title"].lower().replace(" ", "-")
#         oc.title = rd["title"]
#         oc.author = rd["author"]
#         oc.language = rd["language"]
#         oc.level = rd["level"]
#         oc.description = rd["description"]
#         oc.requirements = rd["requirements"]
#         oc.category = rd["category"]
#         oc.thumbnail = request.FILES.get("thumbnail") or oc.thumbnail
#         oc.preview_video = request.FILES.get("preview_video") or oc.preview_video
#         oc.price = rd["price"]

#         if oc:
#             oc.save()

#         for chpt_no, chapter in enumerate(json.loads(rd["chapters"])):

#             course_chapters = oc.course_chapters.filter(chpt=chpt_no + 1)

#             if course_chapters.exists():

#                 course_chapter = course_chapters[0]

#                 course_chapter.slug = chapter["title"].lower().replace(" ", "-")
#                 course_chapter.title = chapter["title"]
#                 course_chapter.description = chapter["description"]
#                 course_chapter.duration = chapter["duration"]
#                 course_chapter.chpt_no = chpt_no + 1
#                 course_chapter.video = (
#                     request.FILES.get(f"chpt_no{chpt_no + 1}") or course_chapter.video
#                 )

#                 if course_chapter:
#                     print(course_chapter)
#                     course_chapter.save()
#             else:
#                 course_chapter = Course.objects.create(
#                     slug=chapter["title"].lower().replace(" ", "-"),
#                     title=chapter["title"],
#                     description=chapter["description"],
#                     duration=chapter["duration"],
#                     online_course=oc,
#                     chpt=chpt_no + 1,
#                     video=request.FILES.get(f"chpt_no{chpt_no + 1}"),
#                 )

#                 if course_chapter:

#                     course_chapter.save()

#         return Response({"detail": "Saved"})

#     @permission_classes(IsAdminUser)
#     def delete(self, request, slug):

#         course = OnlineCourse.objects.filter(slug=slug)[0]

#         course.delete()

#         return Response({"detail": "Deleted"})
import json


class CourseViewSet(ModelViewSet):

    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAdminUser]
    lookup_field = "slug"

    def create(self, request, *args, **kwargs):

        course_data = request.data.dict()
        chapters_data = json.loads(course_data.pop("chapters", "[]"))

        print(chapters_data)

        # Create course
        course_serializer = CourseSerializer(data=course_data)
        course_serializer.is_valid(raise_exception=True)
        course = course_serializer.save()

        # Create chapters
        for i, chapter_data in enumerate(chapters_data):
            chapter_data["chpt"] = i
            chapter_data["course"] = course.id
            chapter_data["video"] = request.FILES.get(f"chpt_no{i + 1}")
            chapter_serializer = ChapterSerializer(data=chapter_data)
            chapter_serializer.is_valid(raise_exception=True)
            chapter_serializer.save()

        return Response(course_serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        course = self.get_object()
        chapters = course.course_chapters.all()

        course_serializer = CourseSerializer(course)
        chapter_serializer = ChapterSerializer(chapters, many=True)

        return Response(
            {"course": course_serializer.data, "chapters": chapter_serializer.data}
        )

    def update(self, request, *args, **kwargs):
        course = self.get_object()

        course_data = request.data.dict()
        chapters_data = json.loads(course_data.pop("chapters", "[]"))
        print(course_data)

        # ---------- UPDATE COURSE ----------
        course_serializer = CourseSerializer(course, data=course_data, partial=True)
        course_serializer.is_valid(raise_exception=True)
        course = course_serializer.save()

        # ---------- GET EXISTING CHAPTERS ----------
        existing_chapters = {c.id: c for c in course.course_chapters.all()}
        incoming_ids = []

        # ---------- CREATE / UPDATE ----------
        for i, chapter_data in enumerate(chapters_data):
            chapter_id = chapter_data.get("id", None)
            chapter_data["chpt"] = i
            chapter_data["course"] = course.id
            chapter_data["video"] = request.FILES.get(f"chpt_no{i + 1}")

            if chapter_id and chapter_id in existing_chapters:
                # UPDATE
                chapter_instance = existing_chapters[chapter_id]
                serializer = ChapterSerializer(
                    chapter_instance, data=chapter_data, partial=True
                )
                serializer.is_valid(raise_exception=True)
                serializer.save()
                incoming_ids.append(chapter_id)

            else:
                # CREATE
                serializer = ChapterSerializer(data=chapter_data)
                serializer.is_valid(raise_exception=True)
                chapter = serializer.save()
                incoming_ids.append(chapter.id)

        # ---------- DELETE REMOVED CHAPTERS ----------
        for chapter_id, chapter in existing_chapters.items():
            if chapter_id not in incoming_ids:
                chapter.delete()

        return Response(course_serializer.data, status=status.HTTP_200_OK)


# class ChapterViewSet(ModelViewSet):

#     queryset = Chapter.objects.all()
#     serializer_class = ChapterSerializer
#     permission_classes = [IsAdminUser]
#     lookup_field = "slug"
