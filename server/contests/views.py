from django.utils.decorators import method_decorator
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from common.exceptions import Conflict
from common.responses import NoContentResponse
from users.models import User
from users.serializers import UserSerializer, AuthUserSerializer
from teams.serializers import TeamSerializer
from .models import SoloContestRegistration as SoloContestRegistrationModel, TeamContestRegistration as TeamContestRegistrationModel, TeamContestUserRegistration
from .serializers import SoloContestRegistrationSerializer, TeamContestRegistrationSerializer, TeamContestUserRegistrationSerializer
from common.middleware import jwt_exempt
from common.exceptions import BadRequest
from teams.helpers import get_team
from contests.helpers import get_contest, get_team_reg

# SOLO CONTEST APIs


class SoloContestRegistration(APIView):
    def get(self, request):
        contest_id = request.GET['contest_id']

        contest = get_contest(contest_id)

        solo_reg = SoloContestRegistrationModel.objects.filter(
            user=request.auth_user,
            contest=contest
        ).first()

        if not solo_reg:
            return Response({'data': None, 'message': 'No registration found.'})

        serializer = SoloContestRegistrationSerializer(solo_reg)
        return Response({'data': serializer.data}, status=200)

    def post(self, request):
        contest_id = request.data['contest_id']
        contest = get_contest(contest_id)

        solo_reg_exists = SoloContestRegistrationModel.objects.filter(
            user=request.auth_user,
            contest=contest
        ).exists()

        if solo_reg_exists:
            raise Conflict(message='User already registered for the contest.')

        solo_reg = SoloContestRegistrationModel(
            user=request.auth_user,
            contest=contest
        )
        solo_reg.save()

        serializer = SoloContestRegistrationSerializer(solo_reg)
        return Response({'data': serializer.data}, status=201)

    def delete(self, request):
        solo_reg_id = request.data['solo_reg_id']

        solo_reg = SoloContestRegistrationModel.objects.filter(id=solo_reg_id).first()

        if not solo_reg:
            raise NotFound({'message': 'No registration found.'})

        solo_reg.delete()
        return NoContentResponse()


class TeamContestRegistration(APIView):
    def get(self, request):
        team_id = request.GET['team_id']
        contest_id = request.GET['contest_id']

        team_reg = get_team_reg(team_id, contest_id)

        if not team_reg:
            return Response({'data': None, 'message': 'No registration found.'})

        serializer = TeamContestRegistrationSerializer(
            team_reg,
            fields={'registered_members': TeamContestUserRegistrationSerializer(
                read_only=True,
                many=True
            )}
        )

        return Response({'data': serializer.data})

    def post(self, request):
        team_id = request.data['team_id']
        contest_id = request.data['contest_id']
        selected_members = request.data['selected_members']

        team_reg_exists = TeamContestRegistrationModel.objects.filter(
            team=team_id,
            contest=contest_id
        ).exists()

        if team_reg_exists:
            raise Conflict(message='Team already registered for the contest.')

        # TODO: Put this in transaction

        team = get_team(team_id)
        contest = get_contest(contest_id)

        team_reg = TeamContestRegistrationModel(team=team, contest=contest)
        team_reg.save()

        team_reg_members = []

        for member_id in selected_members:
            team_reg_members.append(TeamContestUserRegistration(
                team_contest_registration=team_reg,
                user=User.objects.filter(user_id=member_id).first()
            ))

        TeamContestUserRegistration.objects.bulk_create(team_reg_members)

        team_reg = get_team_reg(team_id, contest_id)

        if team_reg is None:
            return Response({'data': None, 'message': 'No registration found.'})

        serializer = TeamContestRegistrationSerializer(
            team_reg,
            fields={'registered_members': TeamContestUserRegistrationSerializer(
                read_only=True,
                many=True
            )}
        )

        return Response({'data': serializer.data}, status=201)

    def delete(self, request):
        team_id = request.data['team_id']
        contest_id = request.data['contest_id']

        team_reg = get_team_reg(team_id, contest_id)

        if team_reg is None:
            raise NotFound({'message': 'No registration found.'})

        team_reg.delete()

        return NoContentResponse()


# This below api is meant for admin client only
# No role-based auth is implemented yet


class GetContestRegistrations(APIView):
    def get(self, request, club_slug, contest_slug):
        contest_type = request.GET.get('type', None)

        if (contest_type is None):
            raise BadRequest(message='No contest type specified')

        if contest_type == 'solo':
            data = SoloContestRegistrationModel.objects.filter(contest__club_slug=club_slug, contest__contest_slug=contest_slug).all()

            serializer = SoloContestRegistrationSerializer(
                data,
                many=True,
                empty=True,
                fields={'user': UserSerializer()}
            )

            return Response({'data': serializer.data})

        else:
            data = TeamContestRegistrationModel.objects.filter(contest__club_slug=club_slug, contest__contest_slug=contest_slug).all()

            serializer = TeamContestRegistrationSerializer(
                data,
                many=True,
                empty=True,
                fields={
                    'team': TeamSerializer(),
                    'registered_members': TeamContestUserRegistrationSerializer(
                        many=True,
                        # AuthUserSerializer is used here to get email and phone for admin client
                        fields={'user': AuthUserSerializer()}
                    )
                }
            )

            return Response({'data': serializer.data})

    @method_decorator(jwt_exempt)
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
