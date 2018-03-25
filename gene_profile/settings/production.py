from gene_proflie.settings.common import *
import os 

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY') 

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['.elasticbeanstalk.com']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ.get('RDS_DB_NAME'),
        'USER': os.environ.get('RDS_USERNAME'),
        'PASSWORD': os.environ.get('RDS_PASSWORD'),
        'HOST': os.environ.get('RDS_HOSTNAME'),
        'PORT': os.environ.get('RDS_PORT')
    }
}

# React Settings
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "assets"),
]

WEBPACK_LOADER = {
    'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.prod.json'),
        }
}

###################################
# s3 storage
###################################

MEDIAFILES_LOCATION = 'media'
STATICFILES_LOCATION = 'static'

DEFAULT_FILE_STORAGE = 'gene_proflie.config.S3utils.MediaStorage' 
STATICFILES_STORAGE = 'gene_proflie.config.S3utils.StaticStorage' 

AWS_STORAGE_BUCKET_NAME = 'gene-profile-s3'
AWS_S3_REGION_NAME = 'ap-south-1'  # e.g. us-east-2
AWS_ACCESS_KEY_ID = 'AKIAI67OXV2AQPCIFLTQ'
AWS_SECRET_ACCESS_KEY = 'lglcPhbK9sl0n3BKSZqB3Kh5kPRabqXfe5j6NvjA'

AWS_S3_OBJECT_PARAMETERS = {
    'Expires': 'Thu, 31 Dec 2099 20:00:00 GMT',
    'CacheControl': 'max-age=94608000',
}

AWS_QUERYSTRING_AUTH = False

S3_URL = 'http://%s.s3.amazonaws.com/' % AWS_STORAGE_BUCKET_NAME

STATIC_DIRECTORY = '/static/'
MEDIA_DIRECTORY = '/media/'

STATIC_URL = S3_URL + STATIC_DIRECTORY
MEDIA_URL = S3_URL + MEDIA_DIRECTORY


