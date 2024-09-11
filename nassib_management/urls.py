from django.urls import include, path
from django.conf.urls import handler403, handler404, handler500
from nassib.views import error

urlpatterns = [
    path('', include('nassib.urls')),
]

handler403 = error
handler404 = error
handler500 = error
