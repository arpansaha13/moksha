from django.db.models import Model, AutoField, CharField, BooleanField, ForeignKey, CASCADE
from users.models import User

class Contest(Model):
    id = AutoField(primary_key=True)
    club_slug = CharField(max_length=30, null=False)
    contest_slug = CharField(max_length=30, null=False)
    is_solo = BooleanField(null=False)

class SoloContestRegistration(Model):
    id = AutoField(primary_key=True)
    user = ForeignKey(User, related_name='%(class)s_user', on_delete=CASCADE, null=False, db_column='user')
    contest = ForeignKey(Contest, related_name='%(class)s_contest', on_delete=CASCADE, null=False, db_column='contest')

    def __str__(self):
        return self.id

class TeamContestRegistration(Model):
    id = AutoField(primary_key=True)
    team_id = CharField(max_length=100, blank=False, null=False)
    contest = ForeignKey(Contest, related_name='%(class)s_contest', on_delete=CASCADE, null=False, db_column='contest')

    def __str__(self):
        return self.id
