from django.db import models

# Create your models here.
class SoloEvent(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=100, blank=True, null=True)
    event_id = models.CharField(max_length=100, blank=True, null=True)
    event_name = models.TextField()

    def __str__(self):
        return self.user_id

class TeamEvent(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=100, blank=True, null=True)
    team_id = models.CharField(max_length=100, blank=True, null=True)
    team_name = models.TextField()
    event_id = models.CharField(max_length=100, blank=True, null=True)
    event_name = models.TextField()
    leader=models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.team_id

class TeamDetail(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=100, blank=True, null=True)
    team_id = models.CharField(max_length=100, blank=True, null=True)
    team_name = models.TextField()
    leader=models.CharField(max_length=100, blank=True, null=True)
    count=models.IntegerField(default=0)

    def __str__(self):
        return self.team_id