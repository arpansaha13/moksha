from django.db.models import Model, CharField, DateTimeField, SmallIntegerField, ForeignKey, CASCADE
from users.models import User


class AccountVerificationLink(Model):
    hash = CharField(primary_key=True, null=False, max_length=20)
    user = ForeignKey(User, related_name='account_otp_entries', on_delete=CASCADE, null=False, db_column='user')
    otp = SmallIntegerField(null=False)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

    def __str__(self):
        return self.hash


class ForgotPasswordLink(Model):
    hash = CharField(primary_key=True, null=False, max_length=20)
    user = ForeignKey(User, related_name='forgot_otp_entries', on_delete=CASCADE, null=False, db_column='user')
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

    def __str__(self):
        return self.hash
