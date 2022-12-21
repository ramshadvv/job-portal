from django.urls import path
from userapp import views
from . import views as apiviews
from accounts import views as accviews
from userapp import views as userview
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    path('', views.home, name='userhome'),
    path('api/', apiviews.getRoutes, name="home"),
    path('api/token/', apiviews.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('register/', accviews.Register.as_view(), name="register"),
    path('edituser/<int:id>/', accviews.Register.as_view(), name="edit"),
    path('profile/', accviews.getUser.as_view(), name="profile"),
    path('editprofile/', accviews.getUser.as_view(), name="profile"),

    # user

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

    # owner
]
