from django.db.models import Model, CharField, IntegerField, BigIntegerField, EmailField


class User(Model):
    user_id = CharField(primary_key=True, max_length=100, null=False)
    avatar_idx = IntegerField(default=0)

    # TODO: revise length limits - both client and server-side
    name = CharField(max_length=100)
    institution = CharField(max_length=100)

    # FIXME: declare email and phone as unique
    phone_no = BigIntegerField(default=0)
    email = EmailField(unique=False)

    # TODO: add client-side validation for usernames that are taken
    username = CharField(unique=True, max_length=100)

    password = CharField(max_length=100)
    otp = CharField(max_length=100, default='', null=False, blank=False)

    def __str__(self):
        return self.user_id
