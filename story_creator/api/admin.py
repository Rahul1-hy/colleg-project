from django.contrib import admin
from .models import *

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']
    search_fields = ('email', 'username')

class ProfileAdmin(admin.ModelAdmin):
    list_editable = ['verified']
    list_display = ['user', 'full_name', 'verified']
    list_filter = ['verified'] 

# Story Admin
class StoryAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_by', 'is_complete', 'created_at']
    search_fields = ['title', 'description']
    list_filter = ['is_complete', 'created_by', 'created_at']
    readonly_fields = ['created_at']  # Make created_at read-only

# Contribution Admin
class ContributionAdmin(admin.ModelAdmin):
    list_display = ['story', 'contributed_by', 'contributed_at']
    search_fields = ['story__title', 'contributed_by__username', 'contribution_text']
    list_filter = ['contributed_by', 'contributed_at']
    readonly_fields = ['contributed_at']  # Make contributed_at read-only

class ContactAdmin(admin.ModelAdmin):
    list_display = ['user', 'subject', 'created_at']
    search_fields = ['user__email', 'subject']
    list_filter = ['created_at']
    readonly_fields = ['created_at']

# Register models with admin site
admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Story, StoryAdmin)
admin.site.register(Contribution, ContributionAdmin)
admin.site.register(Contact, ContactAdmin) 