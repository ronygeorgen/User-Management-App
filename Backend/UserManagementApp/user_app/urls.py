from django.urls import path
from .views import SignupView, LoginView, AdminTokenObtainView, AdminDashboardView, UserProfileView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('admin/token/', AdminTokenObtainView.as_view(), name='admin_token'),
    path('admin/dashboard/', AdminDashboardView.as_view(), name='admin_dashboard'),
    path('user-profile/', UserProfileView.as_view(), name='user_profile'),
]