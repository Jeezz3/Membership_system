"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.views import me 
from api.views import member_item, create_member, delete_member, get_membership, edit_membership
from api.views import get_schedule, create_schedule

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/me/', me, name='me'),
    path('api/member_item/', member_item, name='member_item'),
    path('api/create_member/', create_member, name='create_member'),
    path('api/get_membership/<int:pk>/', get_membership, name='get_membership'),
    path('api/edit_membership/<int:pk>/', edit_membership, name='edit_membership'),
    path('api/get_schedule/', get_schedule, name='get_schedule'),
    path('api/create_schedule/',create_schedule, name='create_schedule')
]
