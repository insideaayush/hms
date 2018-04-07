from django.urls import path, include
from rest_framework.routers import DefaultRouter
from v1 import views

from rest_framework.schemas import get_schema_view
schema_view = get_schema_view(title="GENE PROFILE API")

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'patients', views.PatientViewSet)
router.register(r'clinics', views.ClinicViewSet)
router.register(r'doctors', views.DoctorViewSet)
router.register(r'appointments', views.AppointmentViewSet)
router.register(r'directcareplans', views.DirectCarePlanViewSet)
router.register(r'subscriptions', views.SubscriptionViewSet)
"""
router.register(r'tags', views.TagViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'posts', views.PostViewSet)
"""
urlpatterns = [
    path('schema/', schema_view),
    path('', include(router.urls)),
]
