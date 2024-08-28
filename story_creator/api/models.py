from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.text import slugify

# Custom User model
class User(AbstractUser):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self) -> str:
        return self.email  # or self.username, based on your preference

# Profile model
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=200)
    comp_name = models.CharField(max_length=100, blank=True, null=True)
    bio = models.TextField(blank=True)
    image = models.ImageField(upload_to="profileImg", blank=True, null=True)
    verified = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.full_name} ({self.comp_name})"

# Signals to automatically create and save a profile when a user is created
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

class Story(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)  # For SEO-friendly URLs
    description = models.TextField()
    created_by = models.ForeignKey(User, related_name='created_stories', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='story_images/', null=True, blank=True)
    is_complete = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  # To track updates

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

class Contribution(models.Model):
    story = models.ForeignKey(Story, related_name='contributions', on_delete=models.CASCADE)
    contributed_by = models.ForeignKey(User, related_name='contributions', on_delete=models.CASCADE)
    contribution_text = models.TextField()
    contributed_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)  # To track updates

    def __str__(self):
        return f'Contribution by {self.contributed_by.username} to "{self.story.title}"'

class Contact(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.user.email} - {self.subject}"