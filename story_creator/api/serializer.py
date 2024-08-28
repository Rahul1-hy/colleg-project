from .models import *
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class Tokens(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls,user):
        token = super().get_token(user)

        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['bio'] = user.profile.bio
        token['image'] = user.profile.image.url if user.profile.image else None
        token['verified'] = user.profile.verified

        return token
    
class RegisterSerli(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationErrors(
                {'password': "Password fields does not match"}
            )
        return attrs
    
    def create(self, validated_data):
        
        validated_data.pop('password2')
        user = User.objects.create(
            username=validated_data['username'],
            email = validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user
    
class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    image = serializers.ImageField(required=False)  # Optional field for image

    class Meta:
        model = Profile
        fields = ['id', 'full_name', 'comp_name', 'bio', 'image', 'verified', 'username']


class StorySerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)  # Serialize related user
    image = serializers.ImageField(required=False)  # Optional field for image

    class Meta:
        model = Story
        fields = ['id','title', 'description', 'image', 'created_by', 'created_at']

class ContributionSerializer(serializers.ModelSerializer):
    contributed_by = UserSerializer(read_only=True)  # Serialize related user
    story = StorySerializer(read_only=True)  # Serialize related story

    class Meta:
        model = Contribution
        fields = ['id', 'story', 'contributed_by', 'contribution_text', 'contributed_at']

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['subject', 'message']