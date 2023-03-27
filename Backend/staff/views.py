from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status, permissions
from owner.serializers import *
from userapp.serializers import *
from api.serializers import *
from .serializers import *

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

class JobPostView(APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    def get(self, request):
        user = Accounts.objects.get(username = request.user)
        if JobPost.objects.filter(job_staff=user.id, is_approved=True, is_deleted=False):
            jobs = JobPost.objects.filter(job_staff=user.id, is_approved=True, is_deleted=False)
            serializer = JobPostSerializer(instance=jobs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            error = {
                'error':'Job are not posted'
            }
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        data = request.data
        job = JobPostSerializer(data = data, context={'request': request})
        if job.is_valid():
            job.save()
            return Response(job.data, status=status.HTTP_201_CREATED)
        else:
            return Response(job.errors, status=status.HTTP_400_BAD_REQUEST)

class JobActionView(APIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request, id):
        job = JobPost.objects.get(id=id)
        if job.is_active == True:
            job.is_active = False
            context = {
                "success":"Item is blocked"
            }
        else:
            job.is_active = True
            context = {
                "success":"Item is unblocked"
            }
        job.save()
        return Response(context, status=status.HTTP_200_OK)

    def delete(self, request, id):
        job = JobPost.objects.get(id=id)
        job.is_deleted = True
        job.save()
        context = {
            "success":"Item is blocked"
        }
        return Response(context, status=status.HTTP_200_OK)

@api_view(['GET'])
def UnverifiedJobs(request):
    user = Accounts.objects.get(username = request.user)
    if JobPost.objects.filter(job_staff=user.id, is_deleted=False):
        jobs = JobPost.objects.filter(job_staff=user.id, is_approved=False, is_deleted=False)
        serializer = JobPostSerializer(instance=jobs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'error':'Unverified Jobs is not available'}, status=status.HTTP_400_BAD_REQUEST)






