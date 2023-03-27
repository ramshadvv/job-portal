from django.db import models
from accounts.models import Accounts
import datetime
from adminapp.models import SubscriptionPlan
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

    def __str__(self) -> str:
        return f'{self.owner.username} ({str(self.id)})'

class PurchasePlan(models.Model):
    owner           = models.ForeignKey(Accounts, on_delete=models.CASCADE, null=True, blank=True)
    plan            = models.ForeignKey(SubscriptionPlan, on_delete=models.CASCADE, null=True, blank=True)
    transact_id     = models.CharField(max_length=100, null=True, blank=True)
    purchased_date  = models.DateField(auto_now_add=True)
    expiry_date     = models.DateField(default=datetime.datetime.now().date() + datetime.timedelta(days=30))
    is_expired      = models.BooleanField(default=False, null=True, blank=True)

    def get_plan_status(self):
        if self.expiry_date > datetime.datetime.now().date():
            return True
        else:
            return False

    def __str__(self) -> str:
        return f'{self.owner.username} ({str(self.id)})'
