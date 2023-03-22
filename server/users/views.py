from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from .serializers import SpecificSerializers

class GetAuthUser(APIView):
    def get(self, request):
        serializer = SpecificSerializers(request.auth_user)
        return Response({'data': serializer.data}, status=200)

class GetUsers(APIView):
    def get(self, request):
        username = request.GET.get('username', None)
        limit = request.GET.get('limit', 10)

        users = User.objects.filter(
            Q(username__icontains=username)
            & ~Q(user_id=request.auth_user.user_id)
        ).all()[0:limit]

        data = []
        for user in users:
            serializer = SpecificSerializers(user)
            data.append(serializer.data)

        return Response({ 'data': data }, status=200)
