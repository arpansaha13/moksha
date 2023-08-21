from rest_framework.exceptions import NotFound
from common.exceptions import BadRequest
from teams.models import Team


def get_team(team_id: str) -> Team:
    if not team_id:
        raise BadRequest(message='No team_id provided.')

    team = Team.objects.filter(team_id=team_id).first()

    if not team:
        raise NotFound({'message': 'Invalid team id'})

    return team
