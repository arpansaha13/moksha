from django.db import models
# Create your models here.


class User(models.Model):
    id = models.AutoField(primary_key=True)
    avatar_idx=models.IntegerField(default=0)
    name = models.CharField(max_length=100)
    institution_name = models.CharField(max_length=100)
    phone_no = models.BigIntegerField(default=0)
    email = models.EmailField(unique=False)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    user_id = models.CharField(max_length=100,blank=True, null=False)
    logged_in = models.BooleanField(default=False)
    otp = models.CharField(max_length=100, default='', null=True, blank=True)

    def __str__(self):
        return self.user_id
