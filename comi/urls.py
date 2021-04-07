"""comi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
import comiapp.views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', comiapp.views.home, name='home'),
    path('room', comiapp.views.room, name='room'),
    path('editor', comiapp.views.editor, name='editor'),
    path('signup', comiapp.views.signup, name='signup'),
    path('createroom', comiapp.views.createroom, name='createroom'),
    path('login', comiapp.views.login, name='login'),
    path('logout', comiapp.views.logout, name='logout')
]
