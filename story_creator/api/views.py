from django.shortcuts import render
from .models import *
from rest_framework.decorators import api_view, permission_classes
from .serializer import RegisterSerli, Tokens, ProfileSerializer, StorySerializer, ContributionSerializer, ContactSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateDestroyAPIView
import logging


logger = logging.getLogger(__name__)

class MyTokens(TokenObtainPairView):
    serial_class = Tokens

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerli

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def DashboardView(request):
    if request.method == 'GET':
        context = f"hey {request.user}, you are seeing a response"
        return Response({'response':context}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get("text")
        context = f"Hey {request.user}, your text {text}"
        return Response({'response':context}, status=status.HTTP_200_OK)
    
    return Response({}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
def user_profile(request):
    user = request.user
    try:
        profile = Profile.objects.get(user=user)
    except Profile.DoesNotExist:
        return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class StoryListCreateView(generics.ListCreateAPIView):
    queryset = Story.objects.all()
    serializer_class = StorySerializer

    def perform_create(self, serializer):
        logger.info(f"Creating story with data: {self.request.data}")
        serializer.save(created_by=self.request.user)

class StoryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Story.objects.all()
    serializer_class = StorySerializer

# Contribution Views

class ContributionListCreateView(generics.ListCreateAPIView):
    queryset = Contribution.objects.all()
    serializer_class = ContributionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(contributed_by=self.request.user)

class ContributionRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contribution.objects.all()
    serializer_class = ContributionSerializer
    permission_classes = [IsAuthenticated]

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def contact_view(request):
    user = request.user
    serializer = ContactSerializer(data=request.data)
    
    if serializer.is_valid():
        Contact.objects.create(user=user, **serializer.validated_data)
        return Response({'message': 'Your message has been sent!'}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)