from .models import *
from rest_framework import serializers

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model  = SubscriptionPlan
        fields = '__all__'
        
    def save(self):
        register = SubscriptionPlan(
            sub_name     = self.validated_data['sub_name'],
            sub_price    = self.validated_data['sub_price'],
            sub_desc     = self.validated_data['sub_desc']
        )
        register.save()
        return register