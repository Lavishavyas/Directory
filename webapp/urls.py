from django.urls import path
from django.contrib import admin
from . import views

urlpatterns = [
    # Root URL → welcomepage.html
    path('', views.home, name='home'),

    # Admin panel
    path('admin/', admin.site.urls),

    # Template pages
    path('welcomepage/', views.welcomepage, name='welcomepage'),
    path('index/', views.index, name='index'),
    path('index3/', views.index3, name='index3'),  # Login page
    path('index4/', views.index4, name='index4'),  # Signup page
    path('chatbot/', views.chatbot, name='chatbot'),
    path('logout/', views.logout_view, name='logout'),  

    # Business request submission
    path('submit-business-request/', views.submit_business_request, name='submit_business_request'),

    # API endpoints for signup and login
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
]
