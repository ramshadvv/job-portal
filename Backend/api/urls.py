from django.urls import path
from userapp import views
from . import views as apiviews
from accounts import views as accviews
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    path('', views.home, name='userhome'),
    path('api/', apiviews.getRoutes, name="home"),
    path('api/token/', apiviews.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', accviews.Register.as_view(), name="register"),
    path('edituser/<int:id>/', accviews.Register.as_view(), name="edit"),
    path('profile/<int:id>/', accviews.Register.as_view(), name="profile"),
]
