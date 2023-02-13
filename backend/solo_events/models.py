from django.db import models

# Create your models here.
class SoloEvent(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=100, blank=True, null=True)
    event_id = models.CharField(max_length=100, blank=True, null=True)
    event_name = models.TextField()

    def __str__(self):
        return self.user_id