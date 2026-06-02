from django.db import models
from django.contrib.auth.models import User

from course.models import Course

# Create your models here.


class CoursePurchase(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        related_name="user_coursepurchases",
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        related_name="course_coursepurchases",
    )
    date_created = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    pidx = models.CharField(max_length=24, null=True, blank=True)
    total_amount = models.IntegerField(default=1000, null=True, blank=True)
    transaction_id = models.CharField(max_length=24, null=True, blank=True)

    def __str__(self):
        return f"{self.user.username}, {self.course.title}"
