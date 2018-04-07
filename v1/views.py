from django.contrib.auth.models import User
from .models import *
from rest_framework import viewsets
from rest_framework.decorators import api_view
from v1.serializers import *
from django_filters.rest_framework import DjangoFilterBackend

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
    })

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides list and detail actions
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

"""
class PostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

"""

class PatientViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides list, detail, create, update and delete actions
    """

    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class ClinicViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides list, detail, create, update and delete actions
    """

    queryset = Clinic.objects.all()
    serializer_class = ClinicSerializer

class DoctorViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides list, detail, create, update and delete actions
    """

    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides list, detail, create, update and delete actions
    """

    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class DirectCarePlanViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides list, detail, create, update and delete actions
    """

    queryset = DirectCarePlan.objects.all()
    serializer_class = DirectCarePlanSerializer

class SubscriptionViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides list, detail, create, update and delete actions
    """

    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer