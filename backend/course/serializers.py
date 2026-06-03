from rest_framework import serializers
from .models import Course, Chapter, CourseReview


class ChapterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chapter
        fields = "__all__"
        read_only_fields = ("slug",)

    def __init__(self, *args, **kwargs):
        exclude_fields = kwargs.pop("exclude_fields", None)
        super().__init__(*args, **kwargs)

        if exclude_fields:
            for field in exclude_fields:
                self.fields.pop(field, None)


class CourseReviewSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = CourseReview
        fields = ["id", "username", "date_created", "rating", "comment"]


class CourseSerializer(serializers.ModelSerializer):
    course_chapters = ChapterSerializer(many=True, read_only=True)
    course_reviews = CourseReviewSerializer(
        source="course_coursereviews", many=True, read_only=True
    )
    avg_rating = serializers.FloatField(read_only=True)
    reviews_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Course
        fields = "__all__"
        read_only_fields = ("slug",)

    def __init__(self, *args, **kwargs):
        exclude_fields = kwargs.pop("exclude_fields", [])
        super().__init__(*args, **kwargs)

        if exclude_fields:
            for field in exclude_fields:
                self.fields.pop(field, None)

        if "course_chapters" not in exclude_fields and not self.context.get(
            "include_chapter_video"
        ):

            self.fields["course_chapters"] = ChapterSerializer(
                many=True, read_only=True, exclude_fields=["video"]
            )


# TODO
# class StudyMaterialSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = StudyMaterial
#         fields = "__all__"


# class EventSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Event
#         fields = "__all__"
