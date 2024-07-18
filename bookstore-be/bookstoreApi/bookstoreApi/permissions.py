from rest_framework.permissions import BasePermission


class IsBookOwner(BasePermission):
    """checks requested user is book owner or not"""
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'bookowner'

    def has_object_permission(self, request, view, obj):
        return request.user and obj.book_owner.user == request.user
