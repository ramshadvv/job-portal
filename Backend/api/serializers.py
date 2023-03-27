from accounts.models import Accounts
from rest_framework import serializers, status
from rest_framework.response import Response
from owner.models import Company


class AccountsSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input':'password'},write_only = True)
    status = serializers.CharField(style={'input':'text'},write_only = True)
    class Meta:
        model = Accounts
        fields = ['id','first_name','last_name','email','username','phone','password','password2','is_active','status','image','company_id', 'is_approved']

        extra_kwargs = {'password':{'write_only':True}}

    def save(self):
        register = Accounts(
            username    = self.validated_data['username'],
            email       = self.validated_data['email'],
            phone       = self.validated_data['phone'],
            first_name  = self.validated_data['first_name'],
            last_name   = self.validated_data['last_name'],
        )
        
        statususer = self.validated_data['status']

        if 'image' in self.validated_data:
            register.image = self.validated_data['image']
            
        if statususer == 'staff':
            if Company.objects.filter(id=self.validated_data['company_id']):
                register.company_id = self.validated_data['company_id']
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            register.is_staff    = True
            register.is_user     = False
            register.is_active   = False
            register.is_approved = False
        elif statususer == 'owner':
            register.is_owner    = True
            register.is_user     = False
            register.is_approved = False
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password':'Password does not match'})
        
        register.set_password(password)
        register.save()
        return register