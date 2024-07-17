from rest_framework import serializers
from django.shortcuts import get_object_or_404

from .models import Book
from bookstoreapp.models import BookOwner, User
from bookstoreapp.serializers import BookOwnerSerializer


class BookSerializers(serializers.ModelSerializer):
    book_owner = BookOwnerSerializer

    class Meta:
        model = Book
        fields = '__all__'

    def create(self, validated_data):
        book_owner = validated_data.pop('book_owner')
        book = Book.objects.create(**validated_data, book_owner=book_owner)
        print("New book added to DB")
        return book


