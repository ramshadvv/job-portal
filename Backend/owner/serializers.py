from .models import *
from rest_framework import serializers
import random

def generate_unique_code():
    while True:
        code = 'CMP'+ str(random.randrange(1000000,9999999))
        if Company.objects.filter(id = code).count() == 0:
            break
    return code

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model  = Company
        fields = '__all__'
        
    def save(self):
        user = None
        request = self.context.get("request")
        if request and getattr(request, "user"):
            user = request.user
        register = Company(
            id           = generate_unique_code(),
            owner        = user,
            cmp_name     = self.validated_data['cmp_name'],
            cmp_place    = self.validated_data['cmp_place'],
            cmp_phone    = self.validated_data['cmp_phone'],
            cmp_address  = self.validated_data['cmp_address']
        )
        register.save()
        return register