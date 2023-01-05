from rest_framework.response import Response
from rest_framework.decorators import api_view
# from rest_framework.views import APIView
from rest_framework import status
from owner.serializers import *
from userapp.serializers import *
from api.serializers import *

# Create your views here.

@api_view(['GET'])
def EmployeeView(request):
    if Accounts.objects.filter(username=request.user):
        user = Accounts.objects.get(username = request.user)
        if user.username == 'admin':
            employees = Accounts.objects.filter(is_staff = True, is_approved=True, is_admin = False).order_by('company_id')
            serializer = AccountsSerializer(instance=employees, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def BlockCompanyView(request, id):
    if Accounts.objects.filter(username=request.user):
        user = Accounts.objects.get(username = request.user)
        if user.username == 'admin':
            if Company.objects.filter(id=id):
                company = Company.objects.get(id=id)
                owner   = Accounts.objects.get(username=company.owner)
                staffs  = Accounts.objects.filter(company_id = id)
                if company.is_active == True:
                    company.is_active = False
                    owner.is_active = False
                    for staff in staffs:
                        staff.is_active = False
                        staff.save()
                else:
                    company.is_active = True
                    owner.is_active = True
                    for staff in staffs:
                        staff.is_active = True
                        staff.save()
                company.save()
                owner.save()
                return Response({'success':'Block or Unblock is success'}, status=status.HTTP_200_OK)
            else:
                return Response({'error':'Company is Not Exist!!'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
