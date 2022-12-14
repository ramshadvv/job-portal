from django.db import models
from accounts.models import Accounts

# Create your models here.

class Education(models.Model):
    username     = models.ForeignKey(Accounts, on_delete=models.CASCADE, null=True, blank=True)
    course       = models.CharField(max_length=255, null=True, blank=True)
    university   = models.CharField(max_length=255, null=True, blank=True)
    passout      = models.DateField(auto_now_add=True)

class Experience(models.Model):
    username     = models.ForeignKey(Accounts, on_delete=models.CASCADE, null=True, blank=True)
    companyname  = models.CharField(max_length=255, null=True, blank=True)
    is_working   = models.BooleanField(default=False)
    designation  = models.CharField(max_length=255, null=True, blank=True)
    curr_salary  = models.IntegerField(null=True, blank=True)
    date_of_join = models.DateField(null=True, blank=True)
    resign_date  = models.DateField(null=True, blank=True)

class Skills(models.Model):
    username   = models.ForeignKey(Accounts, on_delete=models.CASCADE, null=True, blank=True)
    skill      = models.CharField(max_length=255, null=True, blank=True)
    exp_year   = models.IntegerField(default=0)
    created_at = models.DateField(auto_now_add=True)