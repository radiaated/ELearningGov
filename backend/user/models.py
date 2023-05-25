from django.db import models
from django.contrib.auth.models import User
from base.models import OnlineCourse, StudyMaterial

# Create your models here.

class UserDetail(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name="userdetail_user")
    gender = models.CharField(max_length=10, choices=(('m', 'Male'), ('f', "Female"), ('o', 'Other')), null=False, blank=False)
    phone = models.CharField(max_length=15, null=False, blank=False)
    address = models.CharField(max_length=500, null=True, blank=True)
    academic_level = models.CharField(max_length=100, choices=(('sec', 'Secondary'), ('hsec', 'Higher Secondary'), ('bch', 'Bachelor'), ('mst', 'Master')), null=True, blank=True)
    
    def __str__(self):
        return self.user.username
   
class BuyCourse(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name="buycourse_user")
    online_course = models.ForeignKey(OnlineCourse, on_delete=models.CASCADE, null=False, blank=False, related_name="buycourse_course")
    date_created = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    pidx = models.CharField(max_length=24, null=True, blank=True)
    total_amount = models.IntegerField(default=1000, null=True, blank=True)
    transaction_id = models.CharField(max_length=24, null=True, blank=True)

    def __str__(self):
        return f'{self.user.username}, {self.online_course.title}'
    
class BuyStudyMat(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name="buystudymat_user")
    study_mat = models.ForeignKey(StudyMaterial, on_delete=models.CASCADE, null=False, blank=False, related_name="buystudymat_studymat")
    date_created = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    pidx = models.CharField(max_length=24, null=True, blank=True)
    total_amount = models.IntegerField(default=1000, null=True, blank=True)
    transaction_id = models.CharField(max_length=24, null=True, blank=True)

    def __str__(self):
        return f'{self.user.username}, {self.study_mat.title}'

class CourseReview(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name="review_user")
    online_course = models.ForeignKey(OnlineCourse, on_delete=models.CASCADE, null=False, blank=False, related_name="review_course")
    rating = models.IntegerField(default=5, null=False, blank=False)
    comment = models.CharField(max_length=1000, null=False, blank=False)
    date_created = models.DateTimeField(auto_now_add=True, null=True, blank=True)


    def __str__(self):
        return f'{self.user.username}, {self.online_course.title}'


