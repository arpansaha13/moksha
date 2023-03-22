from django.db import models

class Team(models.Model):
    id = models.AutoField(primary_key=True)
    team_id = models.CharField(max_length=100, blank=True, null=True)
    team_name = models.TextField(blank=True, null=True)
    leader_id=models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.team_id

class TeamUserRegistrations(models.Model):
    id = models.AutoField(primary_key=True)
    team_id = models.CharField(max_length=100, blank=True, null=True)
    user_id=models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.team_id
