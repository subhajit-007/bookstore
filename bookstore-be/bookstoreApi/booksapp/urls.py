from django.urls import path

from . import views


urlpatterns = [
    path('list/', views.BooksListView.as_view(), name='book-list'),
    path('add/', views.BooksView.as_view(), name='create-book'),
]
