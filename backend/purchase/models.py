from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator

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
    pidx = models.CharField(max_length=24, null=False, blank=False)
    total_amount = models.FloatField(
        default=1000, validators=[MinValueValidator(1000)], null=False, blank=False
    )
    transaction_id = models.CharField(max_length=24, null=False, blank=False)
    date_created = models.DateTimeField(auto_now_add=True, null=False, blank=False)

    def __str__(self):
        return f"{self.user.username}, {self.course.title}"
