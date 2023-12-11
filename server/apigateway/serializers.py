from rest_framework import serializers
from .models import User, Educator, Classroom, Assignment

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
        fields = ['AID', 'CID', 'Timestamp']
