from django.core.management.base import BaseCommand
from django.db import transaction

from course.models import Course, Chapter

import json


class Command(BaseCommand):
    help = "Loads course and chapter records from records.json into database."

    def handle(self, *args, **kwargs):
        try:

            with open(
                "./course/management/commands/records.json", "r", encoding="UTF-8"
            ) as file:
                with transaction.atomic():
                    record = json.load(file)

                    courses = [Course(**course) for course in record["course_course"]]

                    Course.objects.bulk_create(courses)

                    chapters = [
                        Chapter(**chapter) for chapter in record["course_chapter"]
                    ]

                    Chapter.objects.bulk_create(chapters)

                    self.stdout.write(
                        "Records of course and chapters loaded into database successfully."
                    )

        except Exception as ex:
            print("Exception:")
            print(ex)
