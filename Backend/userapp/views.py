from django.shortcuts import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status, permissions, generics
# from rest_framework.parsers import MultiPartParser, FormParser
# from rest_framework.decorators import api_view
from .serializers import EducationSerializer, ExperienceSerializer, SkillsSerializer, BioSerializer
from .models import Education, Experience, Skills, Bio, ApplyJob
from accounts.models import *
from staff.serializers import *
import datetime
from django.db.models import Q
import operator
from functools import reduce
import json
from userapp.userserializer.ApplyPostSerializer import ApplyJobSerializer


# Create your views here.

def home(self):
    k = datetime.datetime.now().date() + datetime.timedelta(days=36) > datetime.datetime.now().date()

    print(k)
    return HttpResponse('<h1>Hello World</h1>')

class EducationView(APIView):
    permission_classes = [permissions.IsAuthenticated,]
    def get(self, request):
        user  = request.user
        if Education.objects.filter(username = user).exists():
            items = Education.objects.filter(username = user)
            serializer = EducationSerializer(instance = items, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        education = EducationSerializer(data = request.data, context={'request': request})
        if education.is_valid():
            education.save()
            return Response(education.data,status=status.HTTP_201_CREATED)
        else:
            print(education.errors)
            return Response(education.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        education = Education.objects.get(id=id)
        data      = request.data
        education.course = data['course']
        education.university = data['university']
        education.passout = data['passout']
        education.save()
        serializer = EducationSerializer(instance=education)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def delete(self, request, id):
        education = Education.objects.get(id=id)
        education.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

@api_view(['GET'])
def getEducation(request, id):
    education = Education.objects.get(id = id)
    serializer = EducationSerializer(instance=education)
    return Response(serializer.data, status=status.HTTP_200_OK)



class ExperienceView(APIView):
    permission_classes = [permissions.IsAuthenticated,]

    def get(self, request):
        user  = request.user
        if Experience.objects.filter(username = user).exists():
            items = Experience.objects.filter(username = user)
            serializer = ExperienceSerializer(instance = items, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        if request.data['status'] == 'True':
            print('--------------------')
            experience = ExperienceSerializer(data = request.data, context={'request': request})
            if experience.is_valid():
                experience.save()
                return Response(experience.data,status=status.HTTP_201_CREATED)
            else:
                print(experience.errors)
                return Response(experience.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error':'User have no experience'}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        experience = Experience.objects.get(id=id)
        data      = request.data
        experience.companyname = data['companyname']
        experience.is_working = data['is_working']
        experience.designation = data['designation']
        experience.curr_salary = data['curr_salary']
        experience.date_of_join = data['date_of_join']
        experience.resign_date = data['resign_date']
        experience.exp_year = data['exp_year']
        experience.save()
        serializer = ExperienceSerializer(instance=experience)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def delete(self, request, id):
        experience = Experience.objects.get(id=id)
        experience.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

@api_view(['GET'])
def getExperience(request, id):
    experience = Experience.objects.get(id = id)
    serializer = ExperienceSerializer(instance=experience)
    return Response(serializer.data, status=status.HTTP_200_OK)

class SkillView(APIView):
    permission_classes = [permissions.IsAuthenticated,]

    def get(self, request):
        user  = request.user
        if Skills.objects.filter(username = user).exists():
            items = Skills.objects.filter(username = user)
            serializer = SkillsSerializer(instance = items, many = True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        skill = SkillsSerializer(data = request.data, context={'request': request})
        if skill.is_valid():
            skill.save()
            return Response(skill.data,status=status.HTTP_201_CREATED)
        else:
            print(skill.errors)
            return Response(skill.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        skill = Skills.objects.get(id=id)
        data      = request.data
        skill.skill = data['skill']
        skill.exp_year = data['exp_year']
        skill.save()
        serializer = SkillsSerializer(instance=skill)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def delete(self, request, id):
        skill = Skills.objects.get(id=id)
        skill.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

@api_view(['GET'])
def getSkills(request, id):
    skill = Skills.objects.get(id = id)
    serializer = SkillsSerializer(instance=skill)
    return Response(serializer.data, status=status.HTTP_200_OK)

class BioView(APIView):
    permission_classes = [permissions.IsAuthenticated,]

    def get(self, request):
        user  = request.user
        if Bio.objects.filter(username = user).exists():
            items = Bio.objects.filter(username = user)
            items = items[0]
            serializer = BioSerializer(instance = items)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        if Bio.objects.filter(username = request.user).exists():
            return Response({'error':'Resume already exists'},status=status.HTTP_400_BAD_REQUEST)
        bio = BioSerializer(data = request.data, context={'request': request})
        if bio.is_valid():
            bio.save()
            return Response(bio.data,status=status.HTTP_201_CREATED)
        else:
            print(bio.errors)
            return Response(bio.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        bio       = Bio.objects.get(id=id)
        data      = request.data
        bio.biography = data['biography']
        if 'resume' in data:
            bio.resume = data['resume']
        bio.linkedin = data['linkedin']
        bio.github = data['github']
        bio.save()
        serializer = BioSerializer(instance=bio)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def delete(self, request, id):
        bio = Bio.objects.get(id=id)
        bio.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

class JobPostsView(APIView):
    permission_classes = [permissions.IsAuthenticated, ]

    def get(self, request):
        data = request.query_params
        skills = Skills.objects.values_list('skill').filter(username__username=request.user)
        skill_list = []
        for i in skills:
            skill_list.append(i[0])
        if skill_list:
            q_title  = reduce(operator.or_, (Q(job_title__icontains=x) for x in skill_list))
            q_requir = reduce(operator.or_, (Q(job_requir__icontains=x) for x in skill_list))
            q_descri = reduce(operator.or_, (Q(job_descri__icontains=x) for x in skill_list))
            q_respon = reduce(operator.or_, (Q(job_respon__icontains=x) for x in skill_list))
            multiple_sh = Q(q_descri | q_respon | q_title | q_requir)
        else:
            multiple_sh = Q(job_respon__icontains='')
        if 'search' in data:
            q_title  = Q(job_title__icontains  = data['search'])
            q_requir = Q(job_requir__icontains = data['search'])
            q_descri = Q(job_descri__icontains = data['search'])
            q_respon = Q(job_respon__icontains = data['search'])

            search_sh = Q(q_descri | q_respon | q_title | q_requir)
        else:
            search_sh = Q(job_respon__icontains = '')
        
        sh = Q(multiple_sh & search_sh)
        if JobPost.objects.filter(sh, is_approved=True, is_deleted=False).exists():
            jobs = JobPost.objects.filter(sh, is_approved=True, is_deleted=False).order_by('id')
            serializer = JobFetchSerializer(instance=jobs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            # jobs = JobPost.objects.all().order_by('id')
            # serializer = JobPostSerializer(instance=jobs, many=True)
            return Response({'error':'no data available'}, status=status.HTTP_400_BAD_REQUEST)
        
class ApplyJobView(generics.CreateAPIView, generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = ApplyJobSerializer
    queryset = ApplyJob.objects.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
    
    def post(self, request):
        data = request.data
        if ApplyJob.objects.filter(app_user=request.user, app_job=data['app_job']):
            return Response({'error':'Job is already applied'}, status=status.HTTP_400_BAD_REQUEST)
        serializer_class = self.serializer_class(data = request.data, context={'request': request})
        if serializer_class.is_valid():
            serializer_class.save()
            return Response(serializer_class.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer_class.errors, status=status.HTTP_400_BAD_REQUEST)
   