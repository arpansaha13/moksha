from django.db.models import Model, CharField, IntegerField, BigIntegerField, EmailField, BooleanField


class User(Model):
    user_id = CharField(primary_key=True, max_length=100, null=False)
    avatar_idx = IntegerField()

    # TODO: revise length limits - both client and server-side
    name = CharField(max_length=100, null=False)
    institution = CharField(max_length=100, null=False)

    # TODO: add verification for phone
    phone_no = BigIntegerField(unique=True, null=False)
    email = EmailField(unique=True, null=False)

    # TODO: add client-side validation for usernames that are taken
    username = CharField(max_length=100, unique=True, null=False)

    password = CharField(max_length=100, null=False)

    role = CharField(max_length=100, default='user', null=False)

    def __str__(self):
        return self.user_id
