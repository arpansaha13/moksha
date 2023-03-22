from .serializers import *
from .models import *
from users.models import User
from users.serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
import secrets
import string

class GetTeam(APIView):
    def get(self, req, team_id):
        team = Team.objects.filter(team_id=team_id).first()
        serializer = TeamSerializers(team)
        return Response(serializer.data, status=200)

class CreateTeam(APIView):
    def post(self, request):
        auth_user_team = Team.objects.filter(leader_id=request.auth_user.user_id).first()

        if not auth_user_team:
            uid = generate_uid()
            temp_team = Team.objects.filter(team_id=uid).first()
            while temp_team:
                uid = generate_uid()
                temp_team = Team.objects.filter(team_id=uid).first()

            format_data = {
                'team_id': uid,
                'team_name': request.data['team_name'],
                'leader_id': request.auth_user.user_id
            }
            serializer = TeamSerializers(data=format_data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            format_data = {
                'team_id': uid,
                'user_id':request.auth_user.user_id
            }
            serializer = TeamUserRegistrationsSerializers(data=format_data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response({'team_id': uid}, status=201)

        return Response({'message': 'Team Already Exists!'}, status=400)

# class JoinTeam(APIView):
#     def post(self, request):
#         token = request.COOKIES['jwt']

#         if not token:
#             raise AuthenticationFailed('Unauthenticated')

#         try:
#             payload = jwt.decode(token, 'secret00', algorithms=['HS256'])
#         except jwt.ExpiredSignatureError:
#             raise AuthenticationFailed('Token Expired! Log in again.')

#         user_id = payload['id']
#         team_id = request.data['team_id']

#         user = TeamUserRegistrations.objects.filter(team_id=team_id).all()

#         user1 = Team.objects.filter(leader_id=user_id).first()
#         if user1:
#             return Response({'message': 'Each user can create only one team but join any!!'}, status=403)

#         if user:
#             if user.count < 5:
#                 format_data = {'team_id': team_id,'user_id':user_id}
#                 serializer = TeamUserRegistrationsSerializers(data=format_data)
#                 serializer.is_valid(raise_exception=True)
#                 serializer.save()
#                 return Response({'message': 'Member Added!!'}, status=201)
#             return Response({'message': 'Team Full!'}, status=400)
#         return Response({'message': 'Team Doesnot Exists!'}, status=404)

def generate_uid(length=8):
    uid = ''.join(secrets.choice(string.ascii_lowercase + string.digits)
                  for i in range(length))
    return 'T-' + uid
