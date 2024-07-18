import json
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Order
from .serializers import OrderSerializer, OrderCreateSerializer

from booksapp.models import Book
from bookstoreApi.permissions import IsBookOwner


# Orders Views

class OrderListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role == 'customer':
            orders = Order.objects.filter(customer__user=user)
        elif user.role == 'bookowner':
            orders = Order.objects.filter(book__book_owner__user=user)
        else:
            orders = Order.objects.none()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        user = request.user
        if user.role != 'customer':
            return Response({"detail": "Not authorized to place orders."}, status=status.HTTP_403_FORBIDDEN)
        serializer = OrderCreateSerializer(data=json.loads(request.body), context={'user': request.user})
        if serializer.is_valid():
            book = Book.objects.get(id=serializer.validated_data['book'].id)
            if book.quantity_aval < serializer.validated_data['quantity']:
                return Response({"detail": "Not enough stock available."}, status=status.HTTP_400_BAD_REQUEST)
            book.quantity_aval -= serializer.validated_data['quantity']
            book.save()
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return None

    def get(self, request, pk):
        order = self.get_object(pk)
        if order is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def patch(self, request, pk):
        user = request.user
        if user.role != 'bookowner':
            return Response({"detail": "Not authorized to manage orders."}, status=status.HTTP_403_FORBIDDEN)
        order = self.get_object(pk)
        if order is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if order.book.book_owner.user != user:
            return Response({"detail": "Not authorized to manage this order."}, status=status.HTTP_403_FORBIDDEN)
        serializer = OrderCreateSerializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderManageAPIView(APIView):
    permission_classes = [IsBookOwner]

    def get_object(self, pk):
        try:
            return Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return None

    def patch(self, request, pk):
        user = request.user
        order = self.get_object(pk)
        if order is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if order.book.book_owner.user != user:
            return Response({"detail": "Not authorized to manage this order."}, status=status.HTTP_403_FORBIDDEN)
        serializer = OrderCreateSerializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ActiveOrderListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(status__in=['pending', 'approved', 'shipped'])
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


