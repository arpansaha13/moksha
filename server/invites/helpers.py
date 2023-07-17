from typing import Optional
from rest_framework.exceptions import PermissionDenied, NotFound
from common.exceptions import BadRequest
from .models import Invite, InviteStatus
from teams.models import Team
from users.models import User


def verify_team_leader(team: Optional[Team], auth_user: User):
    if team is None:
        raise NotFound({'message': 'Invalid team_id'})

    # Only team leader should be able to deal with invites
    if auth_user.user_id != team.leader.user_id:
        raise PermissionDenied({'message': 'Forbidden'})


def verify_invite(invite: Optional[Invite]) -> Invite:
    if invite is None:
        raise NotFound({'message': 'Invalid invite'})

    if invite.status != InviteStatus.PENDING:
        raise BadRequest({'message': 'Invalid invite'})

    return invite
