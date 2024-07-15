import json

from .models import User, Customer, BookOwner
from .serializers import UserSerializer, BookOwnerSerializer, CustomerSerializer
from django.contrib.auth import authenticate, login
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, IsAdminUser


class UserRegistrationView(APIView):
    def post(self, request):
        data = json.loads(request.body)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookOwnerRegistrationView(APIView):
    def post(self, request):
        data = json.loads(request.body)
        serializer = BookOwnerSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomerRegistrationView(APIView):
    def post(self, request):
        data = json.loads(request.body)
        print("data ==> ", data)
        serializer = CustomerSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        username = data['username']
        password = data['password']

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            if created:
                token.delete()  # Delete the token if it was already created
                token = Token.objects.create(user=user)

            response_data = {
                'token': token.key,
                'username': user.username,
                'role': user.role,
            }

            # Book owner login
            if user.role == 'bookowner':
                book_owner = user.book_owner_account  # As the related name is "book_owner_account"
                if book_owner is not None:
                    # Add book-owner data to the response data
                    book_owner_data = BookOwnerSerializer(book_owner).data
                    response_data['data'] = book_owner_data
            elif user.role == 'customer':
                customer = user.customer_account
                if customer is not None:
                    # Add book-owner data to the response data
                    customer_data = CustomerSerializer(customer).data
                    response_data['data'] = customer_data

            return Response(response_data)
        else:
            return Response({'message': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)


class UserLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token_key = request.auth.key
        token = Token.objects.get(key=token_key)
        token.delete()

        return Response({'detail': 'Successfully logged out.'})


class CustomerListView(APIView):
    # permission_classes = [IsAuthenticated, IsAdminUser]
    def get(self, request):
        customers = Customer.objects.all()
        serializer = CustomerSerializer(customers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CustomerDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        customer = get_object_or_404(Customer, pk=pk)
        serializer = CustomerSerializer(customer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        customer = get_object_or_404(Customer, pk=pk)
        data = json.loads(request.body)
        serializer = CustomerSerializer(customer, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        customer = get_object_or_404(Customer, pk=pk)
        user = get_object_or_404(User, pk=customer.user.id)
        user.delete()
        print("Deleted Customer User: ", user)
        return Response(status=status.HTTP_204_NO_CONTENT)


class BookOwnerListView(APIView):
    # permission_classes = [IsAuthenticated, IsAdminUser]
    def get(self, request):
        book_owners = BookOwner.objects.all()
        serializer = BookOwnerSerializer(book_owners, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BookOwnerDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, pk):
        book_owner = get_object_or_404(BookOwner, pk=pk)
        serializer = BookOwnerSerializer(book_owner)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        book_owner = get_object_or_404(BookOwner, pk=pk)
        data = json.loads(request.body)
        serializer = BookOwnerSerializer(book_owner, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        book_owner = get_object_or_404(BookOwner, pk=pk)
        user = get_object_or_404(User, pk=book_owner.user.id)
        user.delete()
        print("Deleted Book-Owner User: ", user)
        return Response(status=status.HTTP_204_NO_CONTENT)

