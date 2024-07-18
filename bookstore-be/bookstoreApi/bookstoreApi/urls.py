from django.urls import path, include
from django.contrib import admin
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()

urlpatterns = router.urls

urlpatterns += [
    path('admin/', admin.site.urls),
    # path('api-token-auth/', obtain_auth_token),  # gives access to token auth
    path('api/', include('bookstoreapp.urls')),
    path('api/book/', include('booksapp.urls')),
    path('api/orders/', include('bookordersapp.urls')),
]
