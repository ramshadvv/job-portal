from django.shortcuts import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions
# from rest_framework.parsers import MultiPartParser, FormParser
# from rest_framework.decorators import api_view
from .serializers import EducationSerializer, ExperienceSerializer, SkillsSerializer, BioSerializer
from .models import Education, Experience, Skills, Bio

# Create your views here.

def home(self):
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
        bio.resume = data['resume']
        bio.linkedin = data['linkedin']
        bio.github = data['github']
        bio.save()
        serializer = SkillsSerializer(instance=bio)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def delete(self, request, id):
        bio = Bio.objects.get(id=id)
        bio.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
