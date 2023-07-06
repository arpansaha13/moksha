from django.db.models import Model, AutoField, CharField, TextField, ForeignKey, CASCADE
from users.models import User

class Team(Model):
    team_id = CharField(primary_key=True, max_length=100, blank=False, null=False)
    team_name = TextField(blank=False, null=False)
    leader_id = CharField(max_length=100, blank=False, null=False)

    def __str__(self):
        return self.team_id

class TeamUserRegistrations(Model):
    id = AutoField(primary_key=True)
    team = ForeignKey(Team, related_name='%(class)s_team', on_delete=CASCADE, null=False)
    user = ForeignKey(User, related_name='%(class)s_user', on_delete=CASCADE, null=False)

    def __str__(self):
        return self.id
