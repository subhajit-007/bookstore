from django.urls import path
from django.contrib import admin
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

from . import views

# router = routers.DefaultRouter()
#
# urlpatterns = router.urls

urlpatterns = [
    # path('api-token-auth/', obtain_auth_token),  # gives access to token auth
    # path('signup/', UserRegistrationView.as_view(), name='user-registration'),
    path('customers/', views.CustomerListView.as_view(), name='customer-list'),
    path('customer/<int:pk>/', views.CustomerDetailView.as_view(), name='customer-detail'),
    path('book-owners/', views.BookOwnerListView.as_view(), name='book-owner-list'),
    path('book-owner/<int:pk>/', views.BookOwnerDetailView.as_view(), name='book-owner-detail'),
    path('book-owner/signup/', views.BookOwnerRegistrationView.as_view(), name='book-owner-registration'),
    path('customer/signup/', views.CustomerRegistrationView.as_view(), name='customer-registration'),
    path('login/', views.UserLoginView.as_view(), name='user-login'),
    path('logout/', views.UserLogoutView.as_view(), name='user-logout'),
]
