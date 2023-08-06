
from django.contrib import admin
from django.urls import path, re_path, include
from django.conf import settings
from django.views.generic import TemplateView
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
    path("auth/",include("apps.user.urls")),
    path("api/",include("apps.board.urls")),
    path("api/",include("apps.pin.urls")),
    path("api/",include("apps.comments.urls")),
    path("api/",include("apps.user_profile.urls")),
    path("api/",include("apps.search.urls"))
]

urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'))]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
