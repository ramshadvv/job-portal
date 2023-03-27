from django.db import models

# Create your models here.


class SubscriptionPlan(models.Model):
    sub_name     = models.CharField(max_length=50, unique=True)
    sub_desc     = models.TextField()
    sub_price    = models.IntegerField()
    no_staff     = models.IntegerField(null=True, blank=True)
    no_job       = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.sub_name
