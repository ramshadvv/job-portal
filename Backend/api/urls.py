from django.urls import path
from userapp import views
from . import views as apiviews
from accounts import views as accviews
from userapp import views as userview
from owner import views as ownerview
from staff import views as staffview
from adminapp import views as adminview
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    path('', views.home, name='userhome'),
    path('api/', apiviews.getRoutes, name="api"),
    path('api/token/', apiviews.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/<str:value>/', apiviews.MyTokenObtainPairView.as_view(), name='token_obtain_pair_roles'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('register/', accviews.Register.as_view(), name="register"),
    path('edituser/<int:id>/', accviews.Register.as_view(), name="edit"),
    path('profile/', accviews.getUser.as_view(), name="profile"),
    path('editprofile/', accviews.getUser.as_view(), name="profile"),
    path('addpic/', accviews.AddPic.as_view(), name="addpic"),

    # admin

    path('employees/', adminview.EmployeeView, name="employees"),
    path('blockcompany/<str:id>/', adminview.BlockCompanyView, name="blockcompany"),
    path('ownerspending/', adminview.PendingOwners.as_view(), name="ownerspending"),
    path('approve/<str:id>/', adminview.Approve.as_view(), name="approve"),
    path('staffspending/', adminview.PendingStaffs.as_view(), name="staffspending"),
    path('subscriptionplan/', adminview.SubPlanView.as_view(), name="subscriptionplan"),
    path('getownerplanstatus/<int:id>/', adminview.getUserPlanStatusView.as_view(), name="getownerplanstatus"),
    path('pendingjobs/', adminview.JobApprovedView.as_view(), name="pendingjobs"),
    path('approvejob/<int:id>/', adminview.ApproveJob, name="approvejob"),

    # user

    path('alljobposts/', userview.JobPostsView.as_view(), name="alljobposts"),
    path('applyjobs/', userview.ApplyJobView.as_view(), name="applyjobs"),

    path('education/', userview.EducationView.as_view(), name="education"),
    path('education/<int:id>/', userview.getEducation, name="geteducation"),
    path('addeducation/', userview.EducationView.as_view(), name="addeducation"),
    path('editeducation/<int:id>/', userview.EducationView.as_view(), name="editeducation"),
    path('deleteeducation/<int:id>/', userview.EducationView.as_view(), name="deleteeducation"),

    path('experience/', userview.ExperienceView.as_view(), name="experience"),
    path('experience/<int:id>/', userview.getExperience, name="getexperience"),
    path('addexperience/', userview.ExperienceView.as_view(), name="addexperience"),
    path('editexperience/<int:id>/', userview.ExperienceView.as_view(), name="editexperience"),
    path('deleteexperience/<int:id>/', userview.ExperienceView.as_view(), name="deleteexperience"),

    path('skill/', userview.SkillView.as_view(), name="skill"),
    path('skill/<int:id>/', userview.getSkills, name="getskill"),
    path('addskill/', userview.SkillView.as_view(), name="addskill"),
    path('editskill/<int:id>/', userview.SkillView.as_view(), name="editskill"),
    path('deleteskill/<int:id>/', userview.SkillView.as_view(), name="deleteskill"),

    path('bio/', userview.BioView.as_view(), name="bio"),
    path('addbio/', userview.BioView.as_view(), name="addbio"),
    path('editbio/<int:id>/', userview.BioView.as_view(), name="editbio"),
    path('deletebio/<int:id>/', userview.BioView.as_view(), name="deletebio"),
    
    path('deleteuser/<int:id>/', ownerview.DeleteUser, name="deleteuser"),
    path('blockuser/<int:id>/', ownerview.BlockUser, name="blockuser"),

    # owner
    
    path('companies/', ownerview.CompanyView.as_view(), name="companies"),
    path('companydetails/', ownerview.companyDetails, name="companydetails"),
    path('addcompany/', ownerview.CompanyView.as_view(), name="addcompany"),
    path('editcompany/<str:id>/', ownerview.CompanyView.as_view(), name="editcompany"),
    path('deletecompany/<str:id>/', ownerview.CompanyView.as_view(), name="deletecompany"),
    path('stafflist/', ownerview.StaffList, name="stafflist"),
    path('purchaseplan/', ownerview.PurchasePlanView.as_view(), name="purchaseplan"),
    path('ownerjobposts/', ownerview.JobPostView.as_view(), name="ownerjobposts"),
    path('getpostedstaff/<int:id>/', ownerview.GetPostedStaff, name="getpostedstaff"),

    # staff

    path('userlist/', staffview.UsersListView, name="userlist"),
    path('checkcompany/', staffview.CheckCompany, name="checkcompany"),
    path('jobposts/', staffview.JobPostView.as_view(), name="jobpost"),
    path('deletejob/<int:id>/', staffview.JobActionView.as_view(), name="deletejob"),
    path('blockjob/<int:id>/', staffview.JobActionView.as_view(), name="blockjob"),
    path('unverifiedjobs/', staffview.UnverifiedJobs, name="unverifiedjobs"),
    
    
    path('test/', adminview.Test, name="test"),
]
