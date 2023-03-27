# from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions
# from rest_framework.decorators import api_view
from api.serializers import AccountsSerializer
from .models import Accounts
from owner.models import Company
from rest_framework.parsers import MultiPartParser, FormParser

# Create your views here.

from django.db.models import Q

from django.contrib.auth import get_user_model

MyUser = get_user_model()

class UsernameOrEmailBackend(object):
    def authenticate(self, email=None, password=None, **kwargs):
        try:
           # Try to fetch the user by searching the username or email field
            user = MyUser.objects.get(Q(username=email)|Q(email=email))
            if user.check_password(password):
                return user
        except MyUser.DoesNotExist:
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a non-existing user (#20760).
            MyUser().set_password(password)

class Register(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, id):
        item = Accounts.objects.get(id = id)
        serializer = AccountsSerializer(instance=item)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def post(self, request):
        req_data = request.data
        if 'company_id' in req_data:
            if Company.objects.filter(id = req_data['company_id']).exists() == False:
                return Response({'error':'Company is not Registered!!'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        if Accounts.objects.filter(username = req_data['username']).exists():
            return Response({'error':'Username already Exist!!'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        if Accounts.objects.filter(email = req_data['email']).exists():
            return Response({'error':'Email already Exist!!'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        if Accounts.objects.filter(phone = req_data['phone']).exists():
            return Response({'error':'Phone number is already Exist!!'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        if len(req_data['phone']) != 10:
            return Response({'error':'Phone number is not Valid!!'}, status=status.HTTP_406_NOT_ACCEPTABLE)

        user = AccountsSerializer(data=request.data)

        # print(user)
        # print(type(user.image))
        
        if user.is_valid():
            user.save()
            return Response(user.data, status=status.HTTP_201_CREATED)
        else:
            print(user.errors)
            return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, id):
        item = Accounts.objects.get(id=id)
        data = request.data
        item.first_name = data['first_name']
        item.last_name = data['last_name']
        if Accounts.objects.filter(username = data['username']).exists() and item.username != data['username']:
            return Response({'error':'Username already Exist!!'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        item.username = data['username']
        if Accounts.objects.filter(email = data['email']).exists() and item.email != data['email']:
            return Response({'error':'Email already Exist!!'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        item.email = data['email']
        if Accounts.objects.filter(phone = data['phone']).exists() and item.phone != data['phone']:
            return Response({'error':'Phone number is already Exist!!'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        if len(data['phone']) != 10:
            return Response({'error':'Phone number is not Valid!!'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        item.phone = data['phone']
        item.save()
        serializer = AccountsSerializer(instance=item)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

class getUser(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    def get(self, request):
        user = Accounts.object.get(username = request.user)
        user = AccountsSerializer(user)
        return Response(user.data, status=status.HTTP_200_OK)
    
    def put(self, request):
        user = request.user
        item = Accounts.objects.get(username = user)
        data = request.data
        print(data['last_name'])
        item.first_name = data['first_name']
        item.last_name = data['last_name']
        if Accounts.objects.filter(username = data['username']).exists() and item.username != data['username']:
            return Response({'error':'Username already Exist!!'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        item.username = data['username']
        if Accounts.objects.filter(email = data['email']).exists() and item.email != data['email']:
            return Response({'error':'Email already Exist!!'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        item.email = data['email']
        if Accounts.objects.filter(phone = data['phone']).exists() and item.phone != data['phone']:
            return Response({'error':'Phone number is already Exist!!'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        if len(data['phone']) != 10:
            return Response({'error':'Phone number is not Valid!!'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        item.phone = data['phone']
        item.save()
        serializer = AccountsSerializer(instance=item)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

class AddPic(APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        user = Accounts.objects.get(username = request.user)
        data = request.data
        if 'image' in data:
            user.image = data['image']
        user.save()
        serializer = AccountsSerializer(instance=user)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)



