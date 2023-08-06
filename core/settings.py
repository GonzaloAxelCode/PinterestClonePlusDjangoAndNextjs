import os
from pathlib import Path
import environ
from datetime import timedelta
env = environ.Env()

environ.Env.read_env()
ENVIRONMENT = env


BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get('SECRET_KEY')


DEBUG = True

ALLOWED_HOSTS = ["localhost:8000",
                 "http://127.0.0.1:8000",
                 "http://localhost:8000",
                 "http://127.0.0.1:3000",
                 "http://localhost:3000",
                 
                 "localhost",
                 "127.0.0.1",
                 "https://ecomerce-gonzalo.onrender.com",
                 ".ecomerce-gonzalo.onrender.com",
                 "www.ecomerce-gonzalo.onrender.com",
                 "ecomerce-gonzalo.onrender.com",
                 "http://192.168.10.100:3000",
                 "192.168.10.100:3000"]


# Application definition


DJANGO_APPS = ['django.contrib.admin',
               'django.contrib.auth',
               'django.contrib.contenttypes',
               'django.contrib.sessions',
               'django.contrib.messages',
               'django.contrib.staticfiles',
               "algoliasearch_django"
               ]
PROJECT_APPS = ["apps.user"]
PINTEREST_APPS = ["apps.user_profile","apps.board","apps.pin","apps.comments","apps.search"]
THIRD_PARTY_APPS = ["corsheaders",
                    "rest_framework",
                    "djoser",
                    "social_django",
                    "rest_framework_simplejwt",
                    "rest_framework_simplejwt.token_blacklist",
                    "ckeditor",
                    "ckeditor_uploader",
                    'cloudinary_storage',
                    'cloudinary',
                    'django.contrib.sites',
                    'allauth',
                    'allauth.account',
                    'allauth.socialaccount',
                    'allauth.socialaccount.providers.google',
                    "rest_framework.authtoken"
                    ]
INSTALLED_APPS = DJANGO_APPS + PROJECT_APPS + PINTEREST_APPS + THIRD_PARTY_APPS
CKEDITOR_UPLOAD_PATH = "/media/"
CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': 'full',
        'autoParagraph': False
    }
}

MIDDLEWARE = [
    'whitenoise.middleware.WhiteNoiseMiddleware',
        'corsheaders.middleware.CorsMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',

    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'static')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
WSGI_APPLICATION = 'core.wsgi.application'

# Database


DATABASES = {
    "default": env.db("DATABASE_URL", default="postgres:///ninerogues"),
}
DATABASES["default"]["ATOMIC_REQUESTS"] = True

CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    'http://127.0.0.1:3000',
]

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    'http://127.0.0.1:3000',
]


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

#Rest framework

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 12
}
AUTHENTICATION_BACKENDS = (
    'social_core.backends.google.GoogleOAuth2',
    'social_core.backends.facebook.FacebookOAuth2',
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
    
)
SIMPLE_JWT = {
    "AUTH_HEADER_TYPES": ("JWT",),
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=10080),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
    "ROTATE_REFRESH_TOKEN": True,
    "AUTH_TOKEN_CLASES": (
        "rest_framework_simplejwt.tokens.AccessToken"
    )
}

DJOSER = {
    'LOGIN_FIELD': 'email',
    'USER_CREATE_PASSWORD_RETYPE': True,
    'USERNAME_CHANGED_EMAIL_CONFIRMATION': True,
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True,
    'SEND_CONFIRMATION_EMAIL': True,
    'SET_USERNAME_RETYPE': True,
    'PASSWORD_RESET_CONFIRM_URL': 'password/reset/confirm/{uid}/{token}',
    'SET_PASSWORD_RETYPE': True,
    'PASSWORD_RESET_CONFIRM_RETYPE': True,
    'USERNAME_RESET_CONFIRM_URL': 'email/reset/confirm/{uid}/{token}',
    'ACTIVATION_URL': 'activate/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': True,
    'SOCIAL_AUTH_TOKEN_STRATEGY': 'djoser.social.token.jwt.TokenStrategy',
    'SOCIAL_AUTH_ALLOWED_REDIRECT_URIS': ['http://localhost:8000/google', 'http://localhost:8000/facebook'],
    'SERIALIZERS': {
        'user_create': 'apps.user.serializers.UserAcountCreateSerializer',
        'user': 'apps.user.serializers.UserAcountCreateSerializer',
        'current_user': 'apps.user.serializers.UserAcountCreateSerializer',
        'user_delete': 'djoser.serializers.UserDeleteSerializer',
    },
    'PERMISSIONS': {
        'user_delete': ['rest_framework.permissions.IsAuthenticated', 'user.models.CanDeleteUser'],
    },

    
}
AUTH_USER_MODEL = "user.UserAccount"



LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/Lima'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static')
]
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
DEFAULT_FILE_STORAGE = "cloudinary_storage.storage.MediaCloudinaryStorage"


CLOUDINARY_STORAGE = {
    'CLOUD_NAME': os.environ.get("CLOUD_NAME"),
    'API_KEY': os.environ.get("API_KEY_CLOUDINARY"),
    'API_SECRET': os.environ.get("API_SECRET_CLOUDINARY")
}
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

GOOGLE_CLIENT_ID=os.environ.get("SOCIAL_AUTH_GOOGLE_OAUTH2_KEY")
SITE_DOMAIN = 'localhost:8000'
SITE_ID = 1




ALGOLIA = {
    'APPLICATION_ID': os.environ.get("APPLICATION_ID"),
    'API_KEY': os.environ.get("API_KEY"),
    'PINS_INDEX':os.environ.get("PINS_INDEX"),
    'BOARDS_INDEX':os.environ.get("BOARDS_INDEX"),
    'USERACCOUNT_INDEX':os.environ.get("USERACCOUNT_INDEX"),
    'MYPINS_INDEX':os.environ.get("MYPINS_INDEX"),
}
AUTO_INDEXING=True