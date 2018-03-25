from rest_framework import serializers
from drf_queryfields import QueryFieldsMixin
from django.contrib.auth.models import User
from v1.models import *

class UserSerializer(QueryFieldsMixin, serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'first_name', 'last_name')
