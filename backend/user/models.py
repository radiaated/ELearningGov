from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class UserProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="user_userprofile",
        null=False,
        blank=False,
    )
    gender = models.CharField(
        max_length=10,
        choices=(("m", "Male"), ("f", "Female"), ("o", "Other")),
        null=False,
        blank=False,
    )
    phone = models.CharField(max_length=15, null=False, blank=False)
    address = models.CharField(max_length=500, null=False, blank=False)
    academic_level = models.CharField(
        max_length=100,
        choices=(
            ("sec", "Secondary"),
            ("hsec", "Higher Secondary"),
            ("bch", "Bachelor"),
            ("mst", "Master"),
        ),
        null=False,
        blank=False,
    )

    def __str__(self):
        return self.user.username


# TODO
# class BuyStudyMat(models.Model):
#     user = models.ForeignKey(
#         User,
#         on_delete=models.CASCADE,
#         null=False,
#         blank=False,
#         related_name="buystudymat_user",
#     )
#     study_mat = models.ForeignKey(
#         StudyMaterial,
#         on_delete=models.CASCADE,
#         null=False,
#         blank=False,
#         related_name="buystudymat_studymat",
#     )
#     date_created = models.DateTimeField(auto_now_add=True, null=False, blank=False)
#     pidx = models.CharField(max_length=24, null=True, blank=True)
#     total_amount = models.IntegerField(default=1000, null=True, blank=True)
#     transaction_id = models.CharField(max_length=24, null=True, blank=True)

#     def __str__(self):
#         return f"{self.user.username}, {self.study_mat.title}"
