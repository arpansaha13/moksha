from .serializers import *
from .models import *
from users.models import User
from users.serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response

events = {'E-1': ["dance", 3], 'E-2': ["singing", 2],
          'E-3': ["drama", 5], 'E-4': ["acting", 1]}

# SOLO CONTEST APIs

class CheckSoloRegistration(APIView):
    def get(self, request, contest_slug):
        solo_registration = SoloContestRegistrations.objects.filter(
            user_id = request.auth_user.user_id, contest_slug=contest_slug).first()
        if solo_registration:
            return Response({'registered': True}, status=200)
        return Response({'registered': False}, status=200)

class SoloContestRegister(APIView):
    def post(self, request):
        contest_slug = str(request.data.get('contest_slug'))

        if not contest_slug:
            return Response({'message': 'No contest_slug provided.'}, status=400)

        user_solo = SoloContestRegistrations.objects.filter(
            user_id=request.auth_user.user_id, contest_slug=contest_slug
        ).first()

        if user_solo:
            return Response({'message': "User already registered for the contest."}, status=409)

        serializer = SoloContestSerializers({
            'user_id': request.auth_user.user_id,
            'contest_slug': contest_slug
        })
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'message': 'User registered successfully for contest.'}, status=201)

class CancelSoloRegistration(APIView):
    def delete(self, request, contest_slug):
        solo_registration = SoloContestRegistrations.objects.filter(
            user_id=request.auth_user.user_id, contest_slug=contest_slug).first()

        if solo_registration:
            solo_registration.delete()
            return Response({'message': 'Registration for this contest has been cancelled.'}, status=200)

        return Response({'message': 'No registration found for this contest.'}, status=404)

# SOLO CONTEST APIs

# class TeamContestRegister(APIView):
#     def post(self, request):
#         token = request.COOKIES.get('jwt')

#         if not token:
#             raise AuthenticationFailed('Unauthenticated')
#         try:
#             payload = jwt.decode(token, 'secret00', algorithms=['HS256'])
#         except jwt.ExpiredSignatureError:
#             raise AuthenticationFailed('Token Expired! Log in again.')

#         user = User.objects.filter(user_id=payload['id']).first()
#         contest_slug = request.data.get('contest_slug')
#         team = Team.objects.filter(leader=user.user_id).first()

#         if user:
#             user_solo = TeamContestRegistrations.objects.filter(
#                 team_id=team.team_id, contest_slug=contest_slug).first()
#             if user_solo:
#                 return Response({'message': "Team already registered for the contest!"}, status=409)
#             format_data = {'team_id': team.team_id, 'contest_slug': contest_slug}
#             serializer = TeamContestDetailsSerializers(data=format_data)
#             serializer.is_valid(raise_exception=True)
#             serializer.save()
#             return Response({'message': 'User registered successfully!!'}, status=201)

#         return Response({'message': 'User not found!'}, status=404)
