from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseNotFound
from .serializers import *
from .models import *
from login.models import *
from rest_framework.views import APIView
from rest_framework.response import Response


class RegisterEvent(APIView):
    def post(self, request):
        user_id = request.data['user_id']
        event_id = request.data['event_id']

        user = User.objects.filter(user_id=user_id).first()
        # print(user)
        if user:
            user_solo = SoloEvent.objects.filter(user_id=user_id, event_id=event_id).first()
            if user_solo:
                return Response({'message': "User already registered for the event"})
            
            serializer = SoloEventSerializers(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({'message': 'User registered successfully'})
        
        return Response({'message': 'User not found!'})


# Create POST API for fetching registered solo and group events for a User.
class EventDetails(APIView):
    def post(self, request):
        user_id = request.data['user_id']

        user_events = SoloEvent.objects.filter(user_id=user_id).all()
        if user_events is None:
            return Response({'message': "No registered solo events"})
        
        serializer = SoloEventSerializers(user_events, many=True)

        return Response(serializer.data)
        