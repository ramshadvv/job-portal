from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status, permissions
from .serializers import *
from api.serializers import *
from staff.serializers import *
# Create your views here.

class CompanyView(APIView):
    permission_classes = [permissions.IsAuthenticated,]
    
    def get(self, request):
        company    = Company.objects.all().order_by('id')
        serializer = CompanySerializer(instance=company, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
        
    def post(self, request):
        company = CompanySerializer(data=request.data, context={'request': request})
        if company.is_valid():
            company.save()
            return Response(company.data,status=status.HTTP_201_CREATED)
        else:
            print(company.errors)
            return Response(company.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        company = Company.objects.get(id=id)
        data      = request.data
        company.cmp_name    = data['cmp_name']
        company.cmp_place   = data['cmp_place']
        company.cmp_phone   = data['cmp_phone']
        company.cmp_address = data['cmp_address']
        company.save()
        serializer = CompanySerializer(instance=company)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    def delete(self, request, id):
        company = Company.objects.get(id=id)
        owner   = Accounts.objects.get(username = company.owner)
        staffs  = Accounts.objects.filter(company_id = id)
        for item in staffs:
            item.delete()
        owner.delete()
        company.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

@api_view(['GET'])
def companyDetails(request):
    user = request.user
    if user:
        if Company.objects.filter(owner = user):
            cmp = Company.objects.get(owner = user)
            serializer = CompanySerializer(instance=cmp)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'errors':'company is not exists'},status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def StaffList(request):
    if Accounts.objects.filter(username = request.user):
        user = Accounts.objects.get(username = request.user)
        company = Company.objects.get(owner=user.id)
        items = Accounts.objects.filter(is_staff = True, is_admin=False, is_approved=True, company_id = company.id)
        serializer = AccountsSerializer(instance=items, many=True)
        if serializer:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['DELETE'])
def DeleteUser(request, id):
    if  Accounts.object.filter(id=id):
        item = Accounts.objects.get(id=id)
        item.delete()
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def BlockUser(request, id):
    if  Accounts.object.filter(id=id):
        item = Accounts.objects.get(id=id)
        if item.is_active == True:
            item.is_active = False
        else:
            item.is_active = True
        item.save()
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

class PurchasePlanView(APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    def get(self, request):
        user = request.user
        if PurchasePlan.objects.filter(owner=user, is_expired=False).exists():
            item = PurchasePlan.objects.get(owner=user, is_expired=False)
            if item.get_plan_status() == False:
                item.is_expired = True
                item.save()
                return Response({'errors':'plan is expired'}, status=status.HTTP_400_BAD_REQUEST)
            serializer = PlanPurchaseSerializer(instance=item)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'errors':'plan is not exists'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        if PurchasePlan.objects.filter(owner__username = request.user, is_expired=False):
            return Response({'errors':'plan is already exists'}, status=status.HTTP_400_BAD_REQUEST)
        data = request.data
        plan = PlanPurchaseSerializer(data = data, context={'request': request})
        if plan.is_valid():
            plan.save()
            return Response(plan.data, status=status.HTTP_201_CREATED)
        else:
            return Response(plan.errors, status=status.HTTP_400_BAD_REQUEST)

class JobPostView(APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    def get(self, request):
        user = Accounts.objects.get(username = request.user)
        if JobPost.objects.filter(job_company=user.company_id, is_approved=True, is_deleted=False):
            jobs = JobPost.objects.filter(job_company=user.company_id, is_approved=True, is_deleted=False)
            serializer = JobPostSerializer(instance=jobs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            error = {
                'error':'Job are not posted'
            }
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def GetPostedStaff(request, id):
    item = Accounts.objects.values_list('username','company_id','email','phone').get(id=id)
    data = {
        'username':item[0],
        'company_id':item[1],
        'email':item[2],
        'phone':item[3]
    }
    return Response(data, status=status.HTTP_200_OK)