"""
URL configuration for smartindiahackathon project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from django.urls import path
from . import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('about-us/', views.aboutUs),
    path('', views.login),
    path('home/', views.home),
    path('login/', views.login),
    path('add-projects/', views.addprojects),
    path('project/', views.project),
    path('account/', views.account),

    path('save_form_data/', views.save_form_data,
         name='save_form_data'),    # Other URL patterns

    path('save_account_data/', views.save_account_data,
         name='save_account_data'),    # Other URL patterns

]
