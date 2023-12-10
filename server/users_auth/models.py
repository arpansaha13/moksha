from django.db.models import Model, BigIntegerField, CharField, DateTimeField, EmailField, IntegerField, SmallIntegerField, ForeignKey, CASCADE
from users.models import User


class UnverifiedAccount(Model):
    hash = CharField(primary_key=True, null=False, max_length=20)
    otp = SmallIntegerField(null=False)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

    avatar_idx = IntegerField()
    name = CharField(max_length=100, null=False)
    institution = CharField(max_length=100, null=False)
    phone_no = BigIntegerField(null=False)
    email = EmailField(unique=True, null=False)
    username = CharField(max_length=100, null=False)
    password = CharField(max_length=100, null=False)

    def __str__(self):
        return self.hash


class ForgotPasswordLink(Model):
    hash = CharField(primary_key=True, null=False, max_length=20)
    user = ForeignKey(User, related_name='forgot_otp_entries',
                      on_delete=CASCADE, null=False, db_column='user')
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

    def __str__(self):
        return self.hash
