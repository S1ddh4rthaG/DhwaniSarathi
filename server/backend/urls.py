"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from apigateway.views import logininfo_list,logininfo_detail,user_list, user_detail, educator_list, educator_detail, educator_classrooms, classroom_list, classroom_detail, classroom_assignments, assignment_list, assignment_detail, assignment_userassignmentresults, assignment_validate,userassignmentresults_list, userassignmentresults_detail, useronlyresults_list, useronlyresults_detail,results_detail

urlpatterns = [
    path('admin/', admin.site.urls),
    path('logininfos/', logininfo_list),
    path('logininfos/<str:FID>/', logininfo_detail),
    path('users/', user_list),
    path('users/<str:UID>/', user_detail),
    path('educators/', educator_list),
    path('educators/<str:EID>/', educator_detail),
    path('educators/<str:EID>/classrooms/', educator_classrooms),
    path('classrooms/', classroom_list),
    path('classrooms/<str:CID>/', classroom_detail),
    path('classrooms/<str:CID>/assignments/', classroom_assignments),
    path('assignments/', assignment_list),
    path('assignments/<str:AID>/', assignment_detail),
    path('assignments/<str:AID>/userassignmentresults/', assignment_userassignmentresults),
    path('assignments/<str:AID>/validate/',assignment_validate),
    path('userassignmentresults/', userassignmentresults_list),
    path('userassignmentresults/<str:UID>/', userassignmentresults_detail),
    path('useronlyresults/', useronlyresults_list),
    path('useronlyresults/<str:UID>/', useronlyresults_detail),
    path('results/<str:UID>/', results_detail),
]