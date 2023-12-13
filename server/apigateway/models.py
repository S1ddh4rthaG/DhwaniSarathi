import uuid
from django.db import models
from django.db import models
from django.db.models import JSONField
from django.utils import timezone

class LoginInfo(models.Model):
    FID = models.CharField(primary_key=True, max_length=100,  default=uuid.uuid4)
    Type = models.IntegerField(default=0)
    def __str__(self):
        return self.FID

    
class User(models.Model):
    UID = models.CharField(primary_key=True, max_length=100, default=uuid.uuid4)
    UserName = models.CharField(max_length=100, unique=True)
    Age = models.IntegerField(default=0)
    Gender = models.CharField(max_length=10,default="male")

    def __str__(self):
        return self.UserName
    
class Educator(models.Model):
    EID = models.CharField(primary_key=True, max_length=100, default=uuid.uuid4)
    EducatorName = models.CharField(max_length=100)
    InstituteName = models.CharField(max_length=150)

    def __str__(self):
        return self.EducatorName


class Classroom(models.Model):
    CID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    EID = models.ForeignKey('Educator', on_delete=models.CASCADE)
    ClassroomName = models.CharField(max_length=100)

    def __str__(self):
        return self.ClassroomName
    
class Assignment(models.Model):
    AID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    CID = models.ForeignKey('Classroom', on_delete=models.CASCADE)
    AssignmentName = models.CharField(max_length=100 , default="Sample Assignment")
    Deadline = models.DateTimeField(default= (timezone.now()+timezone.timedelta(days=7)).strftime('%Y-%m-%d %H:%M:%S%z'))

    def __str__(self):
        return f"Assignment {self.AID} in Classroom {self.CID}"
    
class UserAssignmentResults(models.Model):
    AID = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    UID = models.ForeignKey(User, on_delete=models.CASCADE)
    CID = models.ForeignKey(Classroom, on_delete=models.CASCADE)
    Timestamp = models.DateTimeField(auto_now_add=True)
    Results = JSONField()  # Field changed to JSONField for storing JSON objects

    def __str__(self):
        return f"User: {self.UID} - Assignment: {self.AID}"

class UserOnlyResults(models.Model):
    UID = models.ForeignKey(User, on_delete=models.CASCADE)
    Timestamp = models.DateTimeField(auto_now_add=True)
    Results = JSONField()  # Field changed to JSONField for storing JSON objects

    def __str__(self):
        return f"User: {self.UID} - Timestamp: {self.Timestamp}"