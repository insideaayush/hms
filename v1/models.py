from django.conf import settings
from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from froala_editor.fields import FroalaField


class Category(models.Model):
    name = models.CharField(max_length=32)

    class Meta:
        verbose_name_plural = "Categories"

    def __unicode__(self):
        return self.name

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=32)

    def __unicode__(self):
        return self.name

    def __str__(self):
        return self.name

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=64,unique=True)
    tags = models.ManyToManyField(Tag)
    byline = models.CharField(max_length=255)
    description = models.TextField()
    slug = models.SlugField(max_length=128, unique=True, blank=True)
    content = models.TextField()
    background_image = models.ImageField(null=True)
    updated_on = models.DateTimeField(auto_now=True)
    created_on = models.DateTimeField(auto_now_add=True)
    publish_on = models.DateTimeField()
    list_display = ('title', 'category', 'tags', 'author', 'publish_on','created_on','updated_on')
    search_fields = ['title','byline','symbol']
    list_filter = ['publish_on','created_on']
    date_hierarchy = 'pub_date'

    def __unicode__(self):
        return self.title

    def __str__(self):
        return self.title

    def _get_unique_slug(self):
        slug = slugify(self.title)
        unique_slug = slug
        num = 1
        while Post.objects.filter(slug=unique_slug).exists():
            unique_slug = '{}-{}'.format(slug, num)
            num += 1
        return unique_slug

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self._get_unique_slug()
        super(Post, self).save(*args, **kwargs)
