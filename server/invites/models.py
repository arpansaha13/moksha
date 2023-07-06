from django.db.models import Model, AutoField, CharField, ForeignKey, CASCADE
from enum import StrEnum
from teams.models import Team
from users.models import User

class InviteStatus(StrEnum):
    PENDING = 'PENDING'
    ACCEPTED = 'ACCEPTED'
    REJECTED = 'REJECTED'

class Invite(Model):
    id = AutoField(primary_key=True)
    team = ForeignKey(Team, related_name='%(class)s_team', on_delete=CASCADE, null=False)
    user = ForeignKey(User, related_name='%(class)s_user', on_delete=CASCADE, null=False)
    status= CharField(max_length=100, blank=False, null=False, default=InviteStatus.PENDING)

    def __str__(self):
        return str(self.id)
