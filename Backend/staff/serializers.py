from .models import *
from rest_framework import serializers

class JobPostSerializer(serializers.ModelSerializer):
    class Meta:
        model  = JobPost
        fields = '__all__'
    
    def save(self):
        user    = None
        request = self.context.get("request")
        if request and getattr(request, "user"):
            user = request.user
            user = Accounts.objects.get(username = user)
            cmp  = Company.objects.get(id=user.company_id)
            
        register = JobPost(
            job_staff      = user,
            job_company    = cmp,
            job_title      = self.validated_data['job_title'],
            job_salary     = self.validated_data['job_salary'],
            job_type       = self.validated_data['job_type'],
            job_qualif     = self.validated_data['job_qualif'],
            job_education  = self.validated_data['job_education'],
            job_experience = self.validated_data['job_experience']
        )

        if 'job_salaryto' in self.validated_data:
            register.job_salaryto  = self.validated_data['job_salaryto']

        if 'job_descri' in self.validated_data:
            register.job_descri    = self.validated_data['job_descri']

        if 'job_respon' in self.validated_data:
            register.job_respon    = self.validated_data['job_respon']

        if 'job_requir' in self.validated_data:
            register.job_requir    = self.validated_data['job_requir']

        if 'job_sechedule' in self.validated_data:
            register.job_sechedule = self.validated_data['job_sechedule']

        if 'job_relocate' in self.validated_data:
            register.job_relocate  = self.validated_data['job_relocate']

        register.save()
        return register


class JobFetchSerializer(serializers.ModelSerializer):
    company_name  = serializers.ReadOnlyField(source='job_company.cmp_name', read_only=True)
    company_place = serializers.ReadOnlyField(source='job_company.cmp_place', read_only=True)
    class Meta:
        model  = JobPost
        fields = '__all__'
        # fields = ('job_title','company_name','company_place', 'job_salary', 'job_salaryto', 'job_sechedule','job_descri')