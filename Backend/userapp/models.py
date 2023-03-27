from django.db import models
from accounts.models import Accounts
from staff.models import JobPost

# Create your models here.

class Education(models.Model):
    username     = models.ForeignKey(Accounts, on_delete=models.CASCADE, null=True, blank=True)
    course       = models.CharField(max_length=255, null=True, blank=True)
    university   = models.CharField(max_length=255, null=True, blank=True)
    passout      = models.IntegerField(default=2021)

    def __str__(self):

        return (str(self.username) + '  ' + str(self.course))

class Experience(models.Model):
    username     = models.ForeignKey(Accounts, on_delete=models.CASCADE, null=True, blank=True)
    companyname  = models.CharField(max_length=255, null=True, blank=True)
    is_working   = models.BooleanField(default=False)
    designation  = models.CharField(max_length=255, null=True, blank=True)
    curr_salary  = models.IntegerField(null=True, blank=True)
    date_of_join = models.DateField(null=True, blank=True)
    resign_date  = models.DateField(null=True, blank=True)
    exp_year   = models.IntegerField(default=0, null=True, blank=True)

    def __str__(self):
        return (str(self.username) + '  ' + str(self.companyname))

class Skills(models.Model):
    username   = models.ForeignKey(Accounts, on_delete=models.CASCADE, null=True, blank=True)
    skill      = models.CharField(max_length=255, null=True, blank=True)
    exp_year   = models.IntegerField(default=0)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return (str(self.username) + '  ' + str(self.skill))

class Bio(models.Model):
    username   = models.ForeignKey(Accounts, on_delete=models.CASCADE, null=True, blank=True)
    biography  = models.TextField(null=True, blank=True)
    linkedin   = models.CharField(max_length=255, null=True, blank=True)
    github     = models.CharField(max_length=255, null=True, blank=True)
    resume     = models.FileField(upload_to='resumes', blank=True)

    def __str__(self):
        return str(self.username)

status_choice = (
    ('pending','pending'),
    ('selected','selected'),
    ('rejected','rejected'),
)

class ApplyJob(models.Model):
    app_job       = models.ForeignKey(JobPost, on_delete=models.CASCADE, blank=True, null=True)
    app_user      = models.ForeignKey(Accounts, on_delete=models.CASCADE, blank=True, null=True)
    cover_letter  = models.TextField(blank=True, null=True)
    app_status    = models.CharField(max_length=50, choices=status_choice, default= 'pending')
    is_deleted    = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.app_job.job_title + ' (' + self.app_user.username +')'