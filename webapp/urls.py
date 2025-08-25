from django.urls import path
from django.contrib import admin  # ✅ Needed for admin.site.urls
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('admin/', admin.site.urls),  # ✅ Avoid this if already defined in project-level urls.py
    path('welcomepage/', views.welcomepage, name='welcomepage'),
    path('index/', views.index, name='index'),
    path('index3/', views.index3, name='index3'),  # Login page
    path('index4/', views.index4, name='index4'),  # Signup page
    path('chatbot/', views.chatbot, name='chatbot'),
    path('logout/', views.logout_view, name='logout'),  

 
    path('', views.index, name='index'),
    path('submit-business-request/', views.submit_business_request, name='submit_business_request'),


    # API endpoints for signup and login
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
]
