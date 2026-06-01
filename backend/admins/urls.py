from .views import CourseViewSet
from rest_framework import routers

router = routers.SimpleRouter()

router.register(r"course", CourseViewSet)

urlpatterns = router.urls
