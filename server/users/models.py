from django.db import models

class User(models.Model):
    user_id = models.CharField(primary_key=True, max_length=100,blank=False, null=False)
    avatar_idx=models.IntegerField(default=0)
    name = models.CharField(max_length=100)
    institution = models.CharField(max_length=100)
    phone_no = models.BigIntegerField(default=0)
    email = models.EmailField(unique=False)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    otp = models.CharField(max_length=100, default='', null=False, blank=False)

    def __str__(self):
        return self.user_id
