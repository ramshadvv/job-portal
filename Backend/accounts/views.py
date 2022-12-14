# from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
# from rest_framework.decorators import api_view
from api.serializers import AccountsSerializer
from .models import Accounts

# Create your views here.

class Register(APIView):
    def get(self, request, id):
        item = Accounts.objects.get(id = id)
        serializer = AccountsSerializer(instance=item)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def post(self, request):
        req_data = request.data

        if Accounts.objects.filter(username = req_data['username']).exists():
            return Response({'error':'Username already Exist!!'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        elif Accounts.objects.filter(email = req_data['email']).exists():
            return Response({'error':'Email already Exist!!'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        elif Accounts.objects.filter(phone = req_data['phone']).exists():
            return Response({'error':'Phone number is already Exist!!'}, status=status.HTTP_406_NOT_ACCEPTABLE)
        elif len(req_data['phone']) != 10:
            return Response({'error':'Phone number is not Valid!!'}, status=status.HTTP_406_NOT_ACCEPTABLE)

        user = AccountsSerializer(data=req_data)
        print(user.is_valid())
        if user.is_valid():
            user.save()
            return Response(user.data, status=status.HTTP_201_CREATED)
        else:
            print(user.errors)
            return Response(user.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, id):
        item = Accounts.objects.get(id=id)
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


