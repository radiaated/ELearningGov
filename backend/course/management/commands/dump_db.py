from django.core.management.base import BaseCommand
from django.core.serializers.json import DjangoJSONEncoder

from course.models import Course, Chapter

import json


class Command(BaseCommand):
    help = "Dumps course and chapter records from database into records.json."

    def handle(self, *args, **kwargs):
        try:

            data = {
                "course_course": list(Course.objects.values()),
                "course_chapter": list(Chapter.objects.values()),
            }

            # Write to JSON file
            with open(
                "./course/management/commands/records.json", "w", encoding="utf-8"
            ) as file:
                json.dump(
                    data, file, indent=4, ensure_ascii=False, cls=DjangoJSONEncoder
                )

            self.stdout.write(
                "Records of course and chapters dumped into records.json successfully."
            )

        except Exception as ex:
            self.stdout.write(self.style.ERROR(f"Exception: {ex}"))
