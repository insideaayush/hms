from rest_framework import serializers
from drf_queryfields import QueryFieldsMixin
from v1.models import *

class UserSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'first_name', 'last_name', 'email',
                  'is_patient', 'is_clinic', 'is_doctor')


"""
# Serializer for blog part
class TagSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('url', 'id', 'name')

class CategorySerializer(QueryFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('url', 'id', 'name')

class PostSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    category = CategorySerializer()
    tags = TagSerializer(many=True)
    
    class Meta:
        model = Post
        fields = (
            'url', 
            'id', 
            'author', 
            'category', 
            'title',
            'description',
            'tags',
            'byline',
            'slug',
            'background_image',
            'content',
            'updated_on',
            'created_on',
            'publish_on'
        )
"""

class PatientSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    # user = UserSerializer()
    class Meta:
        model = Patient
        fields = ('url', 'id', 'user', 'mobile', 'gender', 'has_subscription',
                  'joined_on', 'last_updated_on')

class  ClinicSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    # user = UserSerializer()
    available_doctors = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    class Meta:
        model = Clinic
        fields = ('url', 'id', 'user', 'address', 'joined_on',
                  'last_updated_on', 'available_doctors')

class DoctorSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    # user = UserSerializer()
    available_at = ClinicSerializer()
    all_clinics = ClinicSerializer(many=True)

    class Meta:
        model = Doctor
        fields = ('url', 'id', 'user', 'available_at', 'all_clinics',
                  'specialization', 'description', 'joined_on',
                  'last_updated_on')

class AppointmentSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ('url', 'id', 'booking_id', 'book_by', 'doctor', 'location',
                  'status', 'created_on', 'last_updated_on', 'preferred_time',
                  'appointment_time')


class DirectCarePlanSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = DirectCarePlan
        fields = ('url', 'id', 'kind')

class SubscriptionSerializer(QueryFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ('url', 'id', 'kind', 'patient', 'active', 'created_on',
                  'last_updated_on')
