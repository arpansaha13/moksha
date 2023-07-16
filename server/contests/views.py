from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from common.exceptions import BadRequest, Conflict
from users.models import User
from .models import Contest, SoloContestRegistration as SoloContestRegistrationModel, TeamContestRegistration as TeamContestRegistrationModel, TeamContestUserRegistration
from .serializers import TeamContestRegistrationSerializer, TeamContestUserRegistrationSerializer
from teams.helpers import get_team
from contests.helpers import get_contest, get_team_reg

# SOLO CONTEST APIs


class CheckSoloRegistration(APIView):
    def get(self, request, contest_id):
        contest = get_contest(contest_id)

        solo_reg = SoloContestRegistrationModel.objects.filter(
            user=request.auth_user,
            contest=contest
        ).first()

        if solo_reg:
            return Response({'registered': True}, status=200)

        return Response({'registered': False}, status=200)


class SoloContestRegister(APIView):
    def post(self, request):
        contest_id = request.POST['contest_id']
        contest = get_contest(contest_id)

        solo_reg_exists = SoloContestRegistrationModel.objects.filter(
            user=request.auth_user,
            contest=contest
        ).exists()

        if solo_reg_exists:
            raise Conflict({'message': "User already registered for the contest."})

        solo_reg = SoloContestRegistrationModel(
            user=request.auth_user,
            contest=contest
        )
        solo_reg.save()

        return Response({'message': 'User registered successfully for contest.'}, status=201)


class CancelSoloRegistration(APIView):
    def delete(self, request, contest_id):
        contest = get_contest(contest_id)

        solo_reg = SoloContestRegistrationModel.objects.filter(
            user=request.auth_user,
            contest=contest
        ).first()

        if solo_reg:
            solo_reg.delete()
            return Response(status=204)

        return NotFound({'message': 'No registration found for this contest.'})


class TeamContestRegistration(APIView):
    def get(self, request):
        team_id = request.GET['team_id']
        contest_id = request.GET['contest_id']

        team_reg = get_team_reg(team_id, contest_id)

        serializer = TeamContestRegistrationSerializer(
            team_reg,
            fields={'registered_members': TeamContestUserRegistrationSerializer(
                read_only=True,
                many=True
            )}
        )

        return Response({'data': serializer.data})

    def post(self, request):
        team_id = request.POST['team_id']
        contest_id = request.POST['contest_id']
        selected_members = request.POST['selected_members'].split(',')

        team_reg_exists = TeamContestRegistrationModel.objects.filter(
            team=team_id,
            contest=contest_id
        ).exists()

        if team_reg_exists:
            raise Conflict({'message': "Team already registered for the contest."})

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

        serializer = TeamContestRegistrationSerializer(
            team_reg,
            fields={'registered_members': TeamContestUserRegistrationSerializer(
                read_only=True,
                many=True
            )}
        )

        return Response({'data': serializer.data}, status=201)

    def delete(self, request):
        team_id = request.POST['team_id']
        contest_id = request.POST['contest_id']

        team_reg = get_team_reg(team_id, contest_id)
        team_reg.delete()

        return Response(status=204)
