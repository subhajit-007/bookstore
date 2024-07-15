from rest_framework import serializers
from django.shortcuts import get_object_or_404

from .models import Book
from bookstoreapp.models import BookOwner, User
from bookstoreapp.serializers import BookOwnerSerializer


class BookSerializers(serializers.ModelSerializer):
    book_owner = BookOwnerSerializer()

    class Meta:
        model = Book
        fields = '__all__'

    def create(self, validated_data):
        print("creating new book entry")
        book_owner_data = validated_data.pop('book_owner')
        user_data = book_owner_data.pop('user')

        # Check if the user already exists
        user = User.objects.filter(username=user_data['username']).first()
        # Check if the BookOwner already exists
        book_owner = BookOwner.objects.filter(user=user).first()

        print("book_owner ===> ", book_owner)

        # book_owner = get_object_or_404(BookOwner, pk=book_owner_data.id)

        book = Book.objects.create(**validated_data, book_owner=book_owner)
        return book


