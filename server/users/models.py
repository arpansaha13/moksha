from django.db.models import Model, CharField, SmallIntegerField, EmailField, DateTimeField
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils import timezone


class User(Model):
    user_id = CharField(primary_key=True, max_length=100, null=False)
    avatar_idx = SmallIntegerField()

    # TODO: revise length limits - both client and server-side
    name = CharField(max_length=100, null=False)
    institution = CharField(max_length=100, null=False)

    # TODO: add verification for phone
    phone_no = CharField(unique=True, null=False)
    email = EmailField(unique=True, null=False)

    # TODO: add client-side validation for usernames that are taken
    username = CharField(max_length=100, unique=True, null=False)

    password = CharField(max_length=100, null=False)
    password_updated_at = DateTimeField(null=False)

    role = CharField(max_length=100, default='user', null=False)

    def __str__(self):
        return self.user_id


# https://docs.djangoproject.com/en/5.0/topics/signals/

@receiver(pre_save, sender=User)
def update_password_updated_at(sender, instance, **kwargs):
    if instance.pk is None:
        # This is a new user, set this field to creation time
        instance.password_updated_at = timezone.now()
    else:
        # Check if the password field has been updated
        original_user = User.objects.get(pk=instance.pk)
        if instance.password != original_user.password:
            instance.password_updated_at = timezone.now()


pre_save.connect(update_password_updated_at, sender=User)
