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
    team_name = models.TextField(blank=True, null=True)
    event_id = models.CharField(max_length=100, blank=True, null=True)
    event_name = models.TextField(blank=True, null=True)
    leader=models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.team_id

# class EventDetail(models.Model):
#     id = models.AutoField(primary_key=True)
#     event_id = models.CharField(max_length=100, blank=True, null=True)
#     event_name = models.TextField(blank=True, null=True)
#     event_type = models.CharField(max_length=10, blank=True, null=True)
#     team_size = models.IntegerField(default=1, blank=True, null=True)

#     def __str__(self):
#         return self.event_id