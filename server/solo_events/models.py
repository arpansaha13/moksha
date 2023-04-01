from django.db import models

# Create your models here.
class SoloEvent(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=100, blank=False, null=False)
    event_id = models.CharField(max_length=100, blank=False, null=False)
    event_name = models.TextField()

    def __str__(self):
        return self.user_id

class TeamEvent(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=100, blank=False, null=False)
    team_id = models.CharField(max_length=100, blank=False, null=False)
    team_name = models.TextField(blank=False, null=False)
    event_id = models.CharField(max_length=100, blank=False, null=False)
    event_name = models.TextField(blank=False, null=False)
    leader=models.CharField(max_length=100, blank=False, null=False)

    def __str__(self):
        return self.team_id

# class EventDetail(models.Model):
#     id = models.AutoField(primary_key=True)
#     event_id = models.CharField(max_length=100, blank=False, null=False)
#     event_name = models.TextField(blank=False, null=False)
#     event_type = models.CharField(max_length=10, blank=False, null=False)
#     team_size = models.IntegerField(default=1, blank=False, null=False)

#     def __str__(self):
#         return self.event_id