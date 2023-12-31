from rest_framework import serializers
from .models import  LoginInfo, User, Educator, Classroom, Assignment, UserAssignmentResults, UserOnlyResults

class LoginInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginInfo
        fields = ['FID', 'Type']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['UID', 'UserName','Age','Gender']

class EducatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Educator
        fields = ['EID', 'EducatorName', 'InstituteName']

class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = ['CID', 'EID', 'ClassroomName','Count']

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ['AID', 'CID','AssignmentName','Deadline']

class UserAssignmentResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAssignmentResults
        fields = '__all__' 

class UserOnlyResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserOnlyResults
        fields = '__all__'  