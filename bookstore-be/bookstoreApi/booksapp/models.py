from django.db import models
from bookstoreapp.models import BookOwner


# Create your models here.
class Book(models.Model):
    book_owner = models.ForeignKey(BookOwner, on_delete=models.CASCADE, related_name="book_owner")
    title = models.CharField(max_length=255, blank=False)
    author = models.CharField(max_length=255, default="")
    price = models.CharField(max_length=255, blank=False)
    rating = models.CharField(max_length=10, default="0")
    thumbnail = models.URLField(blank=True)
    quantity_aval = models.PositiveIntegerField(blank=False)

    def __str__(self):
        return f"id: {self.id} title:{self.title}"
