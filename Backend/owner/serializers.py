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
        id = generate_unique_code() 
        if request and getattr(request, "user"):
            user = request.user
            item = Accounts.objects.get(username=user)
            item.company_id = id
            item.save()
        register = Company(
            id           = id,
            owner        = user,
            cmp_name     = self.validated_data['cmp_name'],
            cmp_place    = self.validated_data['cmp_place'],
            cmp_phone    = self.validated_data['cmp_phone'],
            cmp_address  = self.validated_data['cmp_address']
        )
        register.save()
        return register

class PlanPurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model  = PurchasePlan
        fields = '__all__'
    
    def save(self):
        user = None
        request = self.context.get("request")
        # plan = self.context.get("plan")
        # item = SubscriptionPlan.objects.get(sub_name = plan)
        if request and getattr(request, "user"):
            user = request.user
            
        register = PurchasePlan(
            owner        = user,
            plan         = self.validated_data['plan']
        )

        if 'transact_id' in self.validated_data:
            register.transact_id  = self.validated_data['transact_id']

        register.save()
        return register