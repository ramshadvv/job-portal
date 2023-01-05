from rest_framework.response import Response
from rest_framework.decorators import api_view
# from rest_framework.views import APIView
from rest_framework import status
from owner.serializers import *
from userapp.serializers import *
from api.serializers import *

# Create your views here.

@api_view(['GET'])
def UsersListView(request):
    if Accounts.objects.filter(username=request.user):
        user = Accounts.objects.get(username = request.user)
        if user.is_staff == True:
            users = Accounts.objects.filter(is_user = True, is_approved=True, is_admin = False).order_by('id')
            serializer = AccountsSerializer(instance=users, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def CheckCompany(request):
    cmp = request.data
    if Company.objects.filter(id=cmp['company_id']):
        item = Company.objects.filter(id=cmp['company_id']).values('id')
        item = item[0]
        return Response(item, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
