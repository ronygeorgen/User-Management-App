from django.urls import path
from .views import SignupView, LoginView, AdminTokenObtainView, AdminDashboardView, UserProfileView, toggle_user_status
urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('admin/token/', AdminTokenObtainView.as_view(), name='admin_token'),
    path('admin/dashboard/', AdminDashboardView.as_view(), name='admin_dashboard'),
    path('user-profile/', UserProfileView.as_view(), name='user_profile'),
    # path('admin/users/', UserListView.as_view(), name='user_list'),
    path('admin/users/<int:user_id>/toggle-status/', toggle_user_status, name='toggle_user_status'),
]