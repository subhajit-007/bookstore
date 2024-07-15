import json
from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response


from .models import Book
from .serializers import BookSerializers


class BooksListView(APIView):
    def get(self, request):
        books = Book.objects.all()
        serializer = BookSerializers(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BooksView(APIView):
    def post(self, request):
        book_data = json.loads(request.body)
        print("book_data ==> ", book_data)
        serializer = BookSerializers(data=book_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

