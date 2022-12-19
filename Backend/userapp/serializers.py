from .models import *
from rest_framework import serializers

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Education
        fields = '__all__'

    def save(self):
        user = None
        request = self.context.get("request")
        if request and getattr(request, "user"):
            user = request.user
        register = Education(
            username    = user,
            course      = self.validated_data['course'],
            university  = self.validated_data['university'],
            passout     = self.validated_data['passout']
        )
        register.save()
        return register

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Experience
        fields = '__all__'

    def save(self):
        user = None
        request = self.context.get("request")
        if request and getattr(request, "user"):
            user = request.user
        register = Experience(
            username      = user,
            companyname   = self.validated_data['companyname'],
            is_working    = self.validated_data['is_working'],
            designation   = self.validated_data['designation'],
            curr_salary   = self.validated_data['curr_salary'],
            date_of_join  = self.validated_data['date_of_join'],
            resign_date   = self.validated_data['resign_date'],
            exp_year      = self.validated_data['exp_year']
        )
        register.save()
        return register

class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Skills
        fields = '__all__'

    def save(self):
        user = None
        request = self.context.get("request")
        if request and getattr(request, "user"):
            user = request.user
        register = Skills(
            username    = user,
            skill       = self.validated_data['skill'],
            exp_year    = self.validated_data['exp_year']
        )
        register.save()
        return register

class BioSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Bio
        fields = '__all__'

    def save(self):
        user = None
        request = self.context.get("request")
        if request and getattr(request, "user"):
            user = request.user
        register = Bio(
            username    = user,
            biography   = self.validated_data['biography'],
            linkedin    = self.validated_data['linkedin'],
            github      = self.validated_data['github'],
            resume      = self.validated_data['resume']
        )
        register.save()
        return register