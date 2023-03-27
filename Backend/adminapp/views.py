from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status, permissions
from .serializers import *
from owner.serializers import *
from userapp.serializers import *
from staff.serializers import *
from api.serializers import *
from django.views import View

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

class PendingOwners(APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    def get(self, request):
        items = Accounts.objects.filter(is_approved = False, is_admin=False, is_owner=True)
        serializer = AccountsSerializer(instance=items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PendingStaffs(APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    def get(self, request):
        user = request.user
        cmp  = Company.objects.get(owner=user)
        items = Accounts.objects.filter(is_approved = False, is_admin=False, is_staff=True, company_id=cmp.id)
        serializer = AccountsSerializer(instance=items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class Approve(APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    def get(self, request, id):
        if Accounts.objects.filter(id = id).exists():
            item = Accounts.objects.get(id=id)
            item.is_approved = True
            item.is_active   = True
            item.save()
            return Response(status=status.HTTP_200_OK)

class SubPlanView(APIView):
    def get(self, request):
        plan = SubscriptionPlan.objects.all()
        serializer = SubscriptionSerializer(instance=plan, many=True)
        if serializer:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            error = {
                'error' : 'Plans are not exists'
            }
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        plan = SubscriptionSerializer(data = request.data)
        if plan.is_valid():
            plan.save()
            return Response(plan.data, status=status.HTTP_201_CREATED)
        else:
            return Response(plan.errors, status=status.HTTP_400_BAD_REQUEST)

class getUserPlanStatusView(APIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request, id):
        if PurchasePlan.objects.filter(owner=id) and Company.objects.filter(owner=id):
            plan = PurchasePlan.objects.get(owner=id)
            plan = plan.plan.sub_name
            cmp  = Company.objects.values('id','cmp_name').get(owner=id)

            context = {
                'plan' : plan,
                'company':cmp
            }
            return Response(context, status=status.HTTP_200_OK)
        else:
            error = {
                'error':'Not Registered'
            }
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

class JobApprovedView(APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    def get(self, request):
        user = Accounts.objects.get(username=request.user)
        if user.username != 'admin':
            error = {
                'error':'Admin can only Access'
            }
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        if JobPost.objects.filter(is_approved=False, is_deleted=False):
            jobs = JobPost.objects.filter(is_approved=False, is_deleted=False)
            serializer = JobPostSerializer(instance=jobs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            error = {
                'error':'No pending jobs are available'
            }
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def ApproveJob(request, id):
    jobs = JobPost.objects.get(id=id)
    jobs.is_approved = True
    jobs.save()
    return Response({'success':'Job is approved'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def Test(request):
    jobs = JobPost.objects.all().values('job_title', 'job_salary')
    for i in jobs:
        print((i))
    return Response(status=status.HTTP_200_OK)

