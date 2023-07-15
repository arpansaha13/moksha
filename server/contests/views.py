from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from common.exceptions import BadRequest, Conflict
from .models import Contest, SoloContestRegistration

# SOLO CONTEST APIs


class CheckSoloRegistration(APIView):
    def get(self, request, contest_id):
        contest = get_contest(contest_id)

        solo_reg = SoloContestRegistration.objects.filter(
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

        solo_reg_exists = SoloContestRegistration.objects.filter(
            user=request.auth_user,
            contest=contest
        ).exists()

        if solo_reg_exists:
            raise Conflict({'message': "User already registered for the contest."})

        solo_reg = SoloContestRegistration(
            user=request.auth_user,
            contest=contest
        )
        solo_reg.save()

        return Response({'message': 'User registered successfully for contest.'}, status=201)


class CancelSoloRegistration(APIView):
    def delete(self, request, contest_id):
        contest = get_contest(contest_id)

        solo_reg = SoloContestRegistration.objects.filter(
            user=request.auth_user,
            contest=contest
        ).first()

        if solo_reg:
            solo_reg.delete()
            return Response({'message': 'Registration for this contest has been cancelled.'}, status=200)

        return NotFound({'message': 'No registration found for this contest.'})


def get_contest(contest_id):
    if not contest_id:
        raise BadRequest({'message': 'No contest_id provided.'})

    contest = Contest.objects.filter(id=contest_id).first()

    if not contest:
        raise BadRequest({'message': 'Invalid contest id'})

    return contest
