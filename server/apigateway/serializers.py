from rest_framework import serializers
from .models import User, Educator, Classroom, Assignment, UserAssignmentResults, UserOnlyResults

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['UID', 'username']

class EducatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Educator
        fields = ['EID', 'EducatorName', 'InstituteName']

class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = ['CID', 'EID', 'ClassroomName']

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ['AID', 'CID', 'Deadline']

class UserAssignmentResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAssignmentResults
        fields = '__all__' 

class UserOnlyResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserOnlyResults
        fields = '__all__'  