from django.db import models
from owner.models import *
from accounts.models import Accounts
import datetime
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings

# Create your models here.

class JobPost(models.Model):
    job_title       = models.CharField(max_length=255, blank=True, null=True)
    job_salary      = models.IntegerField(blank=True, null=True)
    job_salaryto    = models.IntegerField(blank=True, null=True)
    job_type        = models.CharField(max_length=255, blank=True, null=True)
    job_qualif      = models.TextField(blank=True, null=True)
    job_descri      = models.TextField(blank=True, null=True)
    job_respon      = models.TextField(blank=True, null=True)
    job_requir      = models.TextField(blank=True, null=True)
    job_sechedule   = models.TextField(blank=True, null=True)
    job_relocate    = models.TextField(blank=True, null=True)
    job_education   = models.TextField(blank=True, null=True)
    job_experience  = models.TextField(blank=True, null=True)
    job_company     = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
    job_staff       = models.ForeignKey(Accounts, on_delete=models.CASCADE, blank=True, null=True)
    job_posted      = models.DateField(auto_now_add=True)
    job_expired     = models.DateField(default=datetime.datetime.now().date() + datetime.timedelta(days=15))
    is_active       = models.BooleanField(default=True)
    is_approved     = models.BooleanField(default=False)
    is_deleted      = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'{self.job_title} - {self.job_company.id} ({self.job_staff.username})'

@receiver(post_save, sender=JobPost)
def jobpost_handler(sender, instance, **kwargs):
    job_title = instance.job_title
    subject = f'Posting Job {job_title}'
    message = f'There is a Job POSTED by staff {instance.job_staff.username} ({instance.job_staff.id}) of company {instance.job_company.cmp_name} ({instance.job_company.id})'
    recipient = 'ramshadchamravattom@gmail.com'
    send_mail(subject, 
      message, settings.EMAIL_HOST_USER, [recipient], fail_silently=False)
    # data = {'name':'Arjun', 'age':12}
    # JobPost.objects.create(job_title=json.dump(data))
    
# post_save.connect(jobpost_handler, sender=JobPost)
