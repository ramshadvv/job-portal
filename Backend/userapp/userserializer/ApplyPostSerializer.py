from userapp.models import ApplyJob
from rest_framework import serializers, status
from rest_framework.response import Response


class ApplyJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApplyJob
        fields = '__all__'

    def save(self):
        user = None
        request = self.context.get("request")
        if request and getattr(request, "user"):
            user = request.user
        print(user)
        register = ApplyJob(
            app_user = user,
            app_job = self.validated_data['app_job'],
            cover_letter = self.validated_data['cover_letter']
        )
        register.save() 
        return register