from django.db import models
from accounts.models import Accounts

# Create your models here.

class Company(models.Model):
    id           = models.CharField(max_length=100, primary_key=True, default=None)
    owner        = models.OneToOneField(Accounts, on_delete=models.CASCADE, null=True, blank=True)
    cmp_name     = models.CharField(max_length=255, null=True, blank=True)
    cmp_place    = models.CharField(max_length=255, null=True, blank=True)
    cmp_phone    = models.CharField(max_length=255, null=True, blank=True)
    cmp_address  = models.CharField(max_length=255, null=True, blank=True)
    created_at   = models.DateField(auto_now_add=True)
    is_active    = models.BooleanField(default=True)


