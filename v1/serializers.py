from rest_framework import serializers
from drf_queryfields import QueryFieldsMixin
from django.contrib.auth.models import User
from v1.models import *

class UserSerializer(QueryFieldsMixin, serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'first_name', 'last_name')

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