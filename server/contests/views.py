from .models import Contest, SoloContestRegistration
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from common.exceptions import BadRequest, Conflict

# SOLO CONTEST APIs

class CheckSoloRegistration(APIView):
    def get(self, request, contest_id):
        contest = get_contest(contest_id)

        solo_registration = SoloContestRegistration.objects.filter(
            user = request.auth_user,
            contest = contest
        ).first()

        if solo_registration:
            return Response({'registered': True}, status=200)

        return Response({'registered': False}, status=200)

class SoloContestRegister(APIView):
    def post(self, request):
        contest_id = request.POST['contest_id']
        contest = get_contest(contest_id)

        solo_reg_exists = SoloContestRegistration.objects.filter(
            user = request.auth_user,
            contest = contest
        ).exists()

        if solo_reg_exists:
            raise Conflict({'message': "User already registered for the contest."})

        solo_reg = SoloContestRegistration(
            user = request.auth_user,
            contest = contest
        )
        solo_reg.save()

        return Response({'message': 'User registered successfully for contest.'}, status=201)

class CancelSoloRegistration(APIView):
    def delete(self, request, contest_id):
        contest = get_contest(contest_id)

        solo_registration = SoloContestRegistration.objects.filter(
            user = request.auth_user,
            contest = contest
        ).first()

        if solo_registration:
            solo_registration.delete()
            return Response({'message': 'Registration for this contest has been cancelled.'}, status=200)

        return NotFound({'message': 'No registration found for this contest.'})

def get_contest(contest_id):
    if not contest_id:
        raise BadRequest({'message': 'No contest_id provided.'})

    contest = Contest.objects.filter(id=contest_id).first()

    if not contest:
        raise BadRequest({'message': 'Invalid contest id'})

    return contest

# class TeamContestRegister(APIView):
#     def post(self, request):
#         token = request.COOKIES.get('jwt')

#         if not token:
#             raise AuthenticationFailed('Unauthenticated')
#         try:
#             payload = jwt.decode(token, env('JWT_SECRET'), algorithms=['HS256'])
#         except jwt.ExpiredSignatureError:
#             raise AuthenticationFailed('Token Expired! Log in again.')

#         user = User.objects.filter(user_id=payload['id']).first()
#         contest_slug = request.data.get('contest_slug')
#         team = Team.objects.filter(leader=user.user_id).first()

#         if user:
#             user_solo = TeamContestRegistration.objects.filter(
#                 team_id=team.team_id, contest_slug=contest_slug).first()
#             if user_solo:
#                 return Response({'message': "Team already registered for the contest!"}, status=409)
#             format_data = {'team_id': team.team_id, 'contest_slug': contest_slug}
#             serializer = TeamContestDetailsSerializers(data=format_data)
#             serializer.is_valid(raise_exception=True)
#             serializer.save()
#             return Response({'message': 'User registered successfully!!'}, status=201)

#         return Response({'message': 'User not found!'}, status=404)
