from django.db import models

# Create your models here.
class SoloEvent(models.Model):
    id = models.AutoField(primary_key=True)
    # Remove null, blank later
    user_id = models.CharField(max_length=100, null=True, blank=True)
    event_name = models.CharField(max_length=100)

    def __str__(self):
        return self.user_id