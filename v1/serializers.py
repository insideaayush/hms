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
    user = UserSerializer()
    # available_at = ClinicSerializer()
    # all_clinics = ClinicSerializer(many=True)

    class Meta:
        model = Doctor
        fields = ('url', 'id', 'user', 'available_at', 'all_clinics',
                  'specialization', 'description', 'joined_on',
                  'last_updated_on')

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        try:
            user_object = User.objects.create(**user_data)
        except:
            raise serializers.ValidationError("User with provided isInvalid")
        else:
            pass

        doctor = Doctor.objects.create(user=user_object, **validated_data)
        return doctor
        
    # def create(self, validated_data):
    #     user_data = validated_data.pop('user')
    #     available_at_data = validated_data.pop('available_at')
    #     all_clinics_data = validated_data.pop('all_clinics')

    #     # handle user data
    #     if user_data.get('id'):
    #         try:
    #             user_object = User.objects.get(pk=user_data.get('id'))
    #         except:
    #             raise serializers.ValidationError("User with provided id does not exist!")
    #         else:
    #             pass
    #     else:
    #         user_object = User.objects.create(**user_data)

    #     # handle available data
    #     if available_at_data.get('id'):
    #         try:
    #             available_at_object = Clinic.objects.get(pk=available_at_data.get('id'))
    #         except:
    #             raise serializers.ValidationError(
    #                 "Clinic with provided id does not exist!")
    #         else:
    #             pass
    #     else:
    #         available_at_object = Clinic.objects.create(**available_at_data)

    #     doctor = Doctor.objects.create(user=user_object, available_at=available_at_object, **validated_data)
    #     # handle all clinics data
    #     for clinic_data in all_clinics_data:
    #         if clinic_data.get('id'):
    #             try:
    #                 clinic_object = Clinic.objects.get(pk=clinic_data.get('id'))
    #             except:
    #                 raise serializers.ValidationError(
    #                     "Clinic (available clinics) with provided id does not exist!")
    #             else:
    #                 pass
    #         else:
    #             clinic_object = Clinic.objects.create(**clinic_data)

    #         doctor.all_clinics.add(clinic_object)

    #     return doctor

    # def update(self, instance, validated_data):
    #     if validated_data.get('user'):
    #         user_data = validated_data.pop('user')
    #         # handle user data
    #         if user_data.get('id'):
    #             try:
    #                 user_object = User.objects.get(pk=user_data.get('id'))
    #             except:
    #                 raise serializers.ValidationError(
    #                     "User with provided id does not exist!")
    #             else:
    #                 pass
    #         else:
    #             user_object = User.objects.create(**user_data)

    #         instance.user = user_object
    #     print(validated_data.get('available_at'))
    #     if validated_data.get('available_at'):
    #         print("hello")
    #         available_at_data = validated_data.pop('available_at')
    #         # handle available data
    #         if available_at_data.get('id'):
    #             try:
    #                 available_at_object = Clinic.objects.get(
    #                     pk=available_at_data.get('id'))
    #             except:
    #                 raise serializers.ValidationError(
    #                     "Clinic with provided id does not exist!")
    #             else:
    #                 pass
    #         else:
    #             available_at_object = Clinic.objects.create(**available_at_data)

    #         instance.available_at = available_at_object

    #     instance.save()

    #     if validated_data.get('all_clinics'):
    #         all_clinics_data = validated_data.pop('all_clinics')

    #         doctor = Doctor.objects.get(instance.id)
    #         doctor.all_clinics.clear()

    #         # handle all clinics data
    #         for clinic_data in all_clinics_data:
    #             if clinic_data.get('id'):
    #                 try:
    #                     clinic_object = Clinic.objects.get(
    #                         pk=clinic_data.get('id'))
    #                 except:
    #                     raise serializers.ValidationError(
    #                         "Clinic (available clinics) with provided id does not exist!"
    #                     )
    #                 else:
    #                     pass
    #             else:
    #                 clinic_object = Clinic.objects.create(**clinic_data)

    #             doctor.all_clinics.add(clinic_object)

    #         doctor.save()
    #     return instance






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
