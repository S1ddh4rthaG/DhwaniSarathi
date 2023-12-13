from django.shortcuts import render, HttpResponse
from django.utils import timezone
from .models import  LoginInfo, User, Educator, Classroom, Assignment, UserAssignmentResults, UserOnlyResults
from .serializers import  LoginInfoSerializer, UserSerializer, EducatorSerializer, ClassroomSerializer, AssignmentSerializer , UserAssignmentResultsSerializer , UserOnlyResultsSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import datetime

# views for User
# url/users
@api_view(['GET', 'POST'])
def login_authentication(request,FID):
    """
    Authenticate a user.
    """
    try:
        logininfo = LoginInfo.objects.get(FID=FID)
    except LoginInfo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if(request.method == 'GET'):
        serializer = LoginInfoSerializer(logininfo)
        return Response(serializer.data)
        
    if(request.method == 'POST'):
        serializer = LoginInfoSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        
@api_view(['GET', 'POST'])
def user_list(request):
    """
    List all users, or create a new user.
    """
    if(request.method == 'GET'):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    elif(request.method == 'POST'):
        serializer = UserSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# url/users/UID
@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, UID):
    """
    Retrieve, update or delete a user.
    """
    try:
        user = User.objects.get(UID=UID)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if(request.method == 'GET'):
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    elif(request.method == 'PUT'):
        serializer = UserSerializer(user, data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif(request.method == 'DELETE'):
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# views for Educator  
# url/educators
@api_view(['GET', 'POST'])
def educator_list(request):
    """
    List all educators, or create a new educator.
    """
    if(request.method == 'GET'):
        educators = Educator.objects.all()
        serializer = EducatorSerializer(educators, many=True)
        return Response(serializer.data)
    
    elif(request.method == 'POST'):
        serializer = EducatorSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# url/educators/EID
@api_view(['GET', 'PUT', 'DELETE'])
def educator_detail(request, EID):
    """
    Retrieve, update or delete an educator.
    """
    try:
        educator = Educator.objects.get(EID=EID)
    except Educator.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if(request.method == 'GET'):
        serializer = EducatorSerializer(educator)
        return Response(serializer.data)
    
    elif(request.method == 'PUT'):
        serializer = EducatorSerializer(educator, data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif(request.method == 'DELETE'):
        educator.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
# url/educators/EID/classrooms
@api_view(['GET'])
def educator_classrooms(request, EID):
    """
    Retrieve all classrooms of an educator.
    """
    try:
        classrooms = Classroom.objects.filter(EID=EID)
    except Classroom.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if(request.method == 'GET'):
        serializer = ClassroomSerializer(classrooms, many=True)
        return Response(serializer.data)


# views for Classroom
# url/classrooms
@api_view(['GET', 'POST'])
def classroom_list(request):
    """
    List all classrooms, or create a new classroom.
    """
    if(request.method == 'GET'):
        classrooms = Classroom.objects.all()
        serializer = ClassroomSerializer(classrooms, many=True)
        return Response(serializer.data)
    
    elif(request.method == 'POST'):
        serializer = ClassroomSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
# url/classrooms/CID
@api_view(['GET', 'PUT', 'DELETE'])
def classroom_detail(request, CID):
    """
    Retrieve, update or delete a classroom.
    """
    try:
        classroom = Classroom.objects.get(CID=CID)
    except Classroom.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if(request.method == 'GET'):
        serializer = ClassroomSerializer(classroom)
        return Response(serializer.data)
    
    elif(request.method == 'PUT'):
        serializer = ClassroomSerializer(classroom, data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif(request.method == 'DELETE'):
        classroom.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
# url/classrooms/CID/assignments
@api_view(['GET'])
def classroom_assignments(request, CID):
    """
    Retrieve all assignments of a classroom.
    """
    try:
        assignments = Assignment.objects.filter(CID=CID)
    except Assignment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if(request.method == 'GET'):
        serializer = AssignmentSerializer(assignments, many=True)
        return Response(serializer.data)
    
# views for Assignment
# url/assignments
@api_view(['GET', 'POST'])
def assignment_list(request):
    """
    List all assignments, or create a new assignment.
    """
    if(request.method == 'GET'):
        assignments = Assignment.objects.all()
        serializer = AssignmentSerializer(assignments, many=True)
        return Response(serializer.data)
    
    elif(request.method == 'POST'):
        serializer = AssignmentSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# url/assignments/AID
@api_view(['GET', 'PUT', 'DELETE'])
def assignment_detail(request, AID):
    """
    Retrieve, update or delete an assignment.
    """
    try:
        assignment = Assignment.objects.get(AID=AID)
    except Assignment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if(request.method == 'GET'):
        serializer = AssignmentSerializer(assignment)
        return Response(serializer.data)
    
    elif(request.method == 'PUT'):
        serializer = AssignmentSerializer(assignment, data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif(request.method == 'DELETE'):
        assignment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# url/assignments/AID/userassignmentresults
@api_view(['GET'])
def assignment_userassignmentresults(request, AID):
    """
    Retrieve all userassignmentresults of an assignment.
    """
    try:
        userassignmentresults = UserAssignmentResults.objects.filter(AID=AID)
    except UserAssignmentResults.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if(request.method == 'GET'):
        serializer = UserAssignmentResultsSerializer(userassignmentresults, many=True)
        return Response(serializer.data)    
    
 
# check if the AID is valid
# url/assignments/AID/validate
@api_view(['GET'])
def assignment_validate(request, AID):
    """
    Validate an assignment based on its deadline.
    """
    try:
        assignment = Assignment.objects.get(AID=AID)
    except Assignment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = AssignmentSerializer(assignment)
        
        # Get the current datetime
        current_datetime = timezone.now()

        # Convert the deadline from string to datetime
        deadline = datetime.datetime.strptime(str(assignment.Deadline), '%Y-%m-%d %H:%M:%S%z')

        # Compare the current datetime with the assignment's deadline
        if current_datetime <= deadline:
            # Return True if the assignment is not expired
            return Response({"valid": True})
        else:
            # Return False if the assignment is expired
            return Response({"valid": False})


# views for UserAssignmentResults
# url/userassignmentresults
@api_view(['GET', 'POST'])
def userassignmentresults_list(request):
    """
    List all userassignmentresults, or create a new userassignmentresults.
    """
    if(request.method == 'GET'):
        userassignmentresults = UserAssignmentResults.objects.all()
        serializer = UserAssignmentResultsSerializer(userassignmentresults, many=True)
        return Response(serializer.data)
    
    elif(request.method == 'POST'):
        serializer = UserAssignmentResultsSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# url/userassignmentresults/UID
@api_view(['GET', 'PUT', 'DELETE'])
def userassignmentresults_detail(request, UID):
    """
    Retrieve, update or delete a userassignmentresults.
    """
    try:
        userassignmentresults = UserAssignmentResults.objects.get(UID=UID)
    except UserAssignmentResults.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if(request.method == 'GET'):
        serializer = UserAssignmentResultsSerializer(userassignmentresults)
        return Response(serializer.data)
    
    elif(request.method == 'PUT'):
        serializer = UserAssignmentResultsSerializer(userassignmentresults, data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif(request.method == 'DELETE'):
        userassignmentresults.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
# views for UserOnlyResults
# url/useronlyresults
@api_view(['GET', 'POST'])
def useronlyresults_list(request):
    """
    List all useronlyresults, or create a new useronlyresults.
    """
    if(request.method == 'GET'):
        useronlyresults = UserOnlyResults.objects.all()
        serializer = UserOnlyResultsSerializer(useronlyresults, many=True)
        return Response(serializer.data)
    
    elif(request.method == 'POST'):
        serializer = UserOnlyResultsSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# url/useronlyresults/UID
@api_view(['GET', 'PUT', 'DELETE'])
def useronlyresults_detail(request, UID):
    """
    Retrieve, update or delete a useronlyresults.
    """
    try:
        useronlyresults = UserOnlyResults.objects.get(UID=UID)
    except UserOnlyResults.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if(request.method == 'GET'):
        serializer = UserOnlyResultsSerializer(useronlyresults)
        return Response(serializer.data)
    
    elif(request.method == 'PUT'):
        serializer = UserOnlyResultsSerializer(useronlyresults, data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif(request.method == 'DELETE'):
        useronlyresults.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
   