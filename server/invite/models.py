from django.db import models

# Create your models here.
class Invite(models.Model):
    id = models.AutoField(primary_key=True)
    team_id = models.CharField(max_length=100, blank=True, null=True)
    user_id = models.CharField(max_length=100, blank=True, null=True)
    status= models.CharField(max_length=100, blank=True, null=True,default='pending')

    def __str__(self):
        return str(self.id)